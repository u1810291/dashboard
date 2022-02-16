import { Loadable } from 'models/Loadable.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';
import { VerificationResponse } from 'models/Verification.model';
import { ProductTypes } from 'models/Product.model';

export const REVIEW_MODE_KEY = 'reviewMode';

export enum ReviewModeActionGroups {
  ReviewVerification = 'REVIEW_VERIFICATION',
  ReviewAwaitingCount = 'REVIEW_AWAITING_COUNT',
}

export enum ReviewModeSliceTypes {
  ProductList = 'productList',
  ReviewVerification = 'reviewVerification',
  AwaitingCount = 'reviewAwaitingCount',
  IsLoadingNext = 'isLoadingNext',
}

export interface ReviewModeStore {
  [ReviewModeSliceTypes.ProductList]: ProductTypes[];
  [ReviewModeSliceTypes.ReviewVerification]: Loadable<VerificationResponse>;
  [ReviewModeSliceTypes.AwaitingCount]: Loadable<number>;
  [ReviewModeSliceTypes.IsLoadingNext]: boolean;
}

export const ReviewModeActionTypes: TypesSequence = {
  ...createTypesSequence(ReviewModeActionGroups.ReviewVerification),
  ...createTypesSequence(ReviewModeActionGroups.ReviewAwaitingCount),
  REVIEW_LOADING_NEXT: 'REVIEW_LOADING_NEXT',
  VERIFICATION_PRODUCT_LIST_UPDATE: 'VERIFICATION_PRODUCT_LIST_UPDATE',
};
