import { Box, Paper, Typography } from '@material-ui/core';
import { StubBarColor, StubTickColor } from 'apps/analytics/models/Metrics.model';
import { DateFormat, formatDate } from 'lib/date';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useStyles } from './Chart.styles';
import { ChartDot } from './ChartDot';
import { TakeOutTooltipContentPropsHelper } from './TakeOutTooltipContentPropsHelper';
import { appPalette } from '../../../theme/app.palette';

function tickFormat(value) {
  return formatDate(value, DateFormat.MonthDate);
}

export function Chart({ data, stub, isLoaded, isLoading, ...props }) {
  const intl = useIntl();
  const classes = useStyles();
  const isNoData = data.every((item) => item.value === 0);
  const [tooltipValue, setTooltipValue] = useState(0);

  const workChart = (
    <ResponsiveContainer width="100%" height={300} className={[classes.chart, classes.chartWork]}>
      <LineChart data={data} margin={{ top: 50, right: 30, left: -10 }}>
        <CartesianGrid
          vertical={false}
          strokeDasharray="10 10"
          stroke={appPalette.black7}
        />
        <XAxis
          dataKey="label"
          tickFormatter={tickFormat}
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          tick={{ fill: appPalette.black75 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          tick={{ fill: appPalette.black75 }}
        />
        <Line
          stroke={appPalette.lightblue}
          strokeWidth={2}
          connectNulls
          type="monotone"
          dataKey="value"
          dot={false}
          name={intl.formatMessage({ id: 'Chart.value' })}
          activeDot={<ChartDot tooltipValue={tooltipValue} />}
        />
        <Tooltip content={<TakeOutTooltipContentPropsHelper setTooltipValue={setTooltipValue} />} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );

  const stubChart = [
    <div key="stubLabel" className={classes.noDataLabel}>
      {intl.formatMessage({ id: 'fragments.home.verification.statistic.noData' })}
    </div>,
    <ResponsiveContainer key="stubChart" width="100%" height={300} className={classes.chart}>
      <LineChart data={stub} margin={{ top: 10, right: 10, left: -10 }}>
        <CartesianGrid
          vertical={false}
          strokeDasharray="10 10"
          stroke={appPalette.black7}
        />
        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          tick={{ fill: StubTickColor }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: StubTickColor }}
          tickMargin={10}
        />
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
    <Paper {...props}>
      <Box p={2}>
        <Box mb={2} color="common.black75">
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: 'fragments.home.verification.card.amount' })}
          </Typography>
        </Box>
        <Box className={classes.chartWrapper}>
          {chart}
        </Box>
      </Box>
    </Paper>
  );
}
