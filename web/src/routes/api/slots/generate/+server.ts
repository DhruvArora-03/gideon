import queries from '$lib/server/db/queries';
import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { DefaultSlot } from '$lib/server/db/schema';
import { getDaysBetween, parseTime } from '$lib/date';

export const POST: RequestHandler = async () => {
  const slots = queries.getSlots();

  const defaults = queries.getDefaultSlots();

  await Promise.all([slots, defaults])
    .then(async ([slots, defaults]) => {
      const grouped = defaults.reduce(
        (acc, curr) => {
          if (!acc[curr.dotw]) {
            acc[curr.dotw] = [];
          }
          acc[curr.dotw].push(curr);
          return acc;
        },
        {} as Record<number, DefaultSlot[]>,
      );

      const newSlots = [];
      for (const dotw in grouped) {
        const date = new Date();
        date.setDate(date.getDate() + ((7 - date.getDay() + Number(dotw)) % 7));

        while (getDaysBetween(new Date(), date) <= 14) {
          if (slots.every((s) => getDaysBetween(new Date(s.start_time), date) !== 0)) {
            for (const ds of grouped[dotw]) {
              const start = parseTime(
                ds.start_time,
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
              );

              const end = parseTime(
                ds.end_time,
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
              );

              newSlots.push({
                start_time: start,
                end_time: end,
                capacity: ds.capacity,
              });
            }
          }

          date.setDate(date.getDate() + 7);
        }
      }

      newSlots.sort((a, b) => a.start_time.getTime() - b.start_time.getTime());

      await queries.createSlots(newSlots);
      console.log('created slots', newSlots);
    })
    .catch((err) => {
      console.error('Error fetching slots or defaults:', err);
    });

  return text('done');
};
