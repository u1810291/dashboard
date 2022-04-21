import { CustomWatchlistSeverityOnMatchTypes } from 'models/CustomWatchlist.model';
import { IStepExtra } from 'models/Step.model';
import { IWatchlistMapping, IWatchlist } from 'models/Watchlist.model';

export const customWatchlistsPollingDelay = 5000;
export const VALIDATION_ERROR_TYPE_MAX_COUNT = 'watchlists.maxRowCountReached';

export interface FlowWatchlistUi extends IWatchlist {
  severityOnMatch: CustomWatchlistSeverityOnMatchTypes;
}

export enum CustomWatchlistSettingsTypes {
  CustomWatchlists = 'customWatchlists',
}

export enum CustomWatchlistCheckTypes {
  CustomDatabases = 'customDatabases',
}

export enum CustomWatchlistModalValidationInputs {
  Name = 'name',
  FileKey = 'inputSourceFileKey',
  Mapping = 'mapping',
  CsvSeparator = 'csvSeparator',
  FileName = 'inputSourceFileName'
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
  country?: string;
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

export type CustomWatchlistStepType = IStepExtra<CustomWatchlistStepData[]>;

export interface CustomWatchlistModalValidationInputTypes {
  [CustomWatchlistModalValidationInputs.Name]: string;
  [CustomWatchlistModalValidationInputs.FileKey]: string | null;
  [CustomWatchlistModalValidationInputs.Mapping]: IWatchlistMapping[];
  [CustomWatchlistModalValidationInputs.CsvSeparator]: string | null;
  [CustomWatchlistModalValidationInputs.FileName]: string;
}
