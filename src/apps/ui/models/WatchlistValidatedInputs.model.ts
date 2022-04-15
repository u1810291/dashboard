export const ERRORS_LIMIT = 10;

export enum ValidatedInputsKeys {
  FullName = 'fullName',
  DateOfBirth = 'dateOfBirth',
  DocumentType = 'documentType',
  DocumentNumber = 'documentNumber',
  Country = 'country',
  EmailAddress = 'emailAddress',
  PhoneNumber = 'phoneNumber',
  NotSelected = 'notSelected',
}

export interface ValidatedInputsFieldValuesOptions {
  fuzziness?: number;
}

export interface IValidatedInputsFieldTypes {
  label: string;
  value: ValidatedInputsKeys;
  options?: ValidatedInputsFieldValuesOptions;
}

export interface IValidationErrorFormated {
  systemField: ValidatedInputsKeys;
  type: string;
  row: number;
}

export type WatchlistValidatedInputsErrors = Partial<Record<ValidatedInputsKeys, IValidationErrorFormated[]>>;

export interface SelectedOptions {
  [key: string]: IValidatedInputsFieldTypes;
}
