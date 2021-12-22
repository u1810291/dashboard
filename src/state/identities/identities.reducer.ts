import { LoadableAdapter } from 'lib/Loadable.adapter';
import { verificationsFilterInitialState } from 'models/Identity.model';
import { createReducer } from 'state/store.utils';
import { types } from './identities.actions';
import { IdentityActionGroups, SliceNames } from './identities.store';

const initialState = {
  isPDFGenerating: false,
  filter: verificationsFilterInitialState,

  [SliceNames.Identity]: LoadableAdapter.createState(null),
  [SliceNames.IdentityList]: LoadableAdapter.createState([]),
  [SliceNames.FilteredCount]: LoadableAdapter.createState(0),
  [SliceNames.PreliminaryFilteredCount]: LoadableAdapter.createState(0),
};

export type IdentitiesState = typeof initialState;

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(IdentityActionGroups.Identity, SliceNames.Identity),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.IdentityList, SliceNames.IdentityList),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.FilteredCount, SliceNames.FilteredCount),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.PreliminaryFilteredCount, SliceNames.PreliminaryFilteredCount),

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
