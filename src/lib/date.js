import { inRange } from 'lodash';
import moment from 'moment';

export const DateFormat = {
  YearOnly: 'YYYY',
  MonthYear: 'MMM, YYYY',
  MonthDate: 'MM/DD',
  DateFull: 'MMM D, YYYY',
  DateShort: 'DD/MM/YYYY',
  DateShortStroke: 'YYYY-MM-DD',
  HoursFull: 'HH A',
};

const INPUT_DATE_FORMATS = [
  moment.ISO_8601,
  DateFormat.YearOnly,
  DateFormat.MonthYear,
  DateFormat.DateFull,
  DateFormat.DateShort,
];

const RE_NON_DIGIT = /\D/g;

export function formatDate(value, customFormat) {
  const dateAsMoment = moment.utc(value, INPUT_DATE_FORMATS);
  if (!dateAsMoment.isValid()) {
    return value;
  }

  if (customFormat) {
    return dateAsMoment.format(customFormat);
  }

  const { length: dateLength } = value.replace(RE_NON_DIGIT, '');

  if (dateLength > 7) {
    return dateAsMoment.format(DateFormat.DateFull);
  }
  if (dateLength > 5) {
    return dateAsMoment.format(DateFormat.MonthYear);
  }
  return dateAsMoment.format(DateFormat.YearOnly);
}

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
  return moment().hours(+value).format(DateFormat.HoursFull);
}

export function toIsoPeriod(period) {
  return `P${period}D`;
}

export function fromIsoPeriod(period) {
  const match = /^P(\d+)D$/.exec(period);
  if (match) {
    return match[1];
  }
  return match || '';
}

export function checkInterval(value, from, to) {
  return inRange(value, from, to + 1);
}

export function normalizeDate(value) {
  const date = moment.utc(value, DateFormat.DateFull, true);
  return date.isValid()
    ? date.format(DateFormat.DateShortStroke)
    : value;
}
