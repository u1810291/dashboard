import { Box, CircularProgress } from '@material-ui/core';
import Card from 'components/card';
import React from 'react';
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
        {!isLoaded || isLoading
          ? (
            <Box minHeight={200} display="flex" alignItems="center">
              <CircularProgress color="primary" />
            </Box>
          )
          : chart}
      </Card>
    </div>
  );
}
