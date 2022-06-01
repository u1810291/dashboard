import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { BasicWatchlistsActions, AmlStore, SliceNameTypes } from './Aml.store';

const initialState: AmlStore = {
  [SliceNameTypes.Watchlists]: LoadableAdapter.createState([]),
  [SliceNameTypes.WatchlistsGroups]: LoadableAdapter.createState([]),
  [SliceNameTypes.CurrentWatchlist]: LoadableAdapter.createState(null),
  [SliceNameTypes.WatchlistContent]: LoadableAdapter.createState(null),
  [SliceNameTypes.CurrentWatchlistHeaders]: LoadableAdapter.createState(null),
  fileErrorType: null,
};

export const amlReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(BasicWatchlistsActions.Watchlists, SliceNameTypes.Watchlists),
  ...LoadableAdapter.createHandlers(BasicWatchlistsActions.WatchlistsGroups, SliceNameTypes.WatchlistsGroups),
  ...LoadableAdapter.createHandlers(BasicWatchlistsActions.CurrentWatchlist, SliceNameTypes.CurrentWatchlist),
  ...LoadableAdapter.createHandlers(BasicWatchlistsActions.WatchlistContent, SliceNameTypes.WatchlistContent),
  ...LoadableAdapter.createHandlers(BasicWatchlistsActions.CurrentWatchlistHeaders, SliceNameTypes.CurrentWatchlistHeaders),

  [BasicWatchlistsActions.CurrentWatchlistFileFailure](state, { payload }) {
    return {
      ...state,
      fileErrorType: payload,
    };
  },
});
