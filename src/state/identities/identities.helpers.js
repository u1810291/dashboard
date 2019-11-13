import { YearMonthFormatter, YearMonthShortFormatter } from 'lib/date';
import { fromPairs, toPairs } from 'lodash';

const mapIdentityByMonth = (identity) => [
  identity.dateCreated.substring(0, 7),
  identity.status,
];

const reduceToMapByMonths = (accumulator, [month, status]) => {
  accumulator[month] = accumulator[month] || {
    all: 0,
    verified: 0,
    unverified: 0,
    manually: 0,
  };
  accumulator[month].all = (1 + accumulator[month].all) || 1;
  accumulator[month][status] = (1 + accumulator[month][status]) || 1;
  return accumulator;
};

export function computeMonthlyStatisticsForIdentities(identities) {
  const monthsStatistics = identities
    .map(mapIdentityByMonth)
    .reduce(reduceToMapByMonths, {});

  return toPairs(monthsStatistics)
    .sort(([yearMonth1], [yearMonth2]) => yearMonth1.localeCompare(yearMonth2))
    .map(([yearMonth, value]) => ({
      ...value,
      value: value.all,
      label: YearMonthShortFormatter.format(
        new Date(yearMonth.split('-')[0], Number(yearMonth.split('-')[1]) - 1),
      ),
      tooltipHeader: YearMonthFormatter.format(
        new Date(yearMonth.split('-')[0], Number(yearMonth.split('-')[1]) - 1),
      ),
    }));
}

export const buildInitialMonthlyIdentities = (numberOfMonths) => [...Array(numberOfMonths)]
  .map((e, idx) => idx)
  .reverse()
  .map((monthIdx) => {
    const d = new Date();
    d.setMonth(d.getMonth() - monthIdx);
    return {
      value: 0,
      label: YearMonthShortFormatter.format(d),
      tooltipHeader: YearMonthFormatter.format(d),
    };
  });

// FOR GOVCHECK DATA:
// turns `data: {key: value, ...}` to `data: {key: {value: value}, ...}`
// as we already have for document reading step
export function normalizeCURPData(identity) {
  if (!identity._embedded || !identity._embedded.verification) return identity;
  return {
    ...identity,
    _embedded: {
      ...identity._embedded,
      verification: {
        ...identity._embedded.verification,
        documents: identity._embedded.verification.documents.map((doc) => ({
          ...doc,
          steps: doc.steps.map((step) => ({
            ...step,
            data:
              step.data && step.id === 'mexican-curp-validation'
                ? fromPairs(toPairs(step.data).map(([key, value]) => [key, { value }]))
                : step.data,
          })),
        })),
      },
    },
  };
}
