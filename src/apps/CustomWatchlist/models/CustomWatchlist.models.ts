import { CustomWatchlistSeverityOnMatchTypes } from 'models/CustomWatchlist.model';
import { ErrorType } from 'models/Error.model';

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
  systemField: string;
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
  error: ErrorType | null;
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
  NationalId = 'nationalId',
  DrivingLicense = 'drivingLicense',
  PassportNumber = 'passportNumber',
  CountryCode = 'countryCode',
}

export enum CustomWatchlistModalValidationInputs {
  Name = 'name',
  FileKey = 'fileKey',
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