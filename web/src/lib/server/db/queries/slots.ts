import { db } from '$lib/server/db';
import {
  assignments,
  slots,
  type AssignmentWithSlot,
  type NewSlot,
  type Slot,
  type SlotWithAssignments,
} from '$lib/server/db/schema';
import { and, eq, getTableColumns, gt } from 'drizzle-orm';

export async function getFutureSlots(): Promise<SlotWithAssignments[]> {
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

export async function createSlots(newSlots: NewSlot[]): Promise<Slot[]> {
  if (newSlots.length === 0) {
    console.warn('createSlots called with empty array');
    return [];
  }

  return db.insert(slots).values(newSlots).returning();
}

export async function signUpForSlot(slotId: number, userId: string): Promise<void> {
  const existingAssignment = await db.query.assignments.findFirst({
    where: (a, { and, eq }) => and(eq(a.slot_id, slotId), eq(a.user_id, userId)),
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
    where: (a, { and, eq }) => and(eq(a.slot_id, slotId), eq(a.user_id, userId)),
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

export async function getUpcomingAssignments(userId: string): Promise<AssignmentWithSlot[]> {
  return db
    .select({
      ...getTableColumns(assignments),
      slot: getTableColumns(slots),
    })
    .from(assignments)
    .where(and(eq(assignments.user_id, userId), gt(slots.start_time, new Date())))
    .innerJoin(slots, eq(assignments.slot_id, slots.id));
}
