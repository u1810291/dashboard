import { selectLoadableValue, selectModelValue } from 'lib/loadable.selectors';
import { Loadable } from 'models/Loadable.model';
import { ProductTypes } from 'models/Product.model';
import { getVerificationExtras, groupVerificationsByFlow, PassedVerificationByFlow, Verification, VerificationResponse } from 'models/Verification.model';
import { createSelector } from 'reselect';
import { selectCountriesList } from 'state/countries/countries.selectors';
import { selectIdentityModel } from 'state/identities/identities.selectors';
import { VERIFICATION_STORE_KEY, VerificationSliceTypes, VerificationStore } from './Verification.store';

export const verificationStore = (state): VerificationStore => state[VERIFICATION_STORE_KEY];

export const selectVerificationModel = createSelector(
  verificationStore,
  (store) => store[VerificationSliceTypes.Verification],
);

export const selectVerificationsCollectionModel = createSelector(
  verificationStore,
  (store): Loadable<any[]> => store[VerificationSliceTypes.PassedVerifications],
);

export const selectVerificationProductList = createSelector(
  verificationStore,
  (store): ProductTypes[] => store.productList || [],
);

export const selectVerificationModelWithExtras = createSelector(
  selectIdentityModel,
  selectCountriesList,
  selectLoadableValue((value, countries) => getVerificationExtras(value?._embedded?.verification, countries)),
);

export const selectReviewVerificationWithExtras = createSelector(
  selectVerificationModelWithExtras,
  selectModelValue(),
);

export const selectNewVerificationModelWithExtras = createSelector(
  selectVerificationModel,
  selectCountriesList,
  selectLoadableValue((verification, countries) => getVerificationExtras(verification, countries)),
);

export const selectNewVerificationWithExtras = createSelector<any, any, Verification>(
  selectNewVerificationModelWithExtras,
  selectModelValue(),
);

export const selectVerification = createSelector<any, any, VerificationResponse>(
  selectVerificationModel,
  selectModelValue(),
);

export const selectVerificationsGroupedByFlow = createSelector(
  selectVerificationsCollectionModel,
  selectModelValue((verifications): PassedVerificationByFlow[] => groupVerificationsByFlow(verifications)),
);
