import React from 'react';
import Card from 'components/card';
import { PageLoader } from 'apps/layout';
import { ChartHorizontal } from '../ChartHorizontal/ChartHorizontal';
import { ChartVertical } from '../ChartVertical/ChartVertical';
import { useStyles } from './VerificationsStats.styles';

/**
 * data = {
 *   label: string
 *   value: number
 *   tooltip?: string
 * }
 */
export function VerificationsStats({
  data,
  title,
  isLoading,
  isLoaded,
  stub,
  layout = 'horizontal',
}) {
  const classes = useStyles();
  const chart = layout === 'horizontal'
    ? <ChartHorizontal data={data} stub={stub} />
    : <ChartVertical data={data} stub={stub} />;

  return (
    <div>
      <div className={classes.title}>{title}</div>
      <Card className={classes.card}>
        {!isLoaded || isLoading ? <PageLoader /> : chart}
      </Card>
    </div>
  );
}
