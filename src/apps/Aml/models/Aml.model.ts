import { BasicWatchlistIdType } from 'models/Aml.model';
import { IdentityStatuses } from 'models/Status.model';
import { IStepExtra } from 'models/Step.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { IWatchlist, IWatchlistGroup, IWatchlistMapping } from 'models/Watchlist.model';

export const basicWatchlistsPollingDelay = 5000;
export const DEFAULT_WATCHLIST_GROUP_NAME = 'Other';

export enum BasicWatchlistModalValidationInputTypes {
  Name = 'name',
  FileKey = 'inputSourceFileKey',
  Mapping = 'mapping',
  CsvSeparator = 'csvSeparator',
  FileName = 'inputSourceFileName',
  Group = 'groupId'
}

export interface IBasicWatchlistModalValidationInputs {
  [BasicWatchlistModalValidationInputTypes.Name]: string;
  [BasicWatchlistModalValidationInputTypes.FileKey]: string | null;
  [BasicWatchlistModalValidationInputTypes.Mapping]: IWatchlistMapping[];
  [BasicWatchlistModalValidationInputTypes.CsvSeparator]: string | null;
  [BasicWatchlistModalValidationInputTypes.FileName]: string;
  [BasicWatchlistModalValidationInputTypes.Group]: number;
}

export interface IBasicWatchlistItemUI extends IWatchlist {
  checked: boolean;
}

export interface IAmlBasicWatchlistGroupUI extends IWatchlistGroup {
  watchlists: IBasicWatchlistItemUI[];
}

export enum AmlSettingsTypes {
  Search = 'search',
  Monitoring = 'monitoring',
  AmlThreshold = 'amlThreshold',
  BasicWatchlists = 'basicWatchlists',
}

export enum AmlCheckTypes {
  Watchlist = 'watchlist',
  Search = 'search',
  Monitoring = 'monitoring'
}

export const MatchTypes = {
  exact: 'exact',
  noMatch: 'noMatch',
  partial: 'partial',
};

const MatchTypesMap = {
  name_exact: MatchTypes.exact,
  aka_exact: MatchTypes.exact,
  no_match: MatchTypes.noMatch,
};

export enum AmlValidationTypes {
  None = 'none',
  Search = 'search',
  SearchMonitoring = 'search+monitoring',
}

export enum AmlDocumentStepTypes {
  Watchlists = 'watchlists',
}

export const AmlDocumentSteps = [
  AmlDocumentStepTypes.Watchlists,
  VerificationPatternTypes.PremiumAmlWatchListsSearchValidation,
];

export interface IBasicWatchlistGroupCreateUpdate {
  name: string;
}

export interface IBasicWatchlistGroupCreated {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
}

export interface IBasicWatchlistGroupsOption {
  label: string;
  value: number;
}

export interface IBasicWatchlistStepDataWatchlist {
  id: string;
  name: string;
}

export interface IBasicWatchlistStepDataSearchParams {
  fullName?: string;
  dateOfBirth?: string;
  documentType?: string;
  documentNumber?: string;
  country?: string;
  emailAddress?: string;
  phoneNumber?: string;
}

export type BasicWatchlistStepDataSearchResultType = Record<string, string>;

export interface IBasicWatchlistStepData {
  watchlist: IBasicWatchlistStepDataWatchlist;
  searchedAt: string;
  searchParams: IBasicWatchlistStepDataSearchParams | null;
  searchResult: BasicWatchlistStepDataSearchResultType | null;
}

export type BasicWatchlistStepType = IStepExtra<IBasicWatchlistStepData[]>;

export enum BasicWatchlistVerificationStepNamesTypes {
  nameSearched = 'Full Name',
  dateOfBirth = 'Date of Birth',
}

export function getPremiumAmlWatchlistsCheckExtraData(step, document, identity) {
  if (!step?.data) {
    return step;
  }

  const matchStatus = step?.error?.details?.matchStatus;
  const isMonitoringDisabledByApi = step.data.isMonitoringAvailable && !step.data.monitored && IdentityStatuses.verified === identity.status;

  return {
    ...step,
    data: {
      ...step.data,
      dateOfBirth: document?.fields?.dateOfBirth?.value,
      matchType: matchStatus ? MatchTypesMap[matchStatus] || MatchTypes.partial : MatchTypes.noMatch,
      identityStatus: identity.status,
      isMonitored: step.data.isMonitoringAvailable && !(isMonitoringDisabledByApi),
    },
  };
}

export function getBasicWatchlistsUI(watchlists: IWatchlist[], groups: IWatchlistGroup[], watchlistIds: BasicWatchlistIdType[]): IAmlBasicWatchlistGroupUI[] {
  let uniqueGroupId = 0;
  const watchlistGroups: IAmlBasicWatchlistGroupUI[] = [];

  const groupsUi = groups.map((group) => {
    const watchlistsUi = watchlists.map((watchlist) => {
      const hasWatchlists = group.id === watchlist.groupId;
      return hasWatchlists && ({
        ...watchlist,
        checked: watchlistIds.includes(watchlist.id),
      });
    }).filter(Boolean) ?? [];

    uniqueGroupId += group.id;
    return ({ ...group, watchlists: watchlistsUi });
  });

  const otherGroups = {
    id: uniqueGroupId,
    name: DEFAULT_WATCHLIST_GROUP_NAME,
    watchlists: watchlists
      .filter((watchlist) => !watchlist.groupId)
      .map((watchlist) => ({ ...watchlist, checked: watchlistIds.includes(watchlist.id) })),
  };

  watchlistGroups.push(...groupsUi);

  if (otherGroups.watchlists.length !== 0) {
    watchlistGroups.push(otherGroups);
  }

  return watchlistGroups;
}
