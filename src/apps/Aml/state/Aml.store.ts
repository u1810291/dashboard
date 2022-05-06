import { Loadable } from 'models/Loadable.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';
import { IWatchlist, IWatchlistGroup, IWatchlistContent } from 'models/Watchlist.model';

export const AML_STORE_KEY = 'aml';

export enum BasicWatchlistsActions {
  Watchlists = 'BASIC_WATCHLISTS',
  WatchlistsGroups = 'BASIC_WATCHLISTS_GROUPS',
  CurrentWatchlist = 'CURRENT_BASIC_WATCHLIST',
  WatchlistContent = 'BASIC_WATCHLIST_CONTENT',
  WatchlistsDelete = 'BASIC_WATCHLISTS_DELETE',
  CurrentWatchlistHeaders = 'CURRENT_BASIC_WATCHLIST_HEADERS',
  CurrentWatchlistFileFailure = 'CURRENT_BASIC_WATCHLIST_FILE_FAILURE',
}

export enum SliceNames {
  Watchlists = 'watchlists',
  WatchlistsGroups = 'watchlistsGroups',
  CurrentWatchlist = 'currentWatchlist',
  WatchlistContent = 'watchlistContent',
  CurrentWatchlistHeaders = 'currentWatchlistHeaders',
}

export const types: TypesSequence = {
  ...createTypesSequence(BasicWatchlistsActions.Watchlists),
  ...createTypesSequence(BasicWatchlistsActions.WatchlistsGroups),
  ...createTypesSequence(BasicWatchlistsActions.CurrentWatchlist),
  ...createTypesSequence(BasicWatchlistsActions.WatchlistContent),
  ...createTypesSequence(BasicWatchlistsActions.WatchlistsDelete),
  ...createTypesSequence(BasicWatchlistsActions.CurrentWatchlistHeaders),
};

export interface AmlStore {
  [SliceNames.Watchlists]: Loadable<IWatchlist[]>;
  [SliceNames.WatchlistsGroups]: Loadable<IWatchlistGroup[]>;
  [SliceNames.CurrentWatchlist]: Loadable<Nullable<IWatchlist>>;
  [SliceNames.WatchlistContent]: Loadable<IWatchlistContent>;
  [SliceNames.CurrentWatchlistHeaders]: Loadable<string[]>;
  fileErrorType: Nullable<string>;
}
