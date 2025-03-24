import type { SlotWithAssignments } from '$lib/server/db/schema';

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const YEARS = Array.from(
  { length: new Date().getFullYear() - 2020 },
  (_, i) => new Date().getFullYear() - i,
);

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

const dotwFormat = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
});

export const formatDotw = (dotw: number): string => dotwFormat.format(new Date(0, 0, dotw));

export const parseTime = (time: string): number => {
  const regex = /^(\d{2}):(\d{2}):(\d{2})([-+])(\d{2}):(\d{2})?$/;

  const match = time.match(regex);
  if (!match) {
    throw new Error(`Invalid time format: ${time}`);
  }

  const [, hours, minutes, seconds, sign, offsetHours, offsetMinutes] = match;

  const oh = Number.parseInt(offsetHours);
  const om = offsetMinutes ? Number.parseInt(offsetMinutes) : 0;

  const totalOffsetMinutes = (sign === '-' ? -1 : 1) * (oh * 60 + om);

  return Date.UTC(
    0,
    0,
    0,
    Number.parseInt(hours),
    Number.parseInt(minutes) + totalOffsetMinutes,
    Number.parseInt(seconds),
    0,
  );
};

export type Week = {
  start: Date;
  days: SlotWithAssignments[][];
};

export const createWeek = (start: Date): Week => {
  const week: Week = {
    start,
    days: Array.from({ length: 7 }, () => []),
  };
  return week;
};

export const addDays = (date: Date, days: number): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const getStartOfWeek = (date: Date): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  return d;
};

export const getDaysBetween = (date1: Date, date2: Date): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  const diffTime = d2.getTime() - d1.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays;
};

export const getDuration = (start: Date, end: Date): string => {
  const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

  return `${hours.toFixed(2)} ${hours === 1 ? 'hour' : 'hours'}`;
};
