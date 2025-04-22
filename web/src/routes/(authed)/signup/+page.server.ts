import queries from '$lib/server/db/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
  return {
    slots: queries.getFutureSlots(),
  };
};
