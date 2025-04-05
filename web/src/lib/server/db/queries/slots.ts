import { db } from '$lib/server/db';
import { assignments, type SlotWithAssignments } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';

export async function getSlots(): Promise<SlotWithAssignments[]> {
  const slots = await db.query.slots.findMany({
    with: {
      assignments: true,
    },
    where: (slots, { gt }) => gt(slots.start_time, new Date()),
  });

  return slots.map((slot) => ({
    ...slot,
    // find unique assignments by user_id
    assignments: slot.assignments
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      .filter((curr, i, sorted) => sorted.findIndex((a) => a.user_id === curr.user_id) === i),
  }));
}

export async function signUpForSlot(slotId: number, userId: string): Promise<void> {
  const existingAssignment = await db.query.assignments.findFirst({
    where: and(eq(assignments.slot_id, slotId), eq(assignments.user_id, userId)),
  });

  if (existingAssignment) {
    throw new Error('User already has an assignment for this slot');
  }

  await db.insert(assignments).values({
    slot_id: slotId,
    user_id: userId,
    assignment_status: 'confirmed',
  });
}

export async function joinWaitlistForSlot(slotId: number, userId: string): Promise<void> {
  const existingAssignment = await db.query.assignments.findFirst({
    where: and(eq(assignments.slot_id, slotId), eq(assignments.user_id, userId)),
  });

  if (existingAssignment) {
    throw new Error('User already has an assignment for this slot');
  }

  await db.insert(assignments).values({
    slot_id: slotId,
    user_id: userId,
    assignment_status: 'waitlisted',
  });
}

export async function cancelAssignmentForSlot(slotId: number, userId: string): Promise<void> {
  const existingAssignment = await db.query.assignments.findFirst({
    where: (assignments, { and, eq }) =>
      and(eq(assignments.slot_id, slotId), eq(assignments.user_id, userId)),
  });

  if (!existingAssignment) {
    throw new Error('No assignment found for this slot and user');
  }

  await db
    .delete(assignments)
    .where(and(eq(assignments.slot_id, slotId), eq(assignments.user_id, userId)));
}
