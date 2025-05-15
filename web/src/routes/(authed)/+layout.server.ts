import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import queries from '$lib/server/db/queries';

export const load: LayoutServerLoad = async ({ locals: { session, user } }) => {
  if (!session || !user) {
    error(401, 'Unauthorized');
  }

  return {
    session,
    user,
    profile: queries.getProfile(user.id),
  };
};
