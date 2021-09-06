import { createSelector } from 'reselect';
import { CustomWatchlistsStore, CUSTOM_WATCHLISTS_STORE_KEY } from './CustomWatchlist.store';

export const selectCustomWatchlistsStore = (state): CustomWatchlistsStore => state[CUSTOM_WATCHLISTS_STORE_KEY];

export const selectWatchlists = createSelector(
  selectCustomWatchlistsStore,
  (store) => store.watchlists.value,
);

export const selectIsWatchlistsLoaded = createSelector(
  selectCustomWatchlistsStore,
  (store) => store.watchlists.isLoaded,
);
