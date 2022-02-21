import { Loadable } from 'models/Loadable.model';
import { selectLoadableValue, selectModelValue } from 'lib/loadable.selectors';
import { ProductTypes } from 'models/Product.model';
import { isObjectEmpty } from 'lib/object';
import { getVerificationExtras, VerificationResponse, VerificationWithExtras } from 'models/VerificationOld.model';
import { createSelector } from 'reselect';
import { selectCountriesList } from 'state/countries/countries.selectors';
import { REVIEW_MODE_KEY, ReviewModeSliceTypes, ReviewModeStore } from './reviewMode.store';

export const selectReviewModeStore = (state: any): ReviewModeStore => state[REVIEW_MODE_KEY];

export const selectVerificationModel = createSelector(
  selectReviewModeStore,
  (store: ReviewModeStore): Loadable<VerificationResponse> => store[ReviewModeSliceTypes.ReviewVerification],
);

export const selectVerification = createSelector(
  selectReviewModeStore,
  (store: ReviewModeStore): VerificationResponse => store[ReviewModeSliceTypes.ReviewVerification].value,
);

export const selectVerificationProductList = createSelector(
  selectReviewModeStore,
  (store): ProductTypes[] => store[ReviewModeSliceTypes.ProductList] || [],
);

export const selectReviewAwaitingCountModel = createSelector(
  selectReviewModeStore,
  (store: ReviewModeStore): Loadable<number> => store[ReviewModeSliceTypes.AwaitingCount],
);

export const selectReviewAwaitingCount = createSelector(
  selectReviewAwaitingCountModel,
  selectModelValue(),
);

export const selectReviewVerificationId = createSelector(
  selectVerificationModel,
  selectModelValue((verification): string => verification?._id),
);

export const selectReviewIdentityId = createSelector(
  selectVerificationModel,
  selectModelValue((verification): string => verification?.identity),
);

export const selectReviewIsLoadingNext = createSelector(
  selectReviewModeStore,
  (store: ReviewModeStore): boolean => store[ReviewModeSliceTypes.IsLoadingNext],
);

export const selectIsNoVerifications = createSelector(
  selectVerificationModel,
  selectModelValue((verification): boolean => !verification || isObjectEmpty(verification)),
);

export const selectReviewVerificationModelWithExtras = createSelector(
  selectVerificationModel,
  selectCountriesList,
  selectLoadableValue((verification, countries) => getVerificationExtras(verification, countries)),
);

export const selectReviewVerificationWithExtras = createSelector<any, any, any, VerificationWithExtras>(
  selectVerification,
  selectCountriesList,
  (verification, countries) => getVerificationExtras(verification, countries),
);
