import { Watchlist } from 'models/CustomWatchlist.model';
import { Loadable } from 'models/Loadable.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';

export const CUSTOM_WATCHLISTS_STORE_KEY = 'customWatchlists';

export enum CustomWatchlistsActions {
  Watchlists = 'CUSTOM_WATCHLISTS_LIST',
  WatchlistsSet = 'CUSTOM_WATCHLIST_SET',
  WatchlistsUpdate = 'CUSTOM_WATCHLIST_UPDATE',
  WatchlistsDelete = 'CUSTOM_WATCHLIST_DELETE',
}

export enum SliceNames {
  Watchlists = 'watchlists',
}

export const types: TypesSequence = {
  ...createTypesSequence(CustomWatchlistsActions.Watchlists),
  ...createTypesSequence(CustomWatchlistsActions.WatchlistsSet),
  ...createTypesSequence(CustomWatchlistsActions.WatchlistsUpdate),
  ...createTypesSequence(CustomWatchlistsActions.WatchlistsDelete),
};

export interface CustomWatchlistsStore {
  [SliceNames.Watchlists]: Loadable<Watchlist[]>;
}
