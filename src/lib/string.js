import { titleize } from 'inflection';
import { formatDate } from 'lib/date';
import { startCase } from 'lodash';
import { useIntl } from 'react-intl';

export const FieldTitlizedPatterns = [
  'name',
  'address',
  'gender',
  'nationality',
  'taxstatus',

];

export const FieldTitlizedDashedPatterns = [
  'documenttype',
];

export const FieldDatePatterns = [
  'date',
];

export const FieldBooleanPatterns = [
  'deceased',
];

export const FieldMatchObjectPatterns = [
  'governmentFaceMatch',
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

  if (includesPattern(label, FieldTitlizedDashedPatterns)) {
    return titleize((value || '').replace('-', ' '));
  }

  if (includesPattern(label, FieldDatePatterns)) {
    return formatDate(value);
  }

  return value ? `${value}` : '';
}

export function useFormattedValue(label, value) {
  const intl = useIntl();

  if (includesPattern(label, FieldMatchObjectPatterns)) {
    return `${Math.floor((value.score) * 100)} ${intl.formatMessage({ id: `identity.field.${label}.units` })}`;
  }

  if (includesPattern(label, FieldBooleanPatterns)) {
    return intl.formatMessage({ id: value ? 'yes' : 'no' });
  }

  return formatValue(label, value);
}

export function trimMiddle(string = '', begin = 30, end = 5, delimiter = '…') {
  if (string.length < begin + end + delimiter.length) return string;
  const start = string.substring(0, begin);
  const finish = string.substring(string.length - end);
  return `${start}${delimiter}${finish}`;
}
