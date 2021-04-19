import { createTypesSequence } from 'state/utils';

export const REVIEW_MODE_KEY = 'reviewMode';

export const ReviewModeActionGroups = {
  ReviewVerification: 'REVIEW_VERIFICATION',
  ReviewAwaitingCount: 'REVIEW_AWAITING_COUNT',
};

export const SliceNames = {
  ReviewVerification: 'reviewVerification',
  AwaitingCount: 'reviewAwaitingCount',
  IsLoadingNext: 'isLoadingNext',
};

export const types = {
  ...createTypesSequence(ReviewModeActionGroups.ReviewVerification),
  ...createTypesSequence(ReviewModeActionGroups.ReviewAwaitingCount),
  REVIEW_LOADING_NEXT: 'REVIEW_LOADING_NEXT',
};
