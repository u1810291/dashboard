import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { VerificationActionGroups, VerificationActionTypes, VerificationSliceTypes, VerificationStore } from './Verification.store';

const initialState: VerificationStore = {
  productList: [],
  [VerificationSliceTypes.Verification]: LoadableAdapter.createState(null),
  [VerificationSliceTypes.PassedVerifications]: LoadableAdapter.createState([]),
};

export const verificationReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(VerificationActionGroups.Verification, VerificationSliceTypes.Verification),
  ...LoadableAdapter.createHandlers(VerificationActionGroups.PassedVerifications, VerificationSliceTypes.PassedVerifications),
  [VerificationActionTypes.VERIFICATION_PRODUCT_LIST_UPDATE](state: VerificationStore, { payload }) {
    return {
      ...state,
      productList: payload,
    };
  },
});
