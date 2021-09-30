import { replaceObjKeyByName } from 'lib/object';
import { selectFlowBuilderChangeableFlowModel } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { get } from 'lodash';

export interface AllowedRegions {
  country: string;
  regions: string[];
}

export enum CustomWatchlistSeverityOnMatch {
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
  watchlistId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  merchantId: string;
  mapping: WatchlistMapping | null;
  severityOnMatch: CustomWatchlistSeverityOnMatch;
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
  severityOnMatch: CustomWatchlistSeverityOnMatch;
}

export const getAllAllowedRegions = (countries) => (
  countries.map((country) => ({
    country: country.id,
    regions: country.regions,
  }))
);

export const getProcessedWatchlistsToFlowUpdate = (watchlists: FlowWatchlist[]): CustomWatchlistsFlowUpdate[] => watchlists
  .filter(({ severityOnMatch }) => severityOnMatch !== CustomWatchlistSeverityOnMatch.NoAction)
  .map((watchlist) => ({
    watchlistId: watchlist.watchlistId,
    severityOnMatch: watchlist.severityOnMatch,
  }));

export const getFlowWatchlists = (watchlists: Watchlist[], getState, flowWatchlists?: FlowWatchlist[]) => {
  const flowWatchlistsValue: FlowWatchlist[] = flowWatchlists || get(selectFlowBuilderChangeableFlowModel(getState()), 'value.watchlists', []);
  return watchlists.map((watchlist) => {
    const findedWatchlist = flowWatchlistsValue.find((flowWatchlist) => flowWatchlist.watchlistId === watchlist.id);
    return {
      ...replaceObjKeyByName(watchlist, 'id', 'watchlistId'),
      ...findedWatchlist,
      severityOnMatch: findedWatchlist?.severityOnMatch ?? CustomWatchlistSeverityOnMatch.NoAction,
    };
  });
};
