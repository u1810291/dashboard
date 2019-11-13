import { inRange } from 'lodash';
import moment from 'moment';

/**
 * @param value number | string
 * @return string
 */
export function formatWeekDay(value) {
  return moment.weekdaysShort(+value);
}

/**
 * @param value number | string
 * @return string
 */
export function formatHour(value) {
  return moment().hours(+value).format('HH A');
}

/**
 * @param value string
 * @param format string
 * @return string
 */
export function formatDate(value, format) {
  return moment(value).format(format);
}

export const YearMonthFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
});

export const YearMonthShortFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
});

export function toIsoPeriod(period) {
  return `P${period}D`;
}

export function fromIsoPeriod(period) {
  const match = /^P(\d+)D$/.exec(period);
  if (match) {
    return match[1];
  }
  return match;
}

export function checkInterval(value, from, to) {
  return inRange(value, from, to + 1);
}
