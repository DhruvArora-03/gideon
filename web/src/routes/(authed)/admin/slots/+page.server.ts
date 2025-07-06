import queries from '$lib/server/db/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    slots: queries.getFutureSlots(),
  };
};
