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
  ConnectionData: 'connection-data',
};

export const FieldsWithDate = [
  FieldTypes.DateOfBirth,
  FieldTypes.EmissionDate,
  FieldTypes.ExpirationDate,
];

export const EditedDateEmptyField = '--';

export function getFieldsExtra(data) {
  if (!data) {
    return [];
  }

  return Object.entries(data).map(([id, { value, label }]) => ({
    id,
    label,
    // `id` here to support old verification format
    value: formatValue(label || id, value),
  }));
}
