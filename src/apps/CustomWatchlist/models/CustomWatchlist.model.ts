export enum CustomWatchlistSettingsTypes {
  str = 'str',
}

export enum CustomWatchlistCheckTypes {
  CustomDatabases = 'customDatabases',
}

export enum CustomWatchlistErrorCodes {}

export interface AllowedRegions {
  country: string;
  regions: string[];
}

export enum CustomWatchlistValidationTypes {
}

export const getAllAllowedRegions = (countries) => (
  countries.map((country) => ({
    country: country.id,
    regions: country.regions,
  }))
);
