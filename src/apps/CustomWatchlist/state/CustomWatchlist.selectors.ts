import { createSelector } from 'reselect';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { MerchantTags } from 'models/Merchant.model';
import { IWatchlist } from 'models/CustomWatchlist.model';
import { CustomWatchlistsStore, CUSTOM_WATCHLISTS_STORE_KEY } from './CustomWatchlist.store';

export const selectCustomWatchlistsStore = (state): CustomWatchlistsStore => state[CUSTOM_WATCHLISTS_STORE_KEY];

export const selectWatchlists = createSelector(
  selectCustomWatchlistsStore,
  (store): IWatchlist[] => store.watchlists.value,
);

export const selectIsWatchlistsLoaded = createSelector(
  selectCustomWatchlistsStore,
  (store): boolean => store.watchlists.isLoaded,
);

export const selectIsWatchlistsLoading = createSelector(
  selectCustomWatchlistsStore,
  (store): boolean => store.watchlists.isLoading,
);

export const selectIsWatchlistsContentLoading = createSelector(
  selectCustomWatchlistsStore,
  (store): boolean => store.watchlistContent.isLoading,
);

export const selectCanUseCustomWatchlists = createSelector(
  selectMerchantTags,
  (tags: MerchantTags[]): boolean => tags.includes(MerchantTags.CanUseCustomWatchlists),
);
