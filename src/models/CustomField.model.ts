import { formatDate } from 'lib/date';
import { isNil } from 'lib/isNil';
import { VerificationResponse } from './VerificationOld.model';
import { InputTypes as InputsType } from './Input.model';

export interface IAtomicCustomField {
  placeholder?: string;
  type: AtomicCustomFieldType;
  selectOptions?: ISelectOptions[];
  mapping?: IMapping;
  regex?: string;
  value?: string;
}

export interface ICustomField {
  name: string;
  type: MainCustomFieldType;
  isMandatory: boolean;
  label: string;
  thumbnail?: {
    publicUrl: string;
    url: string;
  };
  atomicFieldParams?: IAtomicCustomField;
  children?: ICustomField[];
  selectedGroup?: string;
}

export interface ISelectOptions {
  label: string;
  value: string;
}

export interface IMapping {
  country: string;
  key: string;
  shouldCheckFormat: boolean;
  shouldFilter: boolean;
}

export enum AtomicCustomFieldType {
  Text = 'text',
  Date = 'date',
  Checkbox = 'checkbox',
  Select = 'select',
}

export enum MainCustomFieldType {
  Group = 'group',
  Select = 'select',
  Atomic = 'atomic',
}

export interface IVerificationCustomFieldsInputData {
  fields: ICustomField[];
}

export const formatedValue = (field: ICustomField, value: string): string => (field.type === MainCustomFieldType.Atomic && field.atomicFieldParams.type === AtomicCustomFieldType.Date
  ? value ? formatDate(value) : '-'
  : !isNil(value) ? `${value}` : '-');

export interface VerificationCustomFieldsInputData {
  fields: ICustomField[];
  country: string;
}

export type CustomFieldDataForVerificationComponent = VerificationCustomFieldsInputData & { isOldVerification: boolean };

export const getDataForVerificationComponent = (verification: VerificationResponse): CustomFieldDataForVerificationComponent | null => {
  const customFieldInput = verification?.inputs?.find((input) => input?.id === InputsType.CustomFields);
  if (!customFieldInput) {
    return null;
  }
  let isOldVerification = true;
  let { fields, country } = customFieldInput?.data;
  if (verification?.customFieldsDataCopy) {
    isOldVerification = false;
    fields = verification.customFieldsDataCopy.fields;
    country = verification.customFieldsDataCopy.country;
  }
  return {
    fields,
    country,
    isOldVerification,
  };
};
