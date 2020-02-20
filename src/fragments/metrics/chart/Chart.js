import { Box } from '@material-ui/core';
import { StubBarColor, StubTickColor } from 'apps/metrics/Metrics.model';
import classNames from 'classnames';
import { Card, Text } from 'components';
import { Spinner } from 'apps/layout';
import { formatDate, DateFormat } from 'lib/date';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CSS from './Chart.module.scss';

function tickFormat(value) {
  return formatDate(value, DateFormat.MonthDate);
}

export default function Chart({ data, stub, isLoaded, isLoading, ...props }) {
  const intl = useIntl();
  const isNoData = data.every((item) => item.value === 0);

  const workChart = (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis
          dataKey="label"
          tickFormatter={tickFormat}
          padding={{ top: 5 }}
        />
        <YAxis />
        <Tooltip hide />
        <Line
          stroke="#5c75ff"
          strokeWidth={2}
          connectNulls
          type="monotone"
          dataKey="value"
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const stubChart = [
    <div key="stubLabel" className={CSS.noDataLabel}>{intl.formatMessage({ id: 'fragments.home.verification.statistic.noData' })}</div>,
    <ResponsiveContainer key="stubChart" width="100%" height={300}>
      <LineChart data={stub}>
        <XAxis
          dataKey="label"
          padding={{ top: 5 }}
          tick={{ fill: StubTickColor }}
          stroke={StubTickColor}
        />
        <YAxis stroke={StubTickColor} tick={{ fill: StubTickColor }} />
        <Line
          isAnimationActive={false}
          stroke={StubBarColor}
          strokeWidth={2}
          connectNulls
          type="monotone"
          dataKey="value"
        />
      </LineChart>
    </ResponsiveContainer>,
  ];

  const chart = isNoData ? stubChart : workChart;

  return (
    <Card {...props}>
      <Text className={classNames([CSS.text, CSS.amountText])}>
        <FormattedMessage id="fragments.home.verification.card.amount" />
      </Text>
      {!isLoaded || isLoading
        ? (
          <Box minHeight={300} display="flex" alignItems="center">
            <Spinner size="large" />
          </Box>
        )
        : (
          <Box position="relative">
            {chart}
          </Box>
        )}
    </Card>
  );
}
