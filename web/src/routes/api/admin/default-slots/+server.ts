import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import queries from '$lib/server/db/queries';

export const POST: RequestHandler = async ({ request }) => {
  const { dotw, start_time, end_time, capacity } = await request.json();

  await queries.createDefaultSlot({ dotw, start_time, end_time, capacity });

  return text('');
};
