export const IDENTITIES_STORE_KEY = 'identities';

export enum IdentityActionGroups {
  Identity = 'IDENTITY',
  IdentityList = 'IDENTITY_LIST',
  IdentityCount = 'IDENTITY_COUNT',
  FilteredCount = 'FILTERED_COUNT',
  PreliminaryFilteredCount = 'PRELIMINARY_FILTERED_COUNT',
  ManualReviewCount = 'MANUAL_REVIEW_COUNT',
}

export enum SliceNames {
  Identity = 'identity',
  IdentityList = 'identityList',
  IdentityCount = 'identityCount',
  FilteredCount = 'filteredCount',
  PreliminaryFilteredCount = 'preliminaryFilteredCount',
  ManualReviewCount = 'manualReviewCount',
}
