import React from 'react';
import { Grid } from '@material-ui/core';
import { Skeleton as SkeletonMaterial } from '@material-ui/lab';
import { useStyles } from './CustomWatchlistItemSettings.styles';

export const Skeleton = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.skeletonWrap} justifyContent="space-between">
      <Grid container item direction="column" spacing={1} xs={8}>
        <Grid item>
          <SkeletonMaterial variant="rect" width="50%" height={15} />
        </Grid>
        <Grid item>
          <SkeletonMaterial variant="rect" width="100%" height={15} />
        </Grid>
        <Grid item>
          <SkeletonMaterial variant="rect" width="100%" height={15} />
        </Grid>
      </Grid>
      <Grid container item spacing={1} xs={4}>
        <Grid item>
          <SkeletonMaterial variant="circle" width={25} height={25} />
        </Grid>
        <Grid item>
          <SkeletonMaterial variant="circle" width={25} height={25} />
        </Grid>
      </Grid>
    </Grid>
  );
};
