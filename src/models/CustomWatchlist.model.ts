import { selectFlowBuilderChangeableFlowModel } from 'apps/flowBuilder/store/FlowBuilder.selectors';

export interface AllowedRegions {
  country: string;
  regions: string[];
}

export enum CustomWatchlistSeverityOnMatchTypes {
  NoAction = 'no-action',
  Low = 'low',
  Medium = 'medium',
  Critical = 'critical',
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

export enum CustomWatchlistModalValidationInputEnum {
  Name = 'name',
  File = 'file',
  Mapping = 'mapping',
}

export interface CustomWatchlistsFlowUpdate {
  id: number;
  severityOnMatch: CustomWatchlistSeverityOnMatchTypes;
}

export const getAllAllowedRegions = (countries) => (
  countries.map((country) => ({
    country: country.id,
    regions: country.regions,
  }))
);
