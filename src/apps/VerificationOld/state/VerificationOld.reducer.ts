import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { VerificationActionGroups, VerificationActionTypes, VerificationSliceTypes, VerificationOldStore } from './VerificationOld.store';

const initialState: VerificationOldStore = {
  productList: [],
  [VerificationSliceTypes.Verification]: LoadableAdapter.createState(null),
  [VerificationSliceTypes.PassedVerifications]: LoadableAdapter.createState([]),
};

export const verificationOldReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(VerificationActionGroups.Verification, VerificationSliceTypes.Verification),
  ...LoadableAdapter.createHandlers(VerificationActionGroups.PassedVerifications, VerificationSliceTypes.PassedVerifications),
  [VerificationActionTypes.VERIFICATION_PRODUCT_LIST_UPDATE](state: VerificationOldStore, { payload }) {
    return {
      ...state,
      productList: payload,
    };
  },
});
