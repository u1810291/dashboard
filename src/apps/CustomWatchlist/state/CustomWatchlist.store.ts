import { IWatchlist, WatchlistContentTypes } from 'models/CustomWatchlist.model';
import { Loadable } from 'models/Loadable.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';

export const CUSTOM_WATCHLISTS_STORE_KEY = 'customWatchlists';

export enum CustomWatchlistsActions {
  Watchlists = 'CUSTOM_WATCHLISTS',
  Watchlist = 'CUSTOM_WATCHLIST',
  WatchlistContent = 'CUSTOM_WATCHLIST_CONTENT',
  WatchlistsDelete = 'CUSTOM_WATCHLISTS_DELETE',
}

export enum SliceNames {
  Watchlists = 'watchlists',
  WatchlistContent = 'watchlistContent',
}

export const types: TypesSequence = {
  ...createTypesSequence(CustomWatchlistsActions.Watchlists),
  ...createTypesSequence(CustomWatchlistsActions.Watchlist),
  ...createTypesSequence(CustomWatchlistsActions.WatchlistContent),
  ...createTypesSequence(CustomWatchlistsActions.WatchlistsDelete),
};

export interface CustomWatchlistsStore {
  [SliceNames.Watchlists]: Loadable<IWatchlist[]>;
  [SliceNames.WatchlistContent]: Loadable<WatchlistContentTypes>;
}
