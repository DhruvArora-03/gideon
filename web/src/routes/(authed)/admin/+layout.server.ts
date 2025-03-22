import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import queries from '$lib/server/db/queries';

export const load: LayoutServerLoad = async ({ locals: { session, user } }) => {
  if (!session || !user) {
    error(401, 'Unauthorized');
  }

  const profile = await queries.getProfile(user.id);
  if (profile.role !== 'admin' && profile.role !== 'manager') {
    error(401, `Role "${profile.role}" is unauthorized for admin access`);
  }
};
