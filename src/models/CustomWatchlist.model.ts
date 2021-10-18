export enum CustomWatchlistSeverityOnMatchTypes {
  NoAction = 'no-action',
  Low = 'low',
  Medium = 'medium',
  Critical = 'critical',
}

export enum CsvDelimiterInputTypes {
  Semicolon = 'semicolon',
  Comma = 'comma',
  Dot = 'dot',
  Tab = 'tab',
  Pipe = 'pipe',
}

export const CsvDelimiterTypes = {
  [CsvDelimiterInputTypes.Semicolon]: ';',
  [CsvDelimiterInputTypes.Comma]: ',',
  [CsvDelimiterInputTypes.Dot]: '.',
  [CsvDelimiterInputTypes.Tab]: '\t',
  [CsvDelimiterInputTypes.Pipe]: '|',
};

export interface WatchlistMappingOptions {
  fuzziness?: number;
}

export interface WatchlistMapping {
  systemField: string;
  merchantField: string;
  options?: WatchlistMappingOptions;
}

export interface FlowWatchlist {
  id: number;
  severityOnMatch: CustomWatchlistSeverityOnMatchTypes;
}

export interface FlowWatchlistUi {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  merchantId: string;
  mapping: WatchlistMapping | null;
  severityOnMatch: CustomWatchlistSeverityOnMatchTypes;
}

export interface Watchlist {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  merchantId: string;
  mapping: WatchlistMapping | null;
}

export interface CustomWatchlistUpload {
  publicUrl: string;
  url: string;
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
  File = 'file',
  Mapping = 'mapping',
  CsvDelimiter = 'csvDelimiter',
}

export enum CustomWatchlistFileExt {
  Csv = 'csv',
  Xls = 'xls',
}

export interface WatchlistContentTypes {
  url: string;
  fileName: string;
  csvSeparator: string;
}
