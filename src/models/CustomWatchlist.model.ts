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

export interface Watchlist {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  mapping: any | null;
  deleted: boolean;
}

export interface FlowWatchlist {
  id: string;
  action: CustomWatchlistActions;
}

export enum CustomWatchlistSettingsTypes {
  Watchlists = 'watchlists',
}

export enum CustomWatchlistCheckTypes {
  CustomDatabases = 'customDatabases',
}

export enum ValidatedInputsKeys {
  Name = 'name',
  DateOfBirth = 'dateOfBirth',
  NationalId = 'nationalId',
  DrivingLicense = 'drivingLicense',
  PassportNumber = 'passportNumber',
  CountryCode = 'countryCode',
}

export const getAllAllowedRegions = (countries) => (
  countries.map((country) => ({
    country: country.id,
    regions: country.regions,
  }))
);
