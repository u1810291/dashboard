import { MenuItem, Select } from '@material-ui/core';
import { Card, Content, Items } from 'components';
import { Chart, VerificationsStats, VerificationsTotal } from 'fragments';
import { formatHour, formatWeekDay } from 'lib/date';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { getMerchantStatistic, getMerchantStatisticFilter } from 'state/merchant/merchant.actions';
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
  const [filter, setFilter] = useState('currentWeek');
  const intl = useIntl();
  const [statistic, setStatistic] = useState({});
  const [chartData, setChartData] = useState([]);
  const [byCountry, setByCountry] = useState([]);
  const [byDateOfWeek, setByDateOfWeek] = useState([]);
  const [byHour, setByHour] = useState([]);

  const token = useSelector(({ auth = {} }) => auth.token);
  const displayName = useSelector(({ merchant = {} }) => merchant.displayName);
  const dispatch = useDispatch();
  const countriesList = useSelector(({ countries }) => countries.countries);

  useEffect(() => {
    dispatch(getMerchantStatistic(token)).then((response) => {
      setStatistic(response.data);
    });
  }, [token, dispatch]);

  useEffect(() => {
    dispatch(getMerchantStatisticFilter(token, filter)).then(({ data }) => {
      const countryData = (data.byCountry || []).map((item) => ({
        label: getCountry(countriesList, item.documentCountry, intl),
        value: item.count,
      }));
      setByCountry(countryData);

      const hourData = (data.byHour || [])
        .map((item) => {
          const label = formatHour(item.hour);
          return {
            label,
            value: item.count,
            tooltip: `${label}\n${item.count} verif.`,
          };
        })
        .sort((a, b) => a.label - b.label);
      setByHour(hourData);

      const weekData = (data.byDayOfWeek || [])
        .map((item) => ({
          label: formatWeekDay(item.dayOfWeek),
          value: item.count,
          tooltip: `${item.count} verif.`,
        }))
        .sort((a, b) => a.label - b.label);
      setByDateOfWeek(weekData);

      const dateData = (data.byDate || []).map((item) => ({
        label: item.date,
        value: item.count,
      }));
      setChartData(dateData);
    });
  }, [token, filter, countriesList, dispatch, intl]);

  function handleSelectChange(e) {
    setFilter(e.target.value);
  }

  return (
    <Content>
      <Items gap="2" templateColumns="repeat(3, 1fr)" flow="row" align="stretch">
        <Card className={CSS.header}>
          <Items flow="column" gap="2" justifyContent="space-between" align="center">
            <h2>{displayName}</h2>
            <Select onChange={handleSelectChange} value={filter}>
              <MenuItem color="primary" value="days30">
                {intl.formatMessage({ id: 'fragments.home.verification.filters.days30' })}
              </MenuItem>
              <MenuItem color="primary" value="currentMonth">
                {intl.formatMessage({ id: 'fragments.home.verification.filters.month' })}
              </MenuItem>
              <MenuItem color="primary" value="currentWeek">
                {intl.formatMessage({ id: 'fragments.home.verification.filters.week' })}
              </MenuItem>
            </Select>
          </Items>
        </Card>
        <VerificationsTotal statistic={statistic} />
        <Chart className={CSS.graph} data={chartData} />
        <VerificationsStats
          data={byCountry}
          title={intl.formatMessage({ id: 'fragments.home.verification.statistic.title.byCountry' })}
          layout="vertical"
        />
        <VerificationsStats
          data={byHour}
          title={intl.formatMessage({ id: 'fragments.home.verification.statistic.title.byTime' })}
        />
        <VerificationsStats
          data={byDateOfWeek}
          title={intl.formatMessage({ id: 'fragments.home.verification.statistic.title.byDay' })}
        />
      </Items>
    </Content>
  );
}
