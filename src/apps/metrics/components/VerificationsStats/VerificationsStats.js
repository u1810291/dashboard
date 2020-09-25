import React from 'react';
import { Box, Paper } from '@material-ui/core';
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
    <div className={classes.root}>
      <div className={classes.title}>{title}</div>
      <Paper className={classes.paper}>
        <Box p={2}>
          {!isLoaded || isLoading ? <PageLoader /> : chart}
        </Box>
      </Paper>
    </div>
  );
}
