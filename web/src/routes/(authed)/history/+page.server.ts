import queries from '$lib/server/db/queries';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './[year]/[month]/$types';

export const load: PageServerLoad = async ({ locals: { user }, url }) => {
  if (!user) {
    error(401, 'unauthorized');
  }

  const today = new Date();
  const month = Number.parseInt(url.searchParams.get('month') ?? String(today.getMonth()));
  const year = Number.parseInt(url.searchParams.get('year') ?? String(today.getFullYear()));

  return {
    month,
    year,
    sessions: queries.getSessions(user.id, year, month),
  };
};
