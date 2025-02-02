import { db } from '$lib/server/db';
import { type SlotWithAssignments } from '$lib/server/db/schema';

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
