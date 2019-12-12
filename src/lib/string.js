import { titleize } from 'inflection';
import { startCase } from 'lodash';
import moment from 'moment';

export const FieldTitlizedPatterns = [
  'name',
  'address',
  'gender',
  'nationality',
];

export const FieldDatePatterns = [
  'date',
];

const INPUT_DATE_FORMATS = [moment.ISO_8601, 'YYYY', 'MMM, YYYY', 'MMM D, YYYY', 'DD/MM/YYYY'];
const RE_NON_DIGIT = /\D/g;

export function titleCase(string = '') {
  return typeof string === 'string' ? startCase(string.toLowerCase()) : string;
}

export function formatDate(value) {
  const dateAsMoment = moment.utc(value, INPUT_DATE_FORMATS);
  if (dateAsMoment.isValid()) {
    const { length: dateLength } = value.replace(RE_NON_DIGIT, '');

    if (dateLength > 7) {
      return dateAsMoment.format('MMM D, YYYY');
    } else if (dateLength > 5) {
      return dateAsMoment.format('MMM, YYYY');
    } else {
      return dateAsMoment.format('YYYY');
    }
  } else {
    return value;
  }
}

function includesPattern(name, keys) {
  return keys.some((key) => name.toLowerCase().includes(key));
}

export function formatValue(label, value) {
  if (includesPattern(label, FieldTitlizedPatterns)) {
    return titleize(value || '');
  }

  if (includesPattern(label, FieldDatePatterns)) {
    return formatDate(value);
  }

  return value;
}

export function trimMiddle(string = '', begin = 30, end = 5, delimiter = '…') {
  if (string.length < begin + end + delimiter.length) return string;
  const start = string.substring(0, begin);
  const finish = string.substring(string.length - end);
  return `${start}${delimiter}${finish}`;
}
