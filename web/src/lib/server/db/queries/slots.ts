import { db } from '$lib/server/db';
import { assignments, slots, type NewSlot, type SlotWithAssignments } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';

export async function getSlots(): Promise<SlotWithAssignments[]> {
  return db.query.slots.findMany({
    with: {
      assignments: {
        orderBy: (a) => [a.updated_at],
      },
    },
    where: (s, { gt }) => gt(s.start_time, new Date()),
    orderBy: (s) => [s.start_time],
  });
}

export async function createSlots(newSlots: NewSlot[]): Promise<void> {
  if (newSlots.length === 0) {
    throw new Error('No slots to create');
  }

  await db.insert(slots).values(newSlots);
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
