export const IDENTITIES_STORE_KEY = 'identities';

export enum IdentityActionGroups {
  Identity = 'IDENTITY',
  IdentityList = 'IDENTITY_LIST',
  FilteredCount = 'FILTERED_COUNT',
  PreliminaryFilteredCount = 'PRELIMINARY_FILTERED_COUNT',
}

export enum SliceNameTypes {
  Identity = 'identity',
  IdentityList = 'identityList',
  FilteredCount = 'filteredCount',
  PreliminaryFilteredCount = 'preliminaryFilteredCount',
}
