import { createSelector } from 'reselect';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { MerchantTags } from 'models/Merchant.model';
import { CustomWatchlistsStore, CUSTOM_WATCHLISTS_STORE_KEY } from './CustomWatchlist.store';
import { CustomWatchlistValidationError, ICustomWatchlistValidationErrorFormated, getCustomWatchlistErrorsFormated, IWatchlist, ValidatedInputsKeys, WatchlistProcessStatus } from '../models/CustomWatchlist.models';

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

export const selectCurrentCustomWatchlistStatus = createSelector<any, CustomWatchlistsStore, WatchlistProcessStatus | null>(
  selectCustomWatchlistsStore,
  (store) => store.currentWatchlist.value?.process?.status ?? null,
);
export const selectCurrentCustomWatchlistId = createSelector<any, CustomWatchlistsStore, number>(
  selectCustomWatchlistsStore,
  (store) => store.currentWatchlist.value?.id ?? null,
);

export const selectCurrentCustomWatchlistError = createSelector<any, CustomWatchlistsStore, CustomWatchlistValidationError[] | null>(
  selectCustomWatchlistsStore,
  (store) => store.currentWatchlist.value?.process?.error,
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
