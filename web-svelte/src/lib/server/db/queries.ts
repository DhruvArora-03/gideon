import type { Drizzle } from '$lib/server/db/drizzle';
import { slots } from '$lib/server/db/schema';
import { gte } from 'drizzle-orm';

export async function getSlots(db: Drizzle) {
  return db.rls(async (tx) => {
    return await tx.query.slots.findMany({
      where: gte(slots.date, new Date().toISOString()),
    });
  });
}
