import { createSelector } from 'reselect';
import { WatchlistValidatedInputsErrors } from 'apps/ui';
import { IWatchlistValidationError, IWatchlistProcessPartial, getWatchlistErrorsFormated, IWatchlist, WatchlistProcessStatusTypes, IWatchlistMapping, IWatchlistGroup, IWatchlistContent } from 'models/Watchlist.model';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { MerchantTags } from 'models/Merchant.model';
import { Loadable } from 'models/Loadable.model';
import { AmlStore, AML_STORE_KEY } from './Aml.store';

export const selectAmlStore = (state): AmlStore => state[AML_STORE_KEY];

export const selectWatchlistsModel = createSelector<any, AmlStore, Loadable<IWatchlist[]>>(
  selectAmlStore,
  (store) => store.watchlists,
);

export const selectWatchlists = createSelector<any, AmlStore, IWatchlist[]>(
  selectAmlStore,
  (store) => store.watchlists.value,
);

export const selectWatchlistsGroupsModel = createSelector<any, AmlStore, Loadable<IWatchlistGroup[]>>(
  selectAmlStore,
  (store) => store.watchlistsGroups,
);

export const selectWatchlistsGroups = createSelector<any, AmlStore, IWatchlistGroup[]>(
  selectAmlStore,
  (store) => store.watchlistsGroups.value,
);

export const selectIsWatchlistsContentModel = createSelector<any, AmlStore, Loadable<IWatchlistContent>>(
  selectAmlStore,
  (store) => store.watchlistContent,
);

export const selectWatchlistsContentErrorType = createSelector<any, AmlStore, string>(
  selectAmlStore,
  (store) => store.watchlistContent.error,
);

export const selectCurrentBasicWatchlist = createSelector<any, AmlStore, Nullable<IWatchlist>>(
  selectAmlStore,
  (store) => store.currentWatchlist.value,
);

export const selectCurrentBasicWatchlistModel = createSelector<any, AmlStore, Loadable<Nullable<IWatchlist>>>(
  selectAmlStore,
  (store) => store.currentWatchlist,
);

export const selectCurrentBasicWatchlistId = createSelector<any, Nullable<IWatchlist>, number>(
  selectCurrentBasicWatchlist,
  (currentWatchlist) => currentWatchlist?.id ?? null,
);

export const selectCurrentBasicWatchlistProcess = createSelector<any, Nullable<IWatchlist>, IWatchlistProcessPartial>(
  selectCurrentBasicWatchlist,
  (currentWatchlist) => currentWatchlist?.process,
);

export const selectCurrentBasicWatchlistStatus = createSelector<any, IWatchlistProcessPartial, Nullable<WatchlistProcessStatusTypes>>(
  selectCurrentBasicWatchlistProcess,
  (currentWatchlistProcess) => currentWatchlistProcess?.status ?? null,
);

export const selectCurrentBasicWatchlistError = createSelector<any, IWatchlistProcessPartial, Nullable<IWatchlistValidationError[]>>(
  selectCurrentBasicWatchlistProcess,
  (currentWatchlistProcess) => currentWatchlistProcess?.error,
);

export const selectCurrentBasicWatchlistFileInfo = createSelector<any, IWatchlistProcessPartial, Partial<{ fileKey: string; fileName: string }>>(
  selectCurrentBasicWatchlistProcess,
  (currentWatchlistProcess) => ({
    fileKey: currentWatchlistProcess?.inputSourceFileKey,
    fileName: currentWatchlistProcess?.inputSourceFileName,
  }),
);

export const selectCurrentBasicWatchlistMapping = createSelector<any, Nullable<IWatchlist>, Nullable<IWatchlistMapping[]>>(
  selectCurrentBasicWatchlist,
  (currentWatchlist) => currentWatchlist?.mapping,
);

export const selectCurrentBasicWatchlistErrorsFormated = createSelector<any, Nullable<IWatchlistValidationError[]>, Nullable<WatchlistValidatedInputsErrors>>(
  selectCurrentBasicWatchlistError,
  (errors) => getWatchlistErrorsFormated(errors),
);

export const selectCurrentBasicWatchlistHeaders = createSelector<any, AmlStore, Nullable<string[]>>(
  selectAmlStore,
  (store) => store.currentWatchlistHeaders.value,
);

export const selectCurrentBasicWatchlistHeadersModel = createSelector<any, AmlStore, Loadable<string[]>>(
  selectAmlStore,
  (store) => store.currentWatchlistHeaders,
);

export const selectCurrentBasicWatchlistIsFileAvailable = createSelector<any, Nullable<IWatchlist>, boolean>(
  selectCurrentBasicWatchlist,
  (store) => store?.isFileAvailable ?? true,
);

export const selectCurrentBasicWatchlistFileError = createSelector<any, AmlStore, string>(
  selectAmlStore,
  (store) => store.fileErrorType,
);

export const selectCanUseBasicWatchlists = createSelector<any, MerchantTags[], boolean>(
  selectMerchantTags,
  (tags) => tags.includes(MerchantTags.CanUseBasicWatchlists),
);

export const selectCanManageBasicWatchlists = createSelector<any, MerchantTags[], boolean>(
  selectMerchantTags,
  (tags) => tags.includes(MerchantTags.CanManageBasicWatchlists),
);

export const selectCanUsePremiumWatchlistsSearch = createSelector<any, MerchantTags[], boolean>(
  selectMerchantTags,
  (tags) => tags.includes(MerchantTags.CanUsePremiumAmlWatchlistsSearch),
);

export const selectCanUsePremiumWatchlistsSearchAndMonitoring = createSelector<any, MerchantTags[], boolean>(
  selectMerchantTags,
  (tags) => tags.includes(MerchantTags.CanUsePremiumAmlWatchlistsSearchAndMonitoring),
);
