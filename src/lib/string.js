import { titleize } from 'inflection';
import { formatDate } from 'lib/date';
import { startCase } from 'lodash';

export const FieldTitlizedPatterns = [
  'name',
  'address',
  'gender',
  'nationality',
];

export const FieldDatePatterns = [
  'date',
];

export function titleCase(string = '') {
  return typeof string === 'string' ? startCase(string.toLowerCase()) : string;
}

function includesPattern(name = '', keys) {
  return keys.some((key) => name.toLowerCase().includes(key));
}

export function formatValue(label, value) {
  if (includesPattern(label, FieldTitlizedPatterns)) {
    return titleize(value || '');
  }

  if (includesPattern(label, FieldDatePatterns)) {
    return formatDate(value);
  }

  return `${value}`;
}

export function trimMiddle(string = '', begin = 30, end = 5, delimiter = '…') {
  if (string.length < begin + end + delimiter.length) return string;
  const start = string.substring(0, begin);
  const finish = string.substring(string.length - end);
  return `${start}${delimiter}${finish}`;
}
