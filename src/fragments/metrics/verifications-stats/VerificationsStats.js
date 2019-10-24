import Card from 'components/card';
import { ChartBar } from 'components/chart-bar/chart-bar';
import { ChartTooltip } from 'components/chart-tooltip/ChartTooltip';
import { ChartHorizontal } from 'fragments/metrics/chart-horizontal/ChartHorizontal';
import React, { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import CSS from './VerificationsStats.module.scss';

/**
 * data = {
 *   label: string
 *   value: number
 *   tooltip?: string
 * }
 */
export default function VerificationsStats({ data, title, layout = 'horizontal' }) {
  const [activeBar, setActiveBar] = useState(null);

  function handleEnter(payload) {
    setActiveBar(payload);
  }

  function handleOut() {
    setActiveBar(null);
  }

  return (
    <div>
      <div className={CSS.title}>{title}</div>
      <Card>
        {layout === 'horizontal' ? (
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
        ) : (
          <ChartHorizontal data={data} />
        )}
      </Card>
    </div>
  );
}
