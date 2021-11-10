import inRange from 'lodash/inRange';
import dayjs, { Dayjs } from 'dayjs';

import utcSupport from 'dayjs/plugin/utc';
import objectSupport from 'dayjs/plugin/objectSupport';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(utcSupport);
dayjs.extend(objectSupport);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);

export enum DateFormat {
  YearOnly = 'YYYY',
  MonthYear = 'MMM, YYYY',
  MonthDate = 'MM/DD',
  DateFull = 'MMM D, YYYY',
  DateShort = 'DD/MM/YYYY',
  DateShortDayOneDigit = 'D/MM/YYYY',
  DateShortStroke = 'YYYY-MM-DD',
  HoursFull = 'HH A',
  // TODO = @pabloscdo consult with product about this "no space" format
  MonthShort = 'DD MMM,YYYY',
  DayShortMonthShortWithSpace = 'D MMM, YYYY',
  MonthShortWithSpace = 'DD MMM, YYYY',
  DateTime = 'DD MMM, YYYY HH:mm',
  DayMonthShort = 'DD MMM',
  ShortDayAndLocalizedDateWithShortMonth = 'ddd ll', // Wed, Sep 22, 2021
  FullMonthAndFullYear = 'MMMM YYYY', // September 2021
  LocalizedDayMonthYearSlashes = 'L', // 09/22/2021
  FullMonthDateAndFullYear = 'll', // Mar 11, 1992
}

export const DatePartTypes = {
  Month: 'month',
  Day: 'day',
  Year: 'year',
};

export const AllDateParts = [DatePartTypes.Day, DatePartTypes.Month, DatePartTypes.Year];

export const zeroTime = { hour: 0, minute: 0, second: 0, millisecond: 0 };
export const dayEndTime = { hour: 23, minute: 59, second: 59, millisecond: 999 };

const RE_NON_DIGIT = /\D/g;

export function utcToLocalFormat(value: string | Date, customFormat?: string) {
  const date = dayjs.utc(value);
  if (date.isValid()) {
    return date.local().format(customFormat ?? DateFormat.MonthShort);
  }
  return null;
}

function parseDateStringToDayJS(value: string): Dayjs | null {
  // First try one of the custom formats we support.
  let date = dayjs(value, [DateFormat.DateShortDayOneDigit]);
  if (date.isValid()) {
    return date;
  }

  // Attempt any valid ISO8601 String (ex. "YYYY", "MMM, YYYY", "MMM D, YYYY", etc.)
  date = dayjs.utc(value);
  if (date.isValid()) {
    return date;
  }

  return null;
}

export function formatDate(value: string, customFormat?: string) {
  const dateAsDayJs = parseDateStringToDayJS(value);

  if (!dateAsDayJs) {
    return value;
  }

  if (customFormat) {
    return dateAsDayJs.format(customFormat);
  }

  const { length: dateLength } = value.replace(RE_NON_DIGIT, '');

  if (dateLength > 7) {
    return dateAsDayJs.format(DateFormat.DateFull);
  }
  if (dateLength > 5) {
    return dateAsDayJs.format(DateFormat.MonthYear);
  }
  return dateAsDayJs.format(DateFormat.YearOnly);
}

export function toIsoPeriod(period: number | string): string {
  return `P${period}D`;
}

export function fromIsoPeriod(period: string): string {
  const match = /^P(\d+)D$/.exec(period);
  if (match) {
    return match[1];
  }
  return '';
}

// TODO: @pabloscdo - type out checkInterval inputs and conform types in GdprPopup
export function checkInterval(value, from, to): boolean {
  return inRange(value, from, to + 1);
}

export function normalizeDate(value): Date {
  const date = dayjs.utc(value, DateFormat.DateFull, true);
  return date.isValid()
    ? date.format(DateFormat.DateShortStroke)
    : value;
}

export function isDateBetween(value, start, end): boolean {
  return dayjs.utc(value).isBetween(dayjs.utc(start), dayjs.utc(end), 'day', '[]');
}

export function getYearsArray(from, to): number[] {
  return Array.from({ length: to - from + 1 }, (_, i) => to - i);
}

export function addMissingZeros(dateString = ' '): string | null {
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

export function dateSortCompare(a: string, b: string, isFromOldToNew: boolean = false): number {
  return isFromOldToNew ? dayjs.utc(a).diff(dayjs.utc(b)) : -dayjs.utc(a).diff(dayjs.utc(b));
}

export function getUnixTimestamp(date: Date) {
  return Math.trunc((date.getTime() / 1000));
}
