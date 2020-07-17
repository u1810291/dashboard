import { formatValue } from 'lib/string';

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

export const FieldsExpiredCheck = [
  FieldTypes.ExpirationDate,
];

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
