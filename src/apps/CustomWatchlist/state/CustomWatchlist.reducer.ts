import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { CustomWatchlistsActions, SliceNames } from './CustomWatchlist.store';

const initialState = {
  [SliceNames.List]: LoadableAdapter.createState(null),
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(CustomWatchlistsActions.list, SliceNames.List),
});
