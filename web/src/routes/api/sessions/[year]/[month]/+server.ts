import queries from '$lib/server/db/queries';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals: { user }, params }) => {
  if (!user) {
    error(401, 'could not find user');
  }

  const year = Number.parseInt(params.year);
  const month = Number.parseInt(params.month);
  const sessions = await queries.getSessions(user.id, year, month);

  return json(sessions);
};
