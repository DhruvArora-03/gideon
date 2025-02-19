import type { SlotWithAssignments } from '$lib/server/db/schema.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/api/slots');
  const json = await res.json();

  return {
    slots: json.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (x: any) =>
        ({
          ...x,
          start_time: new Date(x.start_time),
          end_time: new Date(x.end_time),
        }) satisfies SlotWithAssignments,
    ),
  };
};
