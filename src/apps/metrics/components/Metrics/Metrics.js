import { Box, MenuItem, Select } from '@material-ui/core';
import { Card, Content, Items } from 'components';
import { formatHour } from 'lib/date';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountriesList } from 'state/countries/countries.selectors';
import { selectMerchantFlowsModel, selectMerchantName } from 'state/merchant/merchant.selectors';
import { getMetrics, getStatistics } from 'state/metrics/metrics.actions';
import { selectMetrics, selectStatistics } from 'state/metrics/metrics.selectors';
import { DEFAULT_FLOW, DEFAULT_PERIOD, periodMap } from '../../models/MetricFilter.model';
import { byCountryStub, byDateOfWeekStubValues, byDateStub, byHourStub } from '../../models/Metrics.model';
import { Chart } from '../Chart/Chart';
import { VerificationsStats } from '../VerificationsStats/VerificationsStats';
import { VerificationsTotal } from '../VerificationsTotal/VerificationsTotal';
import { useStyles } from './Metrics.styles';

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

export function Metrics() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [metrics] = useSelector(selectMetrics);
  const name = useSelector(selectMerchantName);
  const countriesList = useSelector(selectCountriesList);
  const [statistics, isLoading, isLoaded] = useSelector(selectStatistics);
  const merchantFlowList = useSelector(selectMerchantFlowsModel);
  const [period, setPeriod] = useState(DEFAULT_PERIOD);
  const [flow, setFlow] = useState(DEFAULT_FLOW);

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
      label: intl.formatMessage({ id: `week.${item.dayOfWeek}` }),
      value: item.count,
      tooltip: `${item.count} verif.`,
    }))
    .sort((a, b) => a.label - b.label);

  const byDateOfWeekStub = byDateOfWeekStubValues.map((value, index) => ({
    label: intl.formatMessage({ id: `week.${index + 1}` }),
    value,
  }));

  const byDate = statistics.byDate.map((item) => ({
    label: item.date,
    value: item.count,
  }));

  useEffect(() => {
    dispatch(getMetrics());
  }, [dispatch]);

  useEffect(() => {
    const flowId = (flow === DEFAULT_FLOW ? undefined : flow);
    dispatch(getStatistics({ period, flowId }));
  }, [period, flow, dispatch]);

  function handleSelectChange(e) {
    setPeriod(e.target.value);
  }

  function handleSelectFlowChange(e) {
    setFlow(e.target.value);
  }

  return (
    <Content>
      <Items gap="2" templateColumns="repeat(3, 1fr)" flow="row" align="stretch">
        <Card className={classes.header}>
          <Items flow="column" gap="2" justifyContent="space-between" align="center">
            <h2>{name}</h2>
            <Box display="flex">
              <Box mr={2}>
                <Select onChange={handleSelectFlowChange} value={flow}>
                  <MenuItem value={DEFAULT_FLOW}>
                    <em>{intl.formatMessage({ id: 'VerificationFilter.flows.allFlows' })}</em>
                  </MenuItem>
                  {merchantFlowList.value.map((item) => (
                    <MenuItem key={item.id} color="primary" value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Select onChange={handleSelectChange} value={period}>
                {periodMap.map((item) => (
                  <MenuItem key={item.id} color="primary" value={item.id}>
                    {intl.formatMessage({ id: item.label })}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Items>
        </Card>
        <VerificationsTotal statistic={metrics} />
        <Chart
          className={classes.graph}
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
