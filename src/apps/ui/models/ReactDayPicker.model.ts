import dayjs from 'dayjs';
import { DateFormat } from 'lib/date';
import { DEFAULT_LOCALE } from 'models/Intl.model';

// Defines react-day-picker LocaleUtils:
// https://react-day-picker.js.org/api/LocaleUtils

export function formatDay(day: Date, locale = DEFAULT_LOCALE): string {
  return dayjs(day)
    .locale(locale)
    .format(DateFormat.ShortDayAndLocalizedDateWithShortMonth);
}

export function formatMonthTitle(date: Date, locale = DEFAULT_LOCALE): string {
  return dayjs(date)
    .locale(locale)
    .format(DateFormat.FullMonthAndFullYear);
}

export function formatWeekdayShort(day: number, locale = DEFAULT_LOCALE): string {
  return dayjs().locale(locale).localeData().weekdaysMin()[day];
}

export function formatWeekdayLong(day: number, locale = DEFAULT_LOCALE): string {
  return dayjs().locale(locale).localeData().weekdays()[day];
}

export function getFirstDayOfWeek(locale = DEFAULT_LOCALE): number {
  return dayjs().locale(locale).localeData().firstDayOfWeek();
}

// Docs are wrong, this shouldn't be a number, but an array of 12 month name strings, see example from source:
// https://github.com/gpbl/react-day-picker/blob/750f6cd808b2ac29772c8df5c497a66e818080e8/src/LocaleUtils.js#L48
export function getMonths(locale = DEFAULT_LOCALE): [string, string, string, string, string, string, string, string, string, string, string, string] {
  return dayjs().locale(locale).localeData().months();
}

export function formatDate(date: Date, format: string = DateFormat.LocalizedDayMonthYearSlashes, locale: string = DEFAULT_LOCALE): string {
  return dayjs(date)
    .locale(locale)
    .format(Array.isArray(format) ? format[0] : format);
}

export function parseDate(str: string, format: string = DateFormat.LocalizedDayMonthYearSlashes, locale: string = DEFAULT_LOCALE): Date | undefined {
  const m = dayjs(str, format, locale, true);
  if (m.isValid()) {
    return m.toDate();
  }
  return undefined;
}

export default {
  formatDay,
  formatMonthTitle,
  formatWeekdayShort,
  formatWeekdayLong,
  getFirstDayOfWeek,
  getMonths,
  formatDate,
  parseDate,
};
