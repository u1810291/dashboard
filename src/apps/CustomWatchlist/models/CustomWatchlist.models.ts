import { CustomWatchlistSeverityOnMatchTypes } from 'models/CustomWatchlist.model';
import { ErrorStatuses } from 'models/Error.model';
import { getStepStatus, IStep, StepStatus } from 'models/Step.model';

export const customWatchlistsPollingDelay = 30000;

export enum CsvSeparatorInputEnum {
  Semicolon = 'semicolon',
  Comma = 'comma',
  Dot = 'dot',
  Tab = 'tab',
  Pipe = 'pipe',
}

export const CsvDelimiterTypes = {
  [CsvSeparatorInputEnum.Semicolon]: ';',
  [CsvSeparatorInputEnum.Comma]: ',',
  [CsvSeparatorInputEnum.Dot]: '.',
  [CsvSeparatorInputEnum.Tab]: '\t',
  [CsvSeparatorInputEnum.Pipe]: '|',
};

export interface WatchlistMappingOptions {
  fuzziness?: number;
}

export interface WatchlistMapping {
  systemField: ValidatedInputsKeys;
  merchantField: string;
  options?: WatchlistMappingOptions;
}

export interface FlowWatchlistUi {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  merchantId: string;
  mapping: WatchlistMapping[] | null;
  severityOnMatch: CustomWatchlistSeverityOnMatchTypes;
  process: Partial<WatchlistProcess> | null;
}

export enum WatchlistProcessName {
  ContentParse = 'contentParse',
}

export enum WatchlistProcessStatus {
  Pending = 'pending',
  Running = 'running',
  Completed = 'completed',
}

export interface WatchlistProcess {
  completedAt: string | null;
  createdAt: string | null;
  error: CustomWatchlistValidationError[] | null;
  id: number;
  inputSourceFileName: string;
  inputSourceFileKey: string;
  name: WatchlistProcessName;
  startCount: number;
  status: WatchlistProcessStatus;
  startedAt: string | null;
  updatedAt: string | null;
  watchlistId: number;
  csvSeparator: string;
}

export interface IWatchlist {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  merchantId: string;
  mapping: WatchlistMapping[] | null;
  process: Partial<WatchlistProcess> | null;
}

export interface ICurrentCustomWatchlist extends Partial<IWatchlist> {
  headers?: string[];
}

export interface CustomWatchlistUpload {
  key: string;
}

export enum CustomWatchlistSettingsTypes {
  Watchlists = 'watchlists',
}

export enum CustomWatchlistCheckTypes {
  CustomDatabases = 'customDatabases',
}

export enum ValidatedInputsKeys {
  FullName = 'fullName',
  DateOfBirth = 'dateOfBirth',
  DocumentType = 'documentType',
  DocumentNumber = 'documentNumber',
  Country = 'country',
  EmailAddress = 'emailAddress',
  PhoneNumber = 'phoneNumber',
}

export enum CustomWatchlistModalValidationInputs {
  Name = 'name',
  FileKey = 'sourceFileKey',
  Mapping = 'mapping',
  CsvSeparator = 'csvSeparator',
  FileName = 'fileName'
}

export enum CustomWatchlistFileExt {
  Csv = 'csv',
  Xls = 'xls',
}

export interface WatchlistCreateBodyTypes {
  name: string;
  mapping: WatchlistMapping[];
}

export interface WatchlistContentTypes {
  sourceFileKey: string;
  fileName: string;
  csvSeparator: string;
}

export type CustomWatchlistHeaders = Pick<WatchlistContentTypes, 'sourceFileKey' | 'csvSeparator'>

export interface CustomWatchlistShortValidation extends Pick<WatchlistContentTypes, 'sourceFileKey' | 'csvSeparator'>, Pick<IWatchlist, 'mapping'> {}

export interface CustomWatchlistValidationErrorData {
  fieldName: ValidatedInputsKeys;
  row: number;
}
export interface CustomWatchlistValidationError {
  code: ErrorStatuses;
  type: string;
  data: CustomWatchlistValidationErrorData;
  retryable: false;
}
export interface ICustomWatchlistValidationError {
  valid: boolean;
  errors: CustomWatchlistValidationError[];
}

export interface ICustomWatchlistValidationErrorFormated {
  systemField: ValidatedInputsKeys;
  type: string;
  row: number;
}

export enum CustomWatchlistSearchParamsKeysEnum {
  fullName = 'fullName',
  dateOfBirth = 'dateOfBirth',
}

export interface CustomWatchlistStepDataWatchlist {
  id: string;
  name: string;
}

export interface CustomWatchlistStepDataSearchParams {
  fullName?: string;
  dateOfBirth?: string;
  documentType?: string;
  documentNumber?: string;
  coutnry?: string;
  emailAddress?: string;
  phoneNumber?: string;
}

export type CustomWatchlistStepDataSearchResult = Record<string, string>;

export interface CustomWatchlistStepData {
  watchlist: CustomWatchlistStepDataWatchlist;
  searchedAt: Date;
  searchParams: CustomWatchlistStepDataSearchParams | null;
  searchResult: CustomWatchlistStepDataSearchResult | null;
}

export type CustomWatchlistStep = IStep<CustomWatchlistStepData[]>;

interface StepExtra {
  checkStatus?: StepStatus;
}

export interface CustomWatchlistStepDataExtended extends CustomWatchlistStepData, StepExtra {}

export type CustomWatchlistStepExtended = IStep<CustomWatchlistStepDataExtended[]>;

export interface ValidatedInputsFieldValuesOptions {
  fuzziness?: number;
}

export const placeholderKey = 'notSelected';

export type ValidatedInputsFieldTypesValue = ValidatedInputsKeys | typeof placeholderKey;

export interface IValidatedInputsFieldTypes {
  label: string;
  value: ValidatedInputsKeys;
  options?: ValidatedInputsFieldValuesOptions;
}

export interface ValidatedInputsFieldTypesExtended extends Pick<IValidatedInputsFieldTypes, 'label' | 'options'> {
  value: ValidatedInputsFieldTypesValue;
}

export function getCustomWatchlistStepExtra(step: CustomWatchlistStep): CustomWatchlistStepExtended {
  if (!step) {
    return step;
  }

  return {
    ...step,
    checkStatus: getStepStatus(step),
  };
}

export function getCustomWatchlistMapping(headers?: string[], mapping?: WatchlistMapping[]): ValidatedInputsFieldTypesExtended[] {
  if (headers) {
    return headers.map((header) => ({ label: header, value: placeholderKey }));
  }

  if (mapping) {
    return mapping.map((fields) => ({ label: fields.merchantField, value: fields.systemField, ...(fields?.options && { options: fields.options }) }));
  }

  return [];
}

// TODO: remove
const mock = [
  {
    code: 500,
    type: 'watchlistContentParse.invalidFormat',
    data: {
      fieldName: 'documentNumber',
      row: 1,
    },
    retryable: false,
  },
  {
    code: 500,
    type: 'watchlistContentParse.invalidFormat',
    data: {
      fieldName: 'documentNumber',
      row: 2,
    },
    retryable: false,
  },
  {
    code: 500,
    type: 'watchlistContentParse.invalidFormat',
    data: {
      fieldName: 'documentNumber',
      row: 3,
    },
    retryable: false,
  },
  {
    code: 500,
    type: 'watchlistContentParse.invalidFormat',
    data: {
      fieldName: 'dateOfBirth',
      row: 3,
    },
    retryable: false,
  },
  {
    code: 500,
    type: 'watchlistContentParse.invalidFormat',
    data: {
      fieldName: 'fullName',
      row: 3,
    },
    retryable: false,
  },
];

export function getCustomWatchlistErrorsFormated(errors?: CustomWatchlistValidationError[]): Partial<Record<ValidatedInputsKeys, ICustomWatchlistValidationErrorFormated[]>> | null {
  if (!errors) {
    return null;
  }

  return errors.reduce((memo, cur) => {
    const fieldName = cur.data.fieldName;

    memo[fieldName] = errors.filter((item) => item.data.fieldName === fieldName);

    memo[fieldName] = memo[fieldName].map((item) => ({
      systemField: item.data.fieldName,
      // TODO: @richvoronov need to split by type too, do it after release custom watchlist 4
      type: item.type,
      row: item.data.row,
    }));
    return memo;
  }, {});
}
