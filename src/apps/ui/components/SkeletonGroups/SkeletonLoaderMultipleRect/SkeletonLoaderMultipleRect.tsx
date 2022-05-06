import React from 'react';
import { Grid } from '@material-ui/core';
import { SkeletonLoader } from 'apps/ui';

export function SkeletonLoaderMultipleRect({ amount }: { amount: number }) {
  return (
    <Grid container spacing={1} direction="column">
      {Array.from({ length: amount }, (_, index) => (
        <Grid item key={index}>
          <SkeletonLoader animation="wave" variant="rect" width="100%" height={40} />
        </Grid>
      ))}
    </Grid>
  );
}
