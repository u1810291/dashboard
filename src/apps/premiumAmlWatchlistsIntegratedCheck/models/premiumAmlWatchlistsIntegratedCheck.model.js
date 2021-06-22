import { IdentityStatuses } from 'models/Status.model';

const MatchTypes = {
  exact: 'exact',
  noMatch: 'noMatch',
  partial: 'partial',
};

const MatchTypesMap = {
  name_exact: MatchTypes.exact,
  aka_exact: MatchTypes.exact,
  no_match: MatchTypes.noMatch,
};

export const PremiumAmlWatchlistsValidationTypes = {
  none: 'none',
  search: 'search',
  searchMonitoring: 'search+monitoring',
};

export function getPremiumAmlWatchlistsCheckExtraData(step, document, identity) {
  if (!step?.data) {
    return step;
  }

  const matchStatus = step?.error?.details?.matchStatus;
  const isMonitoringDisabledByApi = step.data.isMonitoringAvailable && !step.data.monitored && IdentityStatuses.verified === identity.status;

  return {
    ...step,
    data: {
      ...step.data,
      dateOfBirth: document?.fields?.dateOfBirth?.value,
      matchType: matchStatus ? MatchTypesMap[matchStatus] || MatchTypes.partial : MatchTypes.noMatch,
      identityStatus: identity.status,
      isMonitored: step.data.isMonitoringAvailable && !(isMonitoringDisabledByApi),
    },
  };
}
