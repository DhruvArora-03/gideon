import { db } from '$lib/server/db';
import { assignments, type SlotWithAssignments } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';

/**
 * Retrieves all future slots with their unique user assignments.
 *
 * For each slot, fetches all assignments and filters to keep only one
 * assignment per user. Only returns slots that start after the current time.
 *
 * @returns {Promise<SlotWithAssignments[]>} Array of future slots, each containing their assignments filtered to one per user
 */
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

/**
 * Signs up a user for a specific slot.
 *
 * Checks if the user already has an assignment for this slot.
 * If they do, throws an error. Otherwise creates a new confirmed assignment.
 *
 * @param {string} slotId - The ID of the slot to sign up for
 * @param {string} userId - The ID of the user signing up
 * @throws {Error} If user already has an assignment for this slot
 * @returns {Promise<void>}
 */
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

/**
 * Joins the waitlist for a specific slot.
 *
 * Checks if the user already has an assignment for this slot.
 * If they do, throws an error. Otherwise creates a new waitlisted assignment.
 *
 * @param {number} slotId - The ID of the slot to join the waitlist for
 * @param {string} userId - The ID of the user joining the waitlist
 * @throws {Error} If the user already has an assignment for this slot
 * @returns {Promise<void>}
 */
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

/**
 * Cancels the assignment for a specific slot.
 *
 * Finds the existing assignment for the given slot and user, and deletes it.
 * Throws an error if no assignment exists.
 *
 * @param {number} slotId - The ID of the slot for which to cancel the assignment
 * @param {string} userId - The ID of the user canceling the assignment
 * @throws {Error} If no assignment exists for this slot and user
 * @returns {Promise<void>}
 */
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
