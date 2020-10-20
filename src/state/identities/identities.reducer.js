import { initialFilter } from 'apps/identity/models/filter.model';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/utils';
import { types } from './identities.actions';
import { IdentityActionGroups, SliceNames } from './identities.store';

const initialState = {
  isPDFGenerating: false,
  filter: initialFilter,

  [SliceNames.Identity]: LoadableAdapter.createState(null),
  [SliceNames.IdentityList]: LoadableAdapter.createState([]),
  [SliceNames.IdentityCount]: LoadableAdapter.createState(0),
  [SliceNames.FilteredCount]: LoadableAdapter.createState(0),
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(IdentityActionGroups.Identity, SliceNames.Identity),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.IdentityList, SliceNames.IdentityList),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.IdentityCount, SliceNames.IdentityCount),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.FilteredCount, SliceNames.FilteredCount),

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
  [types.SET_PDF_GENERATING](state, { payload }) {
    return {
      ...state,
      isPDFGenerating: payload,
    };
  },
});
