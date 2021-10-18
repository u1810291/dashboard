import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { CustomWatchlistsActions, CustomWatchlistsStore, SliceNames } from './CustomWatchlist.store';

const initialState: CustomWatchlistsStore = {
  [SliceNames.Watchlists]: LoadableAdapter.createState([]),
  [SliceNames.WatchlistContent]: LoadableAdapter.createState(null),
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(CustomWatchlistsActions.Watchlists, SliceNames.Watchlists),
  ...LoadableAdapter.createHandlers(CustomWatchlistsActions.WatchlistContent, SliceNames.WatchlistContent),
});
