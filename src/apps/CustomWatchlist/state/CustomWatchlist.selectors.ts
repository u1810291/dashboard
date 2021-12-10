import { createSelector } from 'reselect';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { MerchantTags } from 'models/Merchant.model';
import { CustomWatchlistsStore, CUSTOM_WATCHLISTS_STORE_KEY } from './CustomWatchlist.store';
import { IWatchlist } from '../models/CustomWatchlist.models';

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

// TODO: STAGE 3, @richvoronov set error type
export const selectCurrentCustomWatchlistError = createSelector<any, CustomWatchlistsStore, any | null>(
  selectCustomWatchlistsStore,
  (store) => store.currentWatchlist.value?.process?.error,
);
