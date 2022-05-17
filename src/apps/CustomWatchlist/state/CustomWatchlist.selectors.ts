import { createSelector } from 'reselect';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { MerchantTags } from 'models/Merchant.model';
import { ValidatedInputsKeys, IValidationErrorFormated } from 'apps/ui';
import { IWatchlistValidationError, IWatchlistProcessPartial, IWatchlist, WatchlistProcessStatusTypes, IWatchlistMapping, getWatchlistErrorsFormated } from 'models/Watchlist.model';
import { CustomWatchlistsStore, CUSTOM_WATCHLISTS_STORE_KEY } from './CustomWatchlist.store';

export const selectCustomWatchlistsStore = (state: {CUSTOM_WATCHLISTS_STORE_KEY: CustomWatchlistsStore}): CustomWatchlistsStore => state[CUSTOM_WATCHLISTS_STORE_KEY];

export const selectWatchlists = createSelector<[typeof selectCustomWatchlistsStore], IWatchlist[]>(
  selectCustomWatchlistsStore,
  (store) => store.watchlists.value,
);

export const selectIsWatchlistsLoaded = createSelector<[typeof selectCustomWatchlistsStore], boolean>(
  selectCustomWatchlistsStore,
  (store) => store.watchlists.isLoaded,
);

export const selectIsWatchlistsFailed = createSelector<[typeof selectCustomWatchlistsStore], boolean>(
  selectCustomWatchlistsStore,
  (store) => store.watchlists.isFailed,
);

export const selectIsWatchlistsLoading = createSelector<[typeof selectCustomWatchlistsStore], boolean>(
  selectCustomWatchlistsStore,
  (store) => store.watchlists.isLoading,
);

export const selectIsWatchlistsContentLoading = createSelector<[typeof selectCustomWatchlistsStore], boolean>(
  selectCustomWatchlistsStore,
  (store) => store.watchlistContent.isLoading,
);

export const selectWatchlistsContentErrorType = createSelector<[typeof selectCustomWatchlistsStore], string>(
  selectCustomWatchlistsStore,
  (store) => store.watchlistContent.error,
);

export const selectCanUseCustomWatchlists = createSelector<[typeof selectMerchantTags], boolean>(
  selectMerchantTags,
  (tags) => tags.includes(MerchantTags.CanUseCustomWatchlists),
);

export const selectCurrentCustomWatchlist = createSelector<[typeof selectCustomWatchlistsStore], Nullable<IWatchlist>>(
  selectCustomWatchlistsStore,
  (store) => store.currentWatchlist.value,
);

export const selectCurrentCustomWatchlistIsLoading = createSelector<[typeof selectCustomWatchlistsStore], boolean>(
  selectCustomWatchlistsStore,
  (store) => store.currentWatchlist.isLoading,
);

export const selectCurrentCustomWatchlistIsLoaded = createSelector<[typeof selectCustomWatchlistsStore], boolean>(
  selectCustomWatchlistsStore,
  (store) => store.currentWatchlist.isLoaded,
);

export const selectCurrentCustomWatchlistId = createSelector<[typeof selectCurrentCustomWatchlist], number>(
  selectCurrentCustomWatchlist,
  (currentWatchlist) => currentWatchlist?.id ?? null,
);

export const selectCurrentCustomWatchlistProcess = createSelector<[typeof selectCurrentCustomWatchlist], IWatchlistProcessPartial>(
  selectCurrentCustomWatchlist,
  (currentWatchlist) => currentWatchlist?.process,
);

export const selectCurrentCustomWatchlistStatus = createSelector<[typeof selectCurrentCustomWatchlistProcess], Nullable<WatchlistProcessStatusTypes>>(
  selectCurrentCustomWatchlistProcess,
  (currentWatchlistProcess) => currentWatchlistProcess?.status ?? null,
);

export const selectCurrentCustomWatchlistError = createSelector<[typeof selectCurrentCustomWatchlistProcess], Nullable<IWatchlistValidationError[]>>(
  selectCurrentCustomWatchlistProcess,
  (currentWatchlistProcess) => currentWatchlistProcess?.error,
);

export const selectCurrentCustomWatchlistFileInfo = createSelector<[typeof selectCurrentCustomWatchlistProcess], Partial<{ fileKey: string; fileName: string }>>(
  selectCurrentCustomWatchlistProcess,
  (currentWatchlistProcess) => ({
    fileKey: currentWatchlistProcess?.inputSourceFileKey,
    fileName: currentWatchlistProcess?.inputSourceFileName,
  }),
);

export const selectCurrentCustomWatchlistMapping = createSelector<[typeof selectCurrentCustomWatchlist], Nullable<IWatchlistMapping[]>>(
  selectCurrentCustomWatchlist,
  (currentWatchlist) => currentWatchlist?.mapping,
);

export const selectCurrentCustomWatchlistFileError = createSelector<[typeof selectCustomWatchlistsStore], string>(
  selectCustomWatchlistsStore,
  (store) => store.fileErrorType,
);

export const selectCurrentCustomWatchlistErrorsFormated = createSelector<[typeof selectCurrentCustomWatchlistError], Partial<Nullable<Record<ValidatedInputsKeys, IValidationErrorFormated[]>>>>(
  selectCurrentCustomWatchlistError,
  (errors) => getWatchlistErrorsFormated(errors),
);

export const selectCurrentCustomWatchlistHeaders = createSelector<[typeof selectCustomWatchlistsStore], Nullable<string[]>>(
  selectCustomWatchlistsStore,
  (store) => store.currentWatchlistHeaders.value,
);

export const selectCurrentCustomWatchlistHeadersIsLoading = createSelector<[typeof selectCustomWatchlistsStore], boolean>(
  selectCustomWatchlistsStore,
  (store) => store.currentWatchlistHeaders.isLoading,
);

export const selectCurrentCustomWatchlistHeadersErrorType = createSelector<[typeof selectCustomWatchlistsStore], any>(
  selectCustomWatchlistsStore,
  (store) => store.currentWatchlistHeaders.error,
);

export const selectCurrentCustomWatchlistIsFileAvailable = createSelector<[typeof selectCurrentCustomWatchlist], boolean>(
  selectCurrentCustomWatchlist,
  (store) => store?.isFileAvailable ?? true,
);
