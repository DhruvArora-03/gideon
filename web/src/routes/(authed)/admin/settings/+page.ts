import type { DefaultSlot } from '$lib/server/db/schema';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const defaultSlots: DefaultSlot[] = await fetch('/api/admin/default-slots').then((res) =>
    res.json(),
  );

  return {
    defaultSlots,
  };
};
