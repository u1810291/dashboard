import { createTypesSequence } from 'state/store.utils';

export const VERIFICATION_HISTORY_STORE_KEY = 'verificationHistory';

export const VerificationHistoryActionGroups = {
  VERIFICATION_CHANGES: 'VERIFICATION_CHANGES_LIST',
  VERIFICATION_CHANGE_AGENT_NOTE: 'VERIFICATION_CHANGE_AGENT_NOTE',
};

export const SliceNames = {
  Filter: 'filter',
  Changes: 'changes',
  Count: 'count',
};

export const types = {
  FILTER_UPDATE: 'verificationHistory/FILTER_UPDATE',
  ...createTypesSequence(VerificationHistoryActionGroups.VERIFICATION_CHANGES),
  ...createTypesSequence(VerificationHistoryActionGroups.VERIFICATION_CHANGE_AGENT_NOTE),
  VERIFICATION_HISTORY_COUNT_LOAD: 'VERIFICATION_HISTORY_COUNT_LOAD',
};
