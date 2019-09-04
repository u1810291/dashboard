import {
  YEAR_MONTH_FORMATTER,
  YEAR_MONTH_SHORT_FORMATTER,
} from 'state/utils';
import { toPairs } from 'lodash';

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
      label: YEAR_MONTH_SHORT_FORMATTER.format(
        new Date(yearMonth.split('-')[0], Number(yearMonth.split('-')[1]) - 1),
      ),
      tooltipHeader: YEAR_MONTH_FORMATTER.format(
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
      label: YEAR_MONTH_SHORT_FORMATTER.format(d),
      tooltipHeader: YEAR_MONTH_FORMATTER.format(d),
    };
  });
