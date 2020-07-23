import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';
import { Box } from '@material-ui/core';
import { Card, Text } from 'components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { formatDate, DateFormat } from 'lib/date';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { StubBarColor, StubTickColor } from 'apps/metrics/models/Metrics.model';
import { useStyles } from './Chart.styles';

function tickFormat(value) {
  return formatDate(value, DateFormat.MonthDate);
}

export function Chart({ data, stub, isLoaded, isLoading, ...props }) {
  const intl = useIntl();
  const classes = useStyles();
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
          name={intl.formatMessage({ id: 'Chart.value' })}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const stubChart = [
    <div key="stubLabel" className={classes.noDataLabel}>
      {intl.formatMessage({ id: 'fragments.home.verification.statistic.noData' })}
    </div>,
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
      <Text className={clsx([classes.text, classes.amountText])}>
        {intl.formatMessage({ id: 'fragments.home.verification.card.amount' })}
      </Text>
      {!isLoaded || isLoading
        ? (
          <Box minHeight={300} display="flex" alignItems="center">
            <CircularProgress color="secondary" />
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
