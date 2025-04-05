import { db } from '$lib/server/db';
import { defaultSlots, type DefaultSlot, type NewDefaultSlot } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

type DefaultSlotMutation = Omit<NewDefaultSlot, 'id' | 'created_at' | 'updated_at'>;

export async function getDefaultSlots(): Promise<DefaultSlot[]> {
  return await db.query.defaultSlots.findMany({
    orderBy: (defaultSlots) => defaultSlots.dotw,
  });
}

export async function createDefaultSlot(params: DefaultSlotMutation): Promise<void> {
  await db.insert(defaultSlots).values(params);
}

export async function updateDefaultSlot(id: number, params: DefaultSlotMutation): Promise<void> {
  await db.update(defaultSlots).set(params).where(eq(defaultSlots.id, id));
}

export async function deleteDefaultSlot(id: number): Promise<void> {
  await db.delete(defaultSlots).where(eq(defaultSlots.id, id));
}
