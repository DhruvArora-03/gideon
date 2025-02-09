import type { SlotWithAssignments } from '$lib/server/db/schema.js';

export async function load({ fetch }) {
  const res = await fetch('/api/slots');
  const json = await res.json();

  return {
    random: Math.random(),
    slots: json.map(
      (x: SlotWithAssignments) =>
        ({
          ...x,
          start_time: new Date(x.start_time),
          end_time: new Date(x.end_time),
        }) satisfies SlotWithAssignments,
    ),
  };
}
