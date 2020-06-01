import { StubBarColor, StubTickColor } from 'apps/metrics/Metrics.model';
import { ChartBar } from 'components/chart-bar/chart-bar';
import { ChartTooltip } from 'components/chart-tooltip/ChartTooltip';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
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
    <ResponsiveContainer key="stubChart" width="100%" height={200}>
      <BarChart key="stub" data={stub} className="custom-tooltip">
        <Bar
          isAnimationActive={false}
          dataKey="value"
          fill={StubBarColor}
          shape={<ChartBar />}
        />
        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          tick={{ fill: StubTickColor }}
        />
      </BarChart>
    </ResponsiveContainer>,
  ];

  const workChart = (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} className="custom-tooltip">
        <Bar
          dataKey="value"
          fill="#5c75ff"
          onMouseEnter={handleEnter}
          onMouseLeave={handleOut}
          shape={<ChartBar />}
        />
        <XAxis dataKey="label" axisLine={false} tickLine={false} />
        <Tooltip content={<ChartTooltip external={activeBar} />} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );

  return isNoData
    ? stubChart
    : workChart;
}
