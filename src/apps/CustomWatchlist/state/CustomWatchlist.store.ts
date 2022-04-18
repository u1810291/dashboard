import { Loadable } from 'models/Loadable.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';
import { IWatchlist, IWatchlistContent } from 'models/Watchlist.model';

export const CUSTOM_WATCHLISTS_STORE_KEY = 'customWatchlists';

export enum CustomWatchlistsActions {
  Watchlists = 'CUSTOM_WATCHLISTS',
  CurrentWatchlist = 'CURRENT_CUSTOM_WATCHLIST',
  WatchlistContent = 'CUSTOM_WATCHLIST_CONTENT',
  WatchlistsDelete = 'CUSTOM_WATCHLISTS_DELETE',
  CurrentWatchlistHeaders = 'CURRENT_CUSTOM_WATCHLISTS_HEADERS',
  CurrentWatchlistFileFailure = 'CURRENT_CUSTOM_WATCHLIST_FILE_FAILURE',
}

export enum SliceNames {
  Watchlists = 'watchlists',
  CurrentWatchlist = 'currentWatchlist',
  WatchlistContent = 'watchlistContent',
  CurrentWatchlistHeaders = 'currentWatchlistHeaders',
}

export const types: TypesSequence = {
  ...createTypesSequence(CustomWatchlistsActions.Watchlists),
  ...createTypesSequence(CustomWatchlistsActions.CurrentWatchlist),
  ...createTypesSequence(CustomWatchlistsActions.WatchlistContent),
  ...createTypesSequence(CustomWatchlistsActions.WatchlistsDelete),
  ...createTypesSequence(CustomWatchlistsActions.CurrentWatchlistHeaders),
};

export interface CustomWatchlistsStore {
  [SliceNames.Watchlists]: Loadable<IWatchlist[]>;
  [SliceNames.CurrentWatchlist]: Loadable<IWatchlist | null>;
  [SliceNames.WatchlistContent]: Loadable<IWatchlistContent>;
  [SliceNames.CurrentWatchlistHeaders]: Loadable<string[]>;
  fileErrorType: string | null;
}
