import { db } from '$lib/server/db';
import type { DefaultSlot } from '$lib/server/db/schema';

export async function getDefaultSlots(): Promise<DefaultSlot[]> {
  return await db.query.defaultSlots.findMany({
    orderBy: (defaultSlots) => defaultSlots.dotw,
  });
}
