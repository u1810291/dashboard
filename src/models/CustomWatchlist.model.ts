export interface AllowedRegions {
  country: string;
  regions: string[];
}

export interface IpValidation {
  allowedRegions: AllowedRegions[];
}

export interface CustomWatchlistStepData {
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
  safe: boolean;
  mapUrl: string;
}

export enum CustomWatchlistActions {
  AutoReject = 'auto-reject',
  Manual = 'manual',
  NotifyWebhook = 'notify-webhook',
}

export interface Watchlist {
  id: number;
  name: string;
  // eslint-disable-next-line camelcase
  merchant_id: string;
  'createdAt': string;
  'updatedAt': string;
}

export enum CustomWatchlistSettingsTypes {
  // TODO: mock
  str = 'str',
}

export enum CustomWatchlistCheckTypes {
  CustomDatabases = 'customDatabases',
}

export const getAllAllowedRegions = (countries) => (
  countries.map((country) => ({
    country: country.id,
    regions: country.regions,
  }))
);
