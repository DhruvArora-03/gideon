import { db } from '$lib/server/db';
import type { DefaultSlot } from '$lib/server/db/schema';

/**
 * Gets all of the default slots.
 *
 * Returns all of the default slots
 *
 * @returns {Promise<DefaultSlot[]>}
 */
export async function getDefaultSlots(): Promise<DefaultSlot[]> {
  return await db.query.defaultSlots.findMany({
    orderBy: (defaultSlots) => defaultSlots.dotw,
  });
}
