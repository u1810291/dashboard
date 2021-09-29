import { Typography } from '@material-ui/core';
import { DateFormat, utcToLocalFormat } from 'lib/date';
import { analyticsDatePickerRanges, FilterRangeTypes, identifyRange } from 'models/Filter.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectMerchantFlowsModel, selectMerchantCreatedAt } from 'state/merchant/merchant.selectors';
import { DEFAULT_FLOW } from '../../models/MetricFilter.model';
import { selectFilter } from '../../state/Analytics.selectors';

export function DynamicHeader({ flows = [] }) {
  const intl = useIntl();
  const metricsFilter = useSelector(selectFilter);
  const [flowName, setFlowName] = useState(intl.formatMessage({ id: 'VerificationFilter.flows.allFlows' }));
  const merchantFlowList = useSelector(selectMerchantFlowsModel);
  const registrationDate = useSelector(selectMerchantCreatedAt);
  const [period, setPeriod] = useState(FilterRangeTypes.All);

  useEffect(() => {
    const start = metricsFilter['dateCreated[start]'];
    const end = metricsFilter['dateCreated[end]'];
    if (start || end) {
      setPeriod(identifyRange(start, end, registrationDate, analyticsDatePickerRanges));
    }
  }, [metricsFilter, registrationDate]);

  useEffect(() => {
    if (flows.includes(DEFAULT_FLOW)) {
      setFlowName(intl.formatMessage({ id: 'VerificationFilter.flows.allFlows' }));
    } else
    if (flows.length > 1) {
      setFlowName(intl.formatMessage({ id: 'Analytics.header.flowsCount' }, { count: flows.length }));
    } else
    if (flows.length === 1) {
      setFlowName(merchantFlowList.value.find((item) => item.id === flows[0])?.name);
    }
  }, [flows, intl, merchantFlowList.value]);

  const getFormattedPeriodString = useCallback(() => {
    const startDate = utcToLocalFormat(metricsFilter['dateCreated[start]'], DateFormat.MonthShort) ?? '';
    const endDate = utcToLocalFormat(metricsFilter['dateCreated[end]'], DateFormat.MonthShort) ?? '';
    return `${startDate} - ${endDate}`;
  }, [metricsFilter]);

  return (
    <Typography variant="h3">
      {period ? `${intl.formatMessage({ id: `DateRange.${period}` })} ` : `${getFormattedPeriodString()} `}
      /
      {` ${flowName}`}
    </Typography>
  );
}
