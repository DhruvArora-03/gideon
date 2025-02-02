import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { session, user } }) => {
  if (!session || !user) {
    error(401, 'Unauthorized');
  }

  return { session, user };
};
