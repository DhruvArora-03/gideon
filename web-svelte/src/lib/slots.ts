import type { SlotWithAssignments } from '$lib/server/db/schema';
import { type Week, createWeek, getStartOfWeek, getDaysBetween, addDays } from '$lib/date';

export function organizeSlots(slots: SlotWithAssignments[]) {
  const weeks: Week[] = [];
  let curr = createWeek(getStartOfWeek(new Date()));
  weeks.push(curr);

  for (const slot of slots) {
    // check if starting a new week
    const startOfWeek = getStartOfWeek(slot.start_time);
    while (getDaysBetween(curr.start, startOfWeek) > 0) {
      curr = createWeek(addDays(curr.start, 7));
      weeks.push(curr);
    }

    curr.days[slot.start_time.getDay()].push(slot);
  }
  return weeks;
}
