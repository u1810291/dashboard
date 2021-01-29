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
  const matchStatus = step?.error?.details?.matchStatus;
  if (step.data) {
    const monitoringDisabledByApi = step.data.isMonitoringAvailable && !step.data.monitored && IdentityStatuses.verified === identity.status;
    step.data = {
      ...step.data,
      dateOfBirth: document?.fields?.dateOfBirth?.value,
      matchType: matchStatus ? MatchTypesMap[matchStatus] || MatchTypes.partial : MatchTypes.noMatch,
      identityStatus: identity.status,
      isMonitored: step.data.isMonitoringAvailable && !(monitoringDisabledByApi),
    };
  }
  return step;
}
