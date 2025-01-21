import { getSlots } from '$lib/server/db/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { db } }) => {
  const slots = await getSlots(db);
  console.log(`found ${slots.length} slots: ${slots}`);
  return { slots };
};
