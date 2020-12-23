import { StubBarColor, StubTickColor } from 'apps/analytics/models/Metrics.model';
import { ChartTooltip } from 'components/chart-tooltip/ChartTooltip';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { ChartBar } from '../../../ui/components/ChartBar/ChartBar';
import { useStyles } from './ChartHorizontal.styles';

export function ChartHorizontal({ data, stub }) {
  const intl = useIntl();
  const classes = useStyles();
  const [activeBar, setActiveBar] = useState(null);

  function handleEnter(payload) {
    setActiveBar(payload);
  }

  function handleOut() {
    setActiveBar(null);
  }

  const isNoData = data.every((item) => item.value === 0);

  const stubChart = [
    <div className={classes.noDataLabel} key="stubLabel">
      {intl.formatMessage({ id: 'fragments.home.verification.statistic.noData' })}
    </div>,
    <ResponsiveContainer key="stubChart" width="100%" height={220} className={classes.chart}>
      <BarChart key="stub" data={stub} className="custom-tooltip" barSize={10}>
        <Bar
          isAnimationActive={false}
          dataKey="value"
          shape={<ChartBar fillBar={StubBarColor} fillBgBar="#EDF2FD" />}
        />
        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          tick={{ fill: StubTickColor }}
        />
      </BarChart>
    </ResponsiveContainer>,
  ];

  const workChart = (
    <ResponsiveContainer width="100%" height={220} className={classes.chart}>
      <BarChart data={data} className="custom-tooltip" barSize={10}>
        <Bar
          dataKey="value"
          onMouseEnter={handleEnter}
          onMouseLeave={handleOut}
          shape={<ChartBar fillBar="#507DED" fillBgBar="#EDF2FD" />}
        />
        <XAxis dataKey="label" axisLine={false} tickLine={false} tickMargin={10} tick={{ fill: '#232939' }} />
        <Tooltip content={<ChartTooltip external={activeBar} />} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );

  return isNoData
    ? stubChart
    : workChart;
}
