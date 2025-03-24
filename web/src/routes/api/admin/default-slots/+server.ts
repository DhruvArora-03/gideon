import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import queries from '$lib/server/db/queries';

export const GET: RequestHandler = async () => {
  const slots = await queries.getDefaultSlots();

  return json(slots);
};

// export const POST: RequestHandler = async ({ request }) => {
//   const { } = await request.json();
//
//   await queries.
//
//   return text('');
// };
