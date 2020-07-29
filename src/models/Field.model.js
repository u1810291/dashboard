import { formatValue } from 'lib/string';
import { isDateExpired } from '../lib/date';

export const FieldTypes = {
  Address: 'address',
  Gender: 'gender',
  Nationality: 'nationality',
  Date: 'date',
  FullName: 'fullName',
  DocumentNumber: 'documentNumber',
  DateOfBirth: 'dateOfBirth',
  ExpirationDate: 'expirationDate',
  EmissionDate: 'emissionDate',
};

export const FieldsExpirationCheck = {
  id: FieldTypes.ExpirationDate,
  lag: null,
};

export const FieldsEmissionCheck = {
  id: FieldTypes.EmissionDate,
  lag: {
    days: -90,
  },
};

export function getFieldsExtra(data) {
  if (!data) {
    return [];
  }

  return Object.entries(data).map(([id, { value, label }]) => ({
    id,
    label,
    value: formatValue(label, value),
  }));
}

export function getFieldIsExpired(field, config = [], refDate) {
  const check = config.find((item) => item.id === field.id);
  if (!check) {
    return false;
  }
  return isDateExpired(field.value, refDate, check.lag);
}

export function getFieldsExpired(fields = [], config, refDate) {
  return fields.filter((item) => getFieldIsExpired(item, config, refDate));
}

export function getCheckFieldsExtra(data) {
  if (!data) {
    return [];
  }

  return Object.entries(data).map(([key, value]) => ({
    id: key,
    label: value,
    value: formatValue(key, value),
  }));
}
