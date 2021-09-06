export interface AllowedRegions {
  country: string;
  regions: string[];
}

export enum CustomWatchlistActions {
  AutoReject = 'auto-reject',
  Manual = 'manual',
  NotifyWebhook = 'notify-webhook',
}

export interface Watchlist {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  mapping: any | null;
  deleted: boolean;
}

export enum CustomWatchlistSettingsTypes {
  // TODO: mock
  str = 'str',
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
