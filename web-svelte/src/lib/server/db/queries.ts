import { db } from '$lib/server/db';
import { slots } from '$lib/server/db/schema';
import { gte } from 'drizzle-orm';

export async function getSlots() {
  return await db.query.slots.findMany({
    where: gte(slots.date, new Date().toISOString()),
  });
}
