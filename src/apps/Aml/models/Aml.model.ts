import { IdentityStatuses } from 'models/Status.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';

export enum AmlSettingsTypes {
  Search = 'search',
  Monitoring = 'monitoring',
}

export enum AmlCheckTypes {
  Watchlist = 'watchlist',
  Search = 'search',
  Monitoring = 'monitoring'
}

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

export enum AmlValidationTypes {
  None = 'none',
  Search = 'search',
  SearchMonitoring = 'search+monitoring',
}

export enum AmlDocumentStepTypes {
  Watchlists = 'watchlists',
}

export const AmlDocumentSteps = [
  AmlDocumentStepTypes.Watchlists,
  VerificationPatternTypes.PremiumAmlWatchListsSearchValidation,
];

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
