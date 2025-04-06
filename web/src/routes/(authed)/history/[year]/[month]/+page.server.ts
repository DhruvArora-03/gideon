import queries from '$lib/server/db/queries';
import { error, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals: { user }, params }) => {
  if (!user) {
    error(401, 'unauthorized');
  }

  if (!params.month || !params.year) {
    error(400, `url params missing - month: ${params.month}, year: ${params.year}`);
  }

  const month = Number.parseInt(params.month);
  const year = Number.parseInt(params.year);

  if (isNaN(month) || isNaN(year)) {
    error(400, `invalid url params - month: ${params.month}, year: ${params.year}`);
  }

  return {
    month: Number.parseInt(params.month),
    year: Number.parseInt(params.year),
    sessions: queries.getSessions(user.id, year, month),
  };
};
