const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
});

export const formatDate = dateFormat.format;

const dateWithWeekdayFormat = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
});

export const formatDateWithWeekday = dateWithWeekdayFormat.format;

const timeFormat = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
});

export const formatTime = timeFormat.format;
