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

export function getComplyAdvantageIntegratedCheckExtraData(step, document) {
  const matchStatus = step?.error?.details?.matchStatus;
  if (step.data) {
    step.data = {
      ...step.data,
      dateOfBirth: document?.fields?.dateOfBirth?.value,
      matchType: matchStatus ? MatchTypesMap[matchStatus] || MatchTypes.partial : MatchTypes.noMatch,
    };
  }
  return step;
}
