import { Typography } from '@material-ui/core';
import { selectFilter } from 'apps/analytics/state/metrics.selectors';
import { selectUserRegistrationDate } from 'apps/user/state/user.selectors';
import { DateFormat, formatDate } from 'lib/date';
import { allUTCRanges, FilterRangeTypes, identifyRange } from 'models/Filter.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { DEFAULT_FLOW } from '../../models/MetricFilter.model';

export function DynamicHeader({ flows = [] }) {
  const intl = useIntl();
  const metricsFilter = useSelector(selectFilter);
  const [flowName, setFlowName] = useState(intl.formatMessage({ id: 'VerificationFilter.flows.allFlows' }));
  const merchantFlowList = useSelector(selectMerchantFlowsModel);
  const selectRegisterDate = useSelector(selectUserRegistrationDate);
  const [period, setPeriod] = useState(FilterRangeTypes.All);

  useEffect(() => {
    const start = metricsFilter['dateCreated[start]'];
    const end = metricsFilter['dateCreated[end]'];
    if (start || end) {
      setPeriod(identifyRange(start, end, selectRegisterDate, allUTCRanges));
    }
  }, [metricsFilter, selectRegisterDate]);

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
    const startDate = formatDate(metricsFilter['dateCreated[start]'], DateFormat.MonthShort) ?? '';
    const endDate = formatDate(metricsFilter['dateCreated[end]'], DateFormat.MonthShort) ?? '';
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
