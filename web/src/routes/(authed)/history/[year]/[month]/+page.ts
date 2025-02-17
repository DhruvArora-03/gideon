import type { Session } from '$lib/server/db/schema';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(`/api/sessions/${params.year}/${params.month}`);
  const json = await res.json();

  return {
    sessions: json.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (x: any) =>
        ({
          ...x,
          clock_in: new Date(x.clock_in),
          clock_out: new Date(x.clock_out),
        }) satisfies Session,
    ),
  };
};
