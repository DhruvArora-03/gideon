import { db } from '$lib/server/db';
import { type SlotWithAssignments } from '$lib/server/db/schema';

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
