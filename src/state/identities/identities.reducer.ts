import { LoadableAdapter } from 'lib/Loadable.adapter';
import { verificationsFilterInitialState } from 'models/Identity.model';
import { createReducer } from 'state/utils';
import { types } from 'state/identities/identities.actions';
import { IdentityActionGroups, SliceNames } from './identities.store';

const initialState = {
  isPDFGenerating: false,
  filter: verificationsFilterInitialState,

  [SliceNames.Identity]: LoadableAdapter.createState(null),
  [SliceNames.VerificationsCollection]: LoadableAdapter.createState([]),
  [SliceNames.Verification]: LoadableAdapter.createState(null),
  [SliceNames.IdentityProfile]: LoadableAdapter.createState(null),
  [SliceNames.IdentityList]: LoadableAdapter.createState([]),
  [SliceNames.IdentityCount]: LoadableAdapter.createState(0),
  [SliceNames.FilteredCount]: LoadableAdapter.createState(0),
  [SliceNames.PreliminaryFilteredCount]: LoadableAdapter.createState(0),
  [SliceNames.ManualReviewCount]: LoadableAdapter.createState(0),
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(IdentityActionGroups.Identity, SliceNames.Identity),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.IdentityProfile, SliceNames.IdentityProfile),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.VerificationsCollection, SliceNames.VerificationsCollection),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.Verification, SliceNames.Verification),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.IdentityList, SliceNames.IdentityList),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.IdentityCount, SliceNames.IdentityCount),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.FilteredCount, SliceNames.FilteredCount),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.PreliminaryFilteredCount, SliceNames.PreliminaryFilteredCount),
  ...LoadableAdapter.createHandlers(IdentityActionGroups.ManualReviewCount, SliceNames.ManualReviewCount),

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
