import queries from '$lib/server/db/queries';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals: { user } }) => {
  if (!user) {
    error(401, 'could not find user');
  }

  const sessions = await queries.getSessions(user.id);

  return json(sessions);
};
