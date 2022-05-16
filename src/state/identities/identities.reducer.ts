import { LoadableAdapter } from 'lib/Loadable.adapter';
import { verificationsFilterInitialState } from 'models/Identity.model';
import { createReducer } from 'state/store.utils';
import { types } from './identities.actions';
import { IdentityActionGroups, SliceNameTypes } from './identities.store';

const initialState = {
  isPDFGenerating: false,
  filter: verificationsFilterInitialState,

  [SliceNameTypes.Identity]: LoadableAdapter.createState(null),
  [SliceNameTypes.IdentityList]: LoadableAdapter.createState([]),
  [SliceNameTypes.FilteredCount]: LoadableAdapter.createState(0),
  [SliceNameTypes.PreliminaryFilteredCount]: LoadableAdapter.createState(0),
};

export type IdentitiesState = typeof initialState;

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(IdentityActionGroups.Identity, SliceNameTypes.Identity),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.IdentityList, SliceNameTypes.IdentityList),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.FilteredCount, SliceNameTypes.FilteredCount),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.PreliminaryFilteredCount, SliceNameTypes.PreliminaryFilteredCount),

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
      [SliceNameTypes.IdentityList]: {
        ...state[SliceNameTypes.IdentityList],
        value: state[SliceNameTypes.IdentityList].value.filter((item) => item.id !== payload),
      },
      [SliceNameTypes.FilteredCount]: {
        ...state[SliceNameTypes.FilteredCount],
        value: state[SliceNameTypes.FilteredCount].value - 1,
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
