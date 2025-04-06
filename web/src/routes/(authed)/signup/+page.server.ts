import queries from '$lib/server/db/queries';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async () => {
  return {
    slots: queries.getSlots(),
  };
};
