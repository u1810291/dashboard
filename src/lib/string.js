import { titleize } from 'inflection';
import { formatDate } from 'lib/date';
import { startCase } from 'lodash';
import { useIntl } from 'react-intl';
import { isNil } from './isNil';

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
  'emissionDate',
];

export const FieldBooleanPatterns = [
  'deceased',
  'hasdebts',
  'ispep',
  'isphoneverified',
  'issourceverified',
  'registeredtaxpayer',
];

export const FieldMatchObjectPatterns = [
  'governmentfacematchscorepercentage',
];

export function titleCase(string = '') {
  return typeof string === 'string' ? startCase(string.toLowerCase()) : string;
}

function includesPattern(name = '', keys) {
  return keys.some((key) => name.toLowerCase() === key);
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

  return !isNil(value) ? `${value}` : '';
}

export function useFormattedValue(label, value) {
  const intl = useIntl();

  if (includesPattern(label, FieldMatchObjectPatterns)) {
    const number = !Number.isNaN(value) ? parseInt(value, 10) : '??';
    return `${number}% ${intl.formatMessage({ id: 'identity.field.match' })}`;
  }

  if (includesPattern(label, FieldBooleanPatterns)) {
    return intl.formatMessage({
      id: value ? `identity.field.${label}.positive` : `identity.field.${label}.negative`,
      defaultMessage: intl.formatMessage({ id: value ? 'yes' : 'no' }),
    });
  }

  return formatValue(label, value);
}

export function trimMiddle(string = '', begin = 30, end = 5, delimiter = '…') {
  if (string.length < begin + end + delimiter.length) return string;
  const start = string.substring(0, begin);
  const finish = string.substring(string.length - end);
  return `${start}${delimiter}${finish}`;
}

export function stringHash(s) {
  return s.split('').reduce((prev, subStr) => {
    // eslint-disable-next-line no-bitwise
    const hash = ((prev << 5) - prev) + subStr.charCodeAt(0);
    // eslint-disable-next-line no-bitwise
    return hash & hash;
  }, 0);
}
