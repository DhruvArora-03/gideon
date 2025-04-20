import queries from '$lib/server/db/queries';
import { error, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
  const { start_time, end_time, capacity } = await request.json();

  if (!start_time || !end_time || !capacity) {
    return error(400, 'Missing required fields');
  }

  await queries.createSlots([{ start_time, end_time, capacity }]);

  return text('');
};
