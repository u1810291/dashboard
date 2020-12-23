import React from 'react';
import { Box } from '@material-ui/core';
import { PageLoader } from 'apps/layout';
import { ChartHorizontal } from '../ChartHorizontal/ChartHorizontal';
import { ChartVertical } from '../ChartVertical/ChartVertical';

/**
 * data = {
 *   label: string
 *   value: number
 *   tooltip?: string
 * }
 */
export function VerificationsStats({
  data,
  isLoading,
  isLoaded,
  stub,
  layout = 'horizontal',
}) {
  const chart = layout === 'horizontal'
    ? <ChartHorizontal data={data} stub={stub} />
    : <ChartVertical data={data} stub={stub} />;

  return (
    <Box height="100%" position="relative">
      {!isLoaded || isLoading ? <PageLoader /> : chart}
    </Box>
  );
}
