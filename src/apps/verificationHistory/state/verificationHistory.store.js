import { createTypesSequence } from 'state/utils';

export const VERIFICATION_HISTORY_STORE_KEY = 'verificationHistory';

export const VerificationHistoryActionGroups = {
  VERIFICATION_CHANGES: 'VERIFICATION_CHANGES_LIST',
};

export const SliceNames = {
  Filter: 'filter',
  Changes: 'changes',
  Count: 'count',
};
export const types = {
  FILTER_UPDATE: 'verificationHistory/FILTER_UPDATE',
  ...createTypesSequence(VerificationHistoryActionGroups.VERIFICATION_CHANGES),
  VERIFICATION_HISTORY_COUNT_LOAD: 'VERIFICATION_HISTORY_COUNT_LOAD',
};
