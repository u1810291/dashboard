import { Box } from '@material-ui/core';
import Card from 'components/card';
import { Spinner } from 'apps/layout';
import React from 'react';
import { ChartHorizontal } from '../ChartHorizontal';
import { ChartVertical } from '../ChartVertical';
import CSS from './VerificationsStats.module.scss';

/**
 * data = {
 *   label: string
 *   value: number
 *   tooltip?: string
 * }
 */
export function VerificationsStats({ data, title, isLoading, isLoaded, stub, layout = 'horizontal' }) {
  const chart = layout === 'horizontal'
    ? <ChartHorizontal data={data} stub={stub} />
    : <ChartVertical data={data} stub={stub} />;

  return (
    <div>
      <div className={CSS.title}>{title}</div>
      <Card className={CSS.card}>
        {!isLoaded || isLoading
          ? (
            <Box minHeight={200} display="flex" alignItems="center">
              <Spinner size="large" />
            </Box>
          )
          : chart}
      </Card>
    </div>
  );
}
