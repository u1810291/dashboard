import { selectLoadableValue, selectModelValue } from 'lib/loadable.selectors';
import { isObjectEmpty } from 'lib/object';
import { getVerificationExtras } from 'models/Verification.model';
import { createSelector } from 'reselect';
import { selectCountriesList } from 'state/countries/countries.selectors';
import { REVIEW_MODE_KEY, SliceNames } from './reviewMode.store';

export const selectReviewModeStore = (state) => state[REVIEW_MODE_KEY];

export const selectVerificationModel = createSelector(
  selectReviewModeStore,
  (store) => store[SliceNames.ReviewVerification],
);

export const selectReviewAwaitingCountModel = createSelector(
  selectReviewModeStore,
  (store) => store[SliceNames.AwaitingCount],
);

export const selectReviewAwaitingCount = createSelector(
  selectReviewAwaitingCountModel,
  selectModelValue(),
);

export const selectReviewVerificationId = createSelector(
  selectVerificationModel,
  selectModelValue((verification) => verification?._id),
);

export const selectReviewIdentityId = createSelector(
  selectVerificationModel,
  selectModelValue((verification) => verification?.identity),
);

export const selectReviewIsLoadingNext = createSelector(
  selectReviewModeStore,
  (store) => store[SliceNames.IsLoadingNext],
);

export const selectIsNoVerifications = createSelector(
  selectVerificationModel,
  selectModelValue((verification) => !verification || isObjectEmpty(verification)),
);

export const selectReviewVerificationModelWithExtras = createSelector(
  selectVerificationModel,
  selectCountriesList,
  selectLoadableValue((value, countries) => getVerificationExtras(value, countries)),
);

export const selectReviewVerificationWithExtras = createSelector(
  selectReviewVerificationModelWithExtras,
  selectModelValue(),
);
