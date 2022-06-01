import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { CustomWatchlistsActions, CustomWatchlistsStore, SliceNameTypes } from './CustomWatchlist.store';

const initialState: CustomWatchlistsStore = {
  [SliceNameTypes.Watchlists]: LoadableAdapter.createState([]),
  [SliceNameTypes.CurrentWatchlist]: LoadableAdapter.createState(null),
  [SliceNameTypes.WatchlistContent]: LoadableAdapter.createState(null),
  [SliceNameTypes.CurrentWatchlistHeaders]: LoadableAdapter.createState(null),
  fileErrorType: null,
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(CustomWatchlistsActions.Watchlists, SliceNameTypes.Watchlists),
  ...LoadableAdapter.createHandlers(CustomWatchlistsActions.CurrentWatchlist, SliceNameTypes.CurrentWatchlist),
  ...LoadableAdapter.createHandlers(CustomWatchlistsActions.WatchlistContent, SliceNameTypes.WatchlistContent),
  ...LoadableAdapter.createHandlers(CustomWatchlistsActions.CurrentWatchlistHeaders, SliceNameTypes.CurrentWatchlistHeaders),

  [CustomWatchlistsActions.CurrentWatchlistFileFailure](state, { payload }) {
    return {
      ...state,
      fileErrorType: payload,
    };
  },
});
