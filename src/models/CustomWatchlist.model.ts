export interface AllowedRegions {
  country: string;
  regions: string[];
}

export enum CustomWatchlistActions {
  NoAction = 'no-action',
  Rejected = 'rejected',
  NotifyByWebhook = 'notifyByWebhook',
  ReviewNeeded = 'reviewNeeded',
}

export interface WatchlistMappingOptions {
  fuzziness?: number;
}

export interface WatchlistMapping {
  systemField: string;
  merchantField: string;
  options?: WatchlistMappingOptions;
}

export interface FlowWatchlist {
  watchlistId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  merchantId: string;
  mapping: WatchlistMapping | null;
  severityOnMatch: CustomWatchlistActions;
}

export interface Watchlist {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  merchantId: string;
  mapping: WatchlistMapping | null;
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

export interface CustomWatchlistModalSubmitType {
  name: string;
  mapping: WatchlistMapping[];
}

export interface CustomWatchlistsFlowUpdate {
  watchlistId: number;
  severityOnMatch: CustomWatchlistActions;
}

export const getAllAllowedRegions = (countries) => (
  countries.map((country) => ({
    country: country.id,
    regions: country.regions,
  }))
);

export const getProcessedWatchlistsToFlowUpdate = (watchlists: FlowWatchlist[]): CustomWatchlistsFlowUpdate[] => watchlists.map((watchlist) => ({
  watchlistId: watchlist.watchlistId,
  severityOnMatch: watchlist.severityOnMatch,
}));
