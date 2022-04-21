import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { BasicWatchlistsActions, AmlStore, SliceNames } from './Aml.store';

const initialState: AmlStore = {
  [SliceNames.Watchlists]: LoadableAdapter.createState([]),
  [SliceNames.WatchlistsGroups]: LoadableAdapter.createState([]),
  [SliceNames.CurrentWatchlist]: LoadableAdapter.createState(null),
  [SliceNames.WatchlistContent]: LoadableAdapter.createState(null),
  [SliceNames.CurrentWatchlistHeaders]: LoadableAdapter.createState(null),
  fileErrorType: null,
};

export const amlReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(BasicWatchlistsActions.Watchlists, SliceNames.Watchlists),
  ...LoadableAdapter.createHandlers(BasicWatchlistsActions.WatchlistsGroups, SliceNames.WatchlistsGroups),
  ...LoadableAdapter.createHandlers(BasicWatchlistsActions.CurrentWatchlist, SliceNames.CurrentWatchlist),
  ...LoadableAdapter.createHandlers(BasicWatchlistsActions.WatchlistContent, SliceNames.WatchlistContent),
  ...LoadableAdapter.createHandlers(BasicWatchlistsActions.CurrentWatchlistHeaders, SliceNames.CurrentWatchlistHeaders),

  [BasicWatchlistsActions.CurrentWatchlistFileFailure](state, { payload }) {
    return {
      ...state,
      fileErrorType: payload,
    };
  },
});
