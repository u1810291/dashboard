import { createSelector } from 'reselect';
import { WatchlistValidatedInputsErrors } from 'apps/ui';
import { IWatchlistValidationError, IWatchlistProcessPartial, getWatchlistErrorsFormated, IWatchlist, WatchlistProcessStatusTypes, IWatchlistMapping, IWatchlistGroup, IWatchlistContent } from 'models/Watchlist.model';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { MerchantTags } from 'models/Merchant.model';
import { Loadable } from 'models/Loadable.model';
import { AmlStore, AML_STORE_KEY } from './Aml.store';

export const selectAmlStore = (state: {AML_STORE_KEY: AmlStore}): AmlStore => state[AML_STORE_KEY];

export const selectWatchlistsModel = createSelector<[typeof selectAmlStore], Loadable<IWatchlist[]>>(
  selectAmlStore,
  (store) => store.watchlists,
);

export const selectWatchlists = createSelector<[typeof selectAmlStore], IWatchlist[]>(
  selectAmlStore,
  (store) => store.watchlists.value,
);

export const selectWatchlistsGroupsModel = createSelector<[typeof selectAmlStore], Loadable<IWatchlistGroup[]>>(
  selectAmlStore,
  (store) => store.watchlistsGroups,
);

export const selectWatchlistsGroups = createSelector<[typeof selectAmlStore], IWatchlistGroup[]>(
  selectAmlStore,
  (store) => store.watchlistsGroups.value,
);

export const selectIsWatchlistsContentModel = createSelector<[typeof selectAmlStore], Loadable<IWatchlistContent>>(
  selectAmlStore,
  (store) => store.watchlistContent,
);

export const selectWatchlistsContentErrorType = createSelector<[typeof selectAmlStore], string>(
  selectAmlStore,
  (store) => store.watchlistContent.error,
);

export const selectCurrentBasicWatchlist = createSelector<[typeof selectAmlStore], Nullable<IWatchlist>>(
  selectAmlStore,
  (store) => store.currentWatchlist.value,
);

export const selectCurrentBasicWatchlistModel = createSelector<[typeof selectAmlStore], Loadable<Nullable<IWatchlist>>>(
  selectAmlStore,
  (store) => store.currentWatchlist,
);

export const selectCurrentBasicWatchlistId = createSelector<[typeof selectCurrentBasicWatchlist], number>(
  selectCurrentBasicWatchlist,
  (currentWatchlist) => currentWatchlist?.id ?? null,
);

export const selectCurrentBasicWatchlistProcess = createSelector<[typeof selectCurrentBasicWatchlist], IWatchlistProcessPartial>(
  selectCurrentBasicWatchlist,
  (currentWatchlist) => currentWatchlist?.process,
);

export const selectCurrentBasicWatchlistStatus = createSelector<[typeof selectCurrentBasicWatchlistProcess], Nullable<WatchlistProcessStatusTypes>>(
  selectCurrentBasicWatchlistProcess,
  (currentWatchlistProcess) => currentWatchlistProcess?.status ?? null,
);

export const selectCurrentBasicWatchlistError = createSelector<[typeof selectCurrentBasicWatchlistProcess], Nullable<IWatchlistValidationError[]>>(
  selectCurrentBasicWatchlistProcess,
  (currentWatchlistProcess) => currentWatchlistProcess?.error,
);

export const selectCurrentBasicWatchlistFileInfo = createSelector<[typeof selectCurrentBasicWatchlistProcess], Partial<{ fileKey: string; fileName: string }>>(
  selectCurrentBasicWatchlistProcess,
  (currentWatchlistProcess) => ({
    fileKey: currentWatchlistProcess?.inputSourceFileKey,
    fileName: currentWatchlistProcess?.inputSourceFileName,
  }),
);

export const selectCurrentBasicWatchlistMapping = createSelector<[typeof selectCurrentBasicWatchlist], Nullable<IWatchlistMapping[]>>(
  selectCurrentBasicWatchlist,
  (currentWatchlist) => currentWatchlist?.mapping,
);

export const selectCurrentBasicWatchlistErrorsFormated = createSelector<[typeof selectCurrentBasicWatchlistError], Nullable<WatchlistValidatedInputsErrors>>(
  selectCurrentBasicWatchlistError,
  (errors) => getWatchlistErrorsFormated(errors),
);

export const selectCurrentBasicWatchlistHeaders = createSelector<[typeof selectAmlStore], Nullable<string[]>>(
  selectAmlStore,
  (store) => store.currentWatchlistHeaders.value,
);

export const selectCurrentBasicWatchlistHeadersModel = createSelector<[typeof selectAmlStore], Loadable<string[]>>(
  selectAmlStore,
  (store) => store.currentWatchlistHeaders,
);

export const selectCurrentBasicWatchlistIsFileAvailable = createSelector<[typeof selectCurrentBasicWatchlist], boolean>(
  selectCurrentBasicWatchlist,
  (store) => store?.isFileAvailable ?? true,
);

export const selectCurrentBasicWatchlistFileError = createSelector<[typeof selectAmlStore], string>(
  selectAmlStore,
  (store) => store.fileErrorType,
);

export const selectCanUseBasicWatchlists = createSelector<[typeof selectMerchantTags], boolean>(
  selectMerchantTags,
  (tags) => tags.includes(MerchantTags.CanUseBasicWatchlists),
);

export const selectCanManageBasicWatchlists = createSelector<[typeof selectMerchantTags], boolean>(
  selectMerchantTags,
  (tags) => tags.includes(MerchantTags.CanManageBasicWatchlists),
);

export const selectCanUsePremiumWatchlistsSearch = createSelector<[typeof selectMerchantTags], boolean>(
  selectMerchantTags,
  (tags) => tags.includes(MerchantTags.CanUsePremiumAmlWatchlistsSearch),
);

export const selectCanUsePremiumWatchlistsSearchAndMonitoring = createSelector<[typeof selectMerchantTags], boolean>(
  selectMerchantTags,
  (tags) => tags.includes(MerchantTags.CanUsePremiumAmlWatchlistsSearchAndMonitoring),
);
