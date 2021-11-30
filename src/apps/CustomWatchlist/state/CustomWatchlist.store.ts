import { Loadable } from 'models/Loadable.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';
import { IWatchlist, WatchlistContentTypes } from '../models/CustomWatchlist.models';

export const CUSTOM_WATCHLISTS_STORE_KEY = 'customWatchlists';

export enum CustomWatchlistsActions {
  Watchlists = 'CUSTOM_WATCHLISTS',
  CurrentWatchlist = 'CURRENT_CUSTOM_WATCHLIST',
  WatchlistContent = 'CUSTOM_WATCHLIST_CONTENT',
  WatchlistsDelete = 'CUSTOM_WATCHLISTS_DELETE',
}

export enum SliceNames {
  Watchlists = 'watchlists',
  CurrentWatchlist = 'currentWatchlist',
  WatchlistContent = 'watchlistContent',
}

export const types: TypesSequence = {
  ...createTypesSequence(CustomWatchlistsActions.Watchlists),
  ...createTypesSequence(CustomWatchlistsActions.CurrentWatchlist),
  ...createTypesSequence(CustomWatchlistsActions.WatchlistContent),
  ...createTypesSequence(CustomWatchlistsActions.WatchlistsDelete),
};

export interface CustomWatchlistsStore {
  [SliceNames.Watchlists]: Loadable<IWatchlist[]>;
  [SliceNames.CurrentWatchlist]: Loadable<IWatchlist>;
  [SliceNames.WatchlistContent]: Loadable<WatchlistContentTypes>;
}
