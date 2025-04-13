import queries from '$lib/server/db/queries';
import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ request, params }) => {
  const id = Number.parseInt(params.id);
  const { dotw, start_time, end_time, capacity } = await request.json();

  await queries.updateDefaultSlot(id, { dotw, start_time, end_time, capacity });

  return text('');
};

export const DELETE: RequestHandler = async ({ params }) => {
  const id = Number.parseInt(params.id);

  queries.deleteDefaultSlot(id);

  return text('');
};
