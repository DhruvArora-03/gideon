import type { SlotWithAssignments } from '$lib/server/db/schema';

const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
});

export const formatDate = dateFormat.format;

const dateWithWeekdayFormat = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'numeric',
  day: '2-digit',
});

export const formatDateWithWeekday = dateWithWeekdayFormat.format;

const timeFormat = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
});

export const formatTime = timeFormat.format;

export type Week = {
  start: Date;
  days: SlotWithAssignments[][];
};

export const createWeek = (start: Date) => {
  const week: Week = {
    start,
    days: Array.from({ length: 7 }, () => []),
  };
  return week;
};

export const addDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const getStartOfWeek = (date: Date) => {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  return d;
};

export const getDaysBetween = (date1: Date, date2: Date) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  const diffTime = d2.getTime() - d1.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays;
};
