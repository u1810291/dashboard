import { initialFilter } from 'apps/identity/models/filter.model';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/utils';
import { types } from './identities.actions';
import { IdentityActionGroups, SliceNames } from './identities.model';

const initialState = {
  isLoadingFile: false,
  filter: initialFilter,

  [SliceNames.IdentityList]: LoadableAdapter.createState([]),
  [SliceNames.IdentityCount]: LoadableAdapter.createState(0),
  [SliceNames.FilteredCount]: LoadableAdapter.createState(0),
  [SliceNames.Identity]: LoadableAdapter.createState(null),
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(IdentityActionGroups.IdentityList, SliceNames.IdentityList),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.IdentityCount, SliceNames.IdentityCount),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.FilteredCount, SliceNames.FilteredCount),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.Identity, SliceNames.Identity),

  [types.FILTER_UPDATE](state, { payload }) {
    return {
      ...state,
      filter: payload,
    };
  },

  [types.IDENTITY_REMOVE](state, { payload }) {
    // remove identity and decrement counters
    return {
      ...state,
      [SliceNames.IdentityList]: {
        ...state[SliceNames.IdentityList],
        value: state[SliceNames.IdentityList].value.filter((item) => item.id !== payload),
      },
      [SliceNames.IdentityCount]: {
        ...state[SliceNames.IdentityCount],
        value: state[SliceNames.IdentityCount].value - 1,
      },
      [SliceNames.FilteredCount]: {
        ...state[SliceNames.FilteredCount],
        value: state[SliceNames.FilteredCount].value - 1,
      },
    };
  },
});
