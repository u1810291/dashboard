import { Watchlist, WatchlistContentTypes } from 'models/CustomWatchlist.model';
import { Loadable } from 'models/Loadable.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';

export const CUSTOM_WATCHLISTS_STORE_KEY = 'customWatchlists';

export enum CustomWatchlistsActions {
  Watchlists = 'CUSTOM_WATCHLISTS',
  WatchlistContent = 'CUSTOM_WATCHLIST_CONTENT',
  WatchlistsDelete = 'CUSTOM_WATCHLISTS_DELETE',
}

export enum SliceNames {
  Watchlists = 'watchlists',
  WatchlistContent = 'watchlistContent',
}

export const types: TypesSequence = {
  ...createTypesSequence(CustomWatchlistsActions.Watchlists),
  ...createTypesSequence(CustomWatchlistsActions.WatchlistContent),
  ...createTypesSequence(CustomWatchlistsActions.WatchlistsDelete),
};

export interface CustomWatchlistsStore {
  [SliceNames.Watchlists]: Loadable<Watchlist[]>;
  [SliceNames.WatchlistContent]: Loadable<WatchlistContentTypes>;
}
