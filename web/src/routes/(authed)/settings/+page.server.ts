import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import queries from '$lib/server/db/queries';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    error(401, 'could not find user');
  }

  const profile = await queries.getProfile(locals.user.id);

  return { profile };
};
