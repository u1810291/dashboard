import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { CustomWatchlistsActions, CustomWatchlistsStore, SliceNames } from './CustomWatchlist.store';

const initialState: CustomWatchlistsStore = {
  [SliceNames.Watchlists]: LoadableAdapter.createState([]),
  [SliceNames.CurrentWatchlist]: LoadableAdapter.createState(null),
  [SliceNames.WatchlistContent]: LoadableAdapter.createState(null),
  [SliceNames.CurrentWatchlistHeaders]: LoadableAdapter.createState(null),
  fileErrorType: null,
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(CustomWatchlistsActions.Watchlists, SliceNames.Watchlists),
  ...LoadableAdapter.createHandlers(CustomWatchlistsActions.CurrentWatchlist, SliceNames.CurrentWatchlist),
  ...LoadableAdapter.createHandlers(CustomWatchlistsActions.WatchlistContent, SliceNames.WatchlistContent),
  ...LoadableAdapter.createHandlers(CustomWatchlistsActions.CurrentWatchlistHeaders, SliceNames.CurrentWatchlistHeaders),

  [CustomWatchlistsActions.CurrentWatchlistFileFailure](state, { payload }) {
    return {
      ...state,
      fileErrorType: payload,
    };
  },
});
