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
