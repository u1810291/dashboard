export const IDENTITIES_STORE_KEY = 'identities';

export enum IdentityActionGroups {
  Identity = 'IDENTITY',
  IdentityProfile = 'IDENTITY_PROFILE',
  VerificationsCollection = 'VERIFICATIONS_COLLECTION',
  Verification = 'VERIFICATION',
  IdentityList = 'IDENTITY_LIST',
  IdentityRemove = 'IDENTITY_REMOVE',
  IdentityCount = 'IDENTITY_COUNT',
  FilteredCount = 'FILTERED_COUNT',
  PreliminaryFilteredCount = 'PRELIMINARY_FILTERED_COUNT',
  ManualReviewCount = 'MANUAL_REVIEW_COUNT',
}

export enum SliceNames {
  Identity = 'identity',
  IdentityProfile = 'identityProfile',
  VerificationsCollection = 'verificationsCollection',
  Verification = 'verification',
  IdentityList = 'identityList',
  IdentityCount = 'identityCount',
  FilteredCount = 'filteredCount',
  PreliminaryFilteredCount = 'preliminaryFilteredCount',
  ManualReviewCount = 'manualReviewCount',
}
