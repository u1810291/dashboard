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
  MonthShort: 'DD MMM,YYYY',
  DateTime: 'DD MMM, YYYY HH:mm',
  DayMonthShort: 'DD MMM',
};

export const DatePartTypes = {
  Month: 'month',
  Day: 'day',
  Year: 'year',
};

export const AllDateParts = [DatePartTypes.Day, DatePartTypes.Month, DatePartTypes.Year];

export const zeroTime = { hour: 0, minute: 0, second: 0, millisecond: 0 };
export const dayEndTime = { hour: 23, minute: 59, second: 59, millisecond: 999 };
export const todayMomentZeroTime = moment().set(zeroTime);

const INPUT_DATE_FORMATS = [
  moment.ISO_8601,
  DateFormat.YearOnly,
  DateFormat.MonthYear,
  DateFormat.DateFull,
  DateFormat.DateShort,
];

const RE_NON_DIGIT = /\D/g;

export function utcToLocalFormat(value, customFormat) {
  const dateAsMoment = moment.utc(value);
  if (dateAsMoment.isValid()) {
    return dateAsMoment.local().format(customFormat ?? DateFormat.MonthShort);
  }
  return null;
}

export function toLocalDate(date) {
  return date?.local()?.toDate();
}

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

export function isDateExpired(value, reference, lag) {
  if (!value) {
    // can't parse, but don't block
    return false;
  }
  let fixedRef = moment(reference);

  if (lag) {
    // shift reference date with lag value
    const lagDuration = moment.duration(lag);
    fixedRef = lagDuration.as('seconds') > 0
      ? fixedRef.subtract(lagDuration)
      : fixedRef.add(lagDuration);
  }

  const beforeRef = fixedRef.diff(moment(value));
  return beforeRef > 0;
}

export function isDateBetween(value, start, end) {
  return moment.utc(value).isBetween(moment.utc(start), moment.utc(end), 'day', '[]');
}

export function getYearsArray(from, to) {
  return Array.from({ length: to - from + 1 }, (_, i) => to - i);
}

export function addMissingZeros(dateString = ' ') {
  if (!dateString) {
    return null;
  }

  const [year, month, day] = dateString.split('-');
  const fixedMonth = (month?.length === 1 ? `0${month}` : month) || '';
  const fixedDay = (day?.length === 1 ? `0${day}` : day) || '';
  if (fixedDay || fixedMonth) {
    return `${year || ''}-${fixedMonth}-${fixedDay}`;
  }
  return null;
}
