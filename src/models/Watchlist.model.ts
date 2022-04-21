import { IValidatedInputsFieldTypes, ValidatedInputsKeys, WatchlistValidatedInputsErrors } from 'apps/ui';
import { ErrorStatuses } from './Error.model';

export type WatchlistIdType = number;

export interface IWatchlistGroup {
  id: number;
  name: string;
}

export interface IWatchlistMappingOptions {
  fuzziness?: number;
}

export interface IWatchlistMapping {
  systemField: ValidatedInputsKeys;
  merchantField: string;
  options?: IWatchlistMappingOptions;
}

export interface IWatchlistValidationError {
  code: ErrorStatuses;
  type: string;
  data: IWatchlistValidationErrorData;
  message?: string;
  name?: string;
  stack?: string;
}

export interface IWatchlistValidationErrorData {
  fieldName: ValidatedInputsKeys;
  row: number;
}

export enum IWatchlistProcessNameType {
  ContentParse = 'contentParse',
}

export interface IWatchlistProcess {
  completedAt: string | null;
  createdAt: string | null;
  error: IWatchlistValidationError[] | null;
  id: number;
  inputSourceFileName: string;
  inputSourceFileKey: string;
  name: IWatchlistProcessNameType;
  startCount: number;
  status: WatchlistProcessStatusTypes;
  startedAt: string | null;
  updatedAt: string | null;
  watchlistId: WatchlistIdType;
  csvSeparator: string;
}

export type IWatchlistProcessPartial = Partial<IWatchlistProcess> | null;

export enum WatchlistProcessStatusTypes {
  Pending = 'pending',
  Running = 'running',
  Completed = 'completed',
}

export enum WatchlistTypes {
  Custom = 'custom',
  Basic = 'basic',
}

export interface IWatchlistContent {
  inputSourceFileKey: string;
  inputSourceFileName: string;
  csvSeparator: string;
}

export type IWatchlistHeaders = Pick<IWatchlistContent, 'inputSourceFileKey' | 'csvSeparator'>

export interface IWatchlistShortValidation extends Pick<IWatchlistContent, 'inputSourceFileKey' | 'csvSeparator'>, Pick<IWatchlist, 'mapping'> {}

export interface IWatchlistCreateBody {
  name: string;
  mapping: IWatchlistMapping[];
  watchlistType: WatchlistTypes;
  groupId?: number | null;
}

export interface IWatchlistValidation {
  valid: boolean;
  errors?: IWatchlistValidationError[];
}

export interface IWatchlistUpload {
  key: string;
}

export interface IWatchlist {
  id: WatchlistIdType;
  name: string;
  createdAt: string;
  updatedAt: string;
  merchantId: string;
  mapping: IWatchlistMapping[] | null;
  process: IWatchlistProcessPartial;
  isFileAvailable: boolean;
  groupId: number | null;
  group: IWatchlistGroup | null;
}

export function getWatchlistMapping(headers?: string[], mapping?: IWatchlistMapping[]): IValidatedInputsFieldTypes[] {
  if (headers) {
    return headers.map((header) => {
      const mappingFinded = mapping?.find((map) => map.merchantField === header);
      return {
        label: header,
        value: mappingFinded?.systemField ?? ValidatedInputsKeys.NotSelected,
      };
    });
  }

  if (mapping) {
    return mapping.map((fields) => ({ label: fields.merchantField, value: fields.systemField, ...(fields?.options && { options: fields.options }) }));
  }

  return [];
}

export function getWatchlistValidMapping(inputFields: IValidatedInputsFieldTypes[]): IWatchlistMapping[] {
  return inputFields.map((fields) => ({ merchantField: fields.label, systemField: fields.value, ...(fields?.options && { options: fields.options }) }));
}

export function getWatchlistErrorsFormated(errors?: IWatchlistValidationError[]): WatchlistValidatedInputsErrors | null {
  if (!errors) {
    return null;
  }

  return errors.reduce((memo, cur) => {
    const fieldName = cur.data.fieldName;

    memo[fieldName] = errors.filter((item) => item.data.fieldName === fieldName);

    memo[fieldName] = memo[fieldName].map((item) => ({
      systemField: item.data.fieldName,
      type: item.type,
      row: item.data.row,
    }));
    return memo;
  }, {});
}
