import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import queries from '$lib/server/db/queries';

export const GET: RequestHandler = async () => {
  const slots = await queries.getSlots();

  return json(slots);
};
