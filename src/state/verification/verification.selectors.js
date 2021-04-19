import { selectLoadableValue, selectModelValue } from 'lib/loadable.selectors';
import { getVerificationExtras } from 'models/Verification.model';
import { createSelector } from 'reselect';
import { selectCountriesList } from '../countries/countries.selectors';
import { selectIdentityModel } from '../identities/identities.selectors';

export const selectVerificationModelWithExtras = createSelector(
  selectIdentityModel,
  selectCountriesList,
  selectLoadableValue((value, countries) => getVerificationExtras(value?._embedded?.verification, countries)),
);

export const selectReviewVerificationWithExtras = createSelector(
  selectVerificationModelWithExtras,
  selectModelValue(),
);
