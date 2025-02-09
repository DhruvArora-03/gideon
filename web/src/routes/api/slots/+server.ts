import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { getSlots } from '$lib/server/db/queries';

export const GET: RequestHandler = async () => {
  const slots = await getSlots();

  return json(slots);
};
