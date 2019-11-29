import { humanize, underscore } from 'inflection';
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

export function getFieldsExtra(step) {
  if (!(step && step.data)) {
    return [];
  }
  return Object.entries(step.data).map(([label, { value }]) => ({
    id: label,
    label: humanize(underscore(label)),
    value: formatValue(label, value),
  }));
}
