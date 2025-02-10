import queries from '$lib/server/db/queries';
import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const { slotId, userId } = await request.json();

  await queries.cancelAssignmentForSlot(slotId, userId);

  return text('');
};
