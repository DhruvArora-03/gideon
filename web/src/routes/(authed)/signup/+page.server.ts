import queries from '$lib/server/db/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends }) => {
  depends('data:slots');

  return {
    slots: queries.getFutureSlots(),
  };
};
