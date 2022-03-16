import { createSelector } from 'reselect';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { MerchantTags } from 'models/Merchant.model';
import { CustomWatchlistsStore, CUSTOM_WATCHLISTS_STORE_KEY } from './CustomWatchlist.store';
import { CustomWatchlistValidationError, ICustomWatchlistValidationErrorFormated, WatchlistProcessPartial, getCustomWatchlistErrorsFormated, IWatchlist, ValidatedInputsKeys, WatchlistProcessStatus, WatchlistMapping } from '../models/CustomWatchlist.models';

export const selectCustomWatchlistsStore = (state): CustomWatchlistsStore => state[CUSTOM_WATCHLISTS_STORE_KEY];

export const selectWatchlists = createSelector<any, CustomWatchlistsStore, IWatchlist[]>(
  selectCustomWatchlistsStore,
  (store) => store.watchlists.value,
);

export const selectIsWatchlistsLoaded = createSelector<any, CustomWatchlistsStore, boolean>(
  selectCustomWatchlistsStore,
  (store) => store.watchlists.isLoaded,
);

export const selectIsWatchlistsFailed = createSelector<any, CustomWatchlistsStore, boolean>(
  selectCustomWatchlistsStore,
  (store) => store.watchlists.isFailed,
);

export const selectIsWatchlistsLoading = createSelector<any, CustomWatchlistsStore, boolean>(
  selectCustomWatchlistsStore,
  (store) => store.watchlists.isLoading,
);

export const selectIsWatchlistsContentLoading = createSelector<any, CustomWatchlistsStore, boolean>(
  selectCustomWatchlistsStore,
  (store) => store.watchlistContent.isLoading,
);

export const selectWatchlistsContentErrorType = createSelector<any, CustomWatchlistsStore, string>(
  selectCustomWatchlistsStore,
  (store) => store.watchlistContent.error,
);

export const selectCanUseCustomWatchlists = createSelector<any, MerchantTags[], boolean>(
  selectMerchantTags,
  (tags) => tags.includes(MerchantTags.CanUseCustomWatchlists),
);

export const selectCurrentCustomWatchlist = createSelector<any, CustomWatchlistsStore, IWatchlist | null>(
  selectCustomWatchlistsStore,
  (store) => store.currentWatchlist.value,
);

export const selectCurrentCustomWatchlistIsLoading = createSelector<any, CustomWatchlistsStore, boolean>(
  selectCustomWatchlistsStore,
  (store) => store.currentWatchlist.isLoading,
);

export const selectCurrentCustomWatchlistIsLoaded = createSelector<any, CustomWatchlistsStore, boolean>(
  selectCustomWatchlistsStore,
  (store) => store.currentWatchlist.isLoaded,
);

export const selectCurrentCustomWatchlistId = createSelector<any, IWatchlist | null, number>(
  selectCurrentCustomWatchlist,
  (currentWatchlist) => currentWatchlist?.id ?? null,
);

export const selectCurrentCustomWatchlistProcess = createSelector<any, IWatchlist | null, WatchlistProcessPartial>(
  selectCurrentCustomWatchlist,
  (currentWatchlist) => currentWatchlist?.process,
);

export const selectCurrentCustomWatchlistStatus = createSelector<any, WatchlistProcessPartial, WatchlistProcessStatus | null>(
  selectCurrentCustomWatchlistProcess,
  (currentWatchlistProcess) => currentWatchlistProcess?.status ?? null,
);

export const selectCurrentCustomWatchlistError = createSelector<any, WatchlistProcessPartial, CustomWatchlistValidationError[] | null>(
  selectCurrentCustomWatchlistProcess,
  (currentWatchlistProcess) => currentWatchlistProcess?.error,
);

export const selectCurrentCustomWatchlistFileInfo = createSelector<any, WatchlistProcessPartial, Partial<{ fileKey: string; fileName: string }>>(
  selectCurrentCustomWatchlistProcess,
  (currentWatchlistProcess) => ({
    fileKey: currentWatchlistProcess?.inputSourceFileKey,
    fileName: currentWatchlistProcess?.inputSourceFileName,
  }),
);

export const selectCurrentCustomWatchlistMapping = createSelector<any, IWatchlist | null, WatchlistMapping[] | null>(
  selectCurrentCustomWatchlist,
  (currentWatchlist) => currentWatchlist?.mapping,
);

export const selectCurrentCustomWatchlistFileError = createSelector<any, CustomWatchlistsStore, string>(
  selectCustomWatchlistsStore,
  (store) => store.fileErrorType,
);

export const selectCurrentCustomWatchlistErrorsFormated = createSelector<any, CustomWatchlistValidationError[] | null, Partial<Record<ValidatedInputsKeys, ICustomWatchlistValidationErrorFormated[]>> | null>(
  selectCurrentCustomWatchlistError,
  (errors) => getCustomWatchlistErrorsFormated(errors),
);

export const selectCurrentCustomWatchlistHeaders = createSelector<any, CustomWatchlistsStore, string[] | null>(
  selectCustomWatchlistsStore,
  (store) => store.currentWatchlistHeaders.value,
);

export const selectCurrentCustomWatchlistHeadersIsLoading = createSelector<any, CustomWatchlistsStore, boolean>(
  selectCustomWatchlistsStore,
  (store) => store.currentWatchlistHeaders.isLoading,
);

export const selectCurrentCustomWatchlistHeadersErrorType = createSelector<any, CustomWatchlistsStore, any>(
  selectCustomWatchlistsStore,
  (store) => store.currentWatchlistHeaders.error,
);

export const selectCurrentCustomWatchlistIsFileAvailable = createSelector<any, IWatchlist | null, boolean>(
  selectCurrentCustomWatchlist,
  (store) => store?.isFileAvailable ?? true,
);
