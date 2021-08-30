import { createSelector } from 'reselect';
import { CustomWatchlistsStore, CUSTOM_WATCHLISTS_STORE_KEY } from './CustomWatchlist.store';

export const selectCustomWatchlistsStore = (state: CustomWatchlistsStore) => state[CUSTOM_WATCHLISTS_STORE_KEY];

export const selectMockData = createSelector(
  selectCustomWatchlistsStore,
  (store) => store.list.value,
);
