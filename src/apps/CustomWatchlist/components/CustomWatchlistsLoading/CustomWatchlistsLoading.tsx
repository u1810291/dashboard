import React from 'react';
import { Grid } from '@material-ui/core';
import { SkeletonThreeRectTwoCircle } from 'apps/ui';

export function CustomWatchlistsLoading() {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <SkeletonThreeRectTwoCircle />
      </Grid>
      <Grid item>
        <SkeletonThreeRectTwoCircle />
      </Grid>
      <Grid item>
        <SkeletonThreeRectTwoCircle />
      </Grid>
    </Grid>
  );
}
