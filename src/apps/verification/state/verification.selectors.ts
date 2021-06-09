import { selectLoadableValue, selectModelValue } from 'lib/loadable.selectors';
import { getVerificationExtras } from 'models/Verification.model';
import { createSelector } from 'reselect';
import { groupVerificationsByFlow } from 'models/Identity.model';
import { SliceNames } from 'state/identities/identities.store';
import { selectCountriesList } from 'state/countries/countries.selectors';
import { selectIdentityModel, selectIdentityStore } from 'state/identities/identities.selectors';

export const selectVerificationModelWithExtras = createSelector(
  selectIdentityModel,
  selectCountriesList,
  selectLoadableValue((value, countries) => getVerificationExtras(value?._embedded?.verification, countries)),
);

export const selectVerificationModel = createSelector(
  selectIdentityStore,
  (store) => store[SliceNames.Verification],
);

export const selectNewVerificationModelWithExtras = createSelector(
  selectVerificationModel,
  selectCountriesList,
  selectLoadableValue((verification, countries) => getVerificationExtras(verification, countries)),
);

export const selectNewVerificationWithExtras = createSelector(
  selectNewVerificationModelWithExtras,
  selectModelValue(),
);

export const selectReviewVerificationWithExtras = createSelector(
  selectVerificationModelWithExtras,
  selectModelValue(),
);

export const selectVerification = createSelector(
  selectVerificationModel,
  selectModelValue(),
);

export const selectVerificationId = createSelector(
  selectVerification,
  (verification) => verification?._id,
);

export const selectVerificationsCollectionModel = createSelector(
  selectIdentityStore,
  (store) => store[SliceNames.VerificationsCollection],
);

export const selectVerificationsCollection = createSelector(
  selectVerificationsCollectionModel,
  selectModelValue(),
);

export const selectVerificationsGroupedByFlow = createSelector(
  selectVerificationsCollectionModel,
  selectModelValue((verifications) => groupVerificationsByFlow(verifications)),
);
