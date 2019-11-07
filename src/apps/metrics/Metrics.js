import { MenuItem, Select } from '@material-ui/core';
import { DEFAULT_FILTER, filterMap } from 'apps/metrics/filter.model';
import { byCountryStub, byDateOfWeekStub, byDateStub, byHourStub } from 'apps/metrics/Metrics.model';
import { Card, Content, Items } from 'components';
import { Chart, VerificationsStats, VerificationsTotal } from 'fragments';
import { formatHour, formatWeekDay } from 'lib/date';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { selectMerchantName } from 'state/merchant/merchant.selectors';
import { getMetrics, getStatistics } from 'state/metrics/metrics.actions';
import { selectMetrics, selectStatistics } from 'state/metrics/metrics.selectors';
import CSS from './Metrics.module.scss';

const OTHER_COUNTRIES = 'otherCountries';

function getCountry(list, id, intl) {
  if (!id) {
    return intl.formatMessage({ id: 'Countries.unknownCountry' });
  }
  if (id === OTHER_COUNTRIES) {
    return intl.formatMessage({ id: 'Countries.otherCountries' });
  }
  const country = list.find((item) => item.id === id);
  return country ? country.name : id;
}

export default function Metrics() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [metrics] = useSelector(selectMetrics);
  const name = useSelector(selectMerchantName);
  const countriesList = useSelector(({ countries }) => countries.countries);
  const [statistics, isLoading, isLoaded] = useSelector(selectStatistics);

  const [filter, setFilter] = useState(DEFAULT_FILTER);

  const byCountry = statistics.byCountry.map((item) => ({
    label: getCountry(countriesList, item.documentCountry, intl),
    value: item.count,
  }));

  const byHour = statistics.byHour
    .map((item) => {
      const label = formatHour(item.hour);
      return {
        label,
        value: item.count,
        tooltip: `${label}\n${item.count} verif.`,
      };
    })
    .sort((a, b) => a.label - b.label);

  const byDateOfWeek = statistics.byDayOfWeek
    .map((item) => ({
      label: formatWeekDay(item.dayOfWeek),
      value: item.count,
      tooltip: `${item.count} verif.`,
    }))
    .sort((a, b) => a.label - b.label);

  const byDate = statistics.byDate.map((item) => ({
    label: item.date,
    value: item.count,
  }));

  useEffect(() => {
    dispatch(getMetrics());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getStatistics(filter));
  }, [filter, dispatch]);

  function handleSelectChange(e) {
    setFilter(e.target.value);
  }

  return (
    <Content>
      <Items gap="2" templateColumns="repeat(3, 1fr)" flow="row" align="stretch">
        <Card className={CSS.header}>
          <Items flow="column" gap="2" justifyContent="space-between" align="center">
            <h2>{name}</h2>
            <Select onChange={handleSelectChange} value={filter}>
              {filterMap.map((item) => (
                <MenuItem key={item.id} color="primary" value={item.id}>
                  {intl.formatMessage({ id: item.label })}
                </MenuItem>
              ))}
            </Select>
          </Items>
        </Card>
        <VerificationsTotal statistic={metrics} />
        <Chart
          className={CSS.graph}
          data={byDate}
          isLoading={isLoading}
          isLoaded={isLoaded}
          stub={byDateStub}
        />
        <VerificationsStats
          data={byCountry}
          title={intl.formatMessage({ id: 'fragments.home.verification.statistic.title.byCountry' })}
          layout="vertical"
          isLoading={isLoading}
          isLoaded={isLoaded}
          stub={byCountryStub}
        />
        <VerificationsStats
          data={byHour}
          title={intl.formatMessage({ id: 'fragments.home.verification.statistic.title.byTime' })}
          isLoading={isLoading}
          isLoaded={isLoaded}
          stub={byHourStub}
        />
        <VerificationsStats
          data={byDateOfWeek}
          title={intl.formatMessage({ id: 'fragments.home.verification.statistic.title.byDay' })}
          isLoading={isLoading}
          isLoaded={isLoaded}
          stub={byDateOfWeekStub}
        />
      </Items>
    </Content>
  );
}
