import React from 'react';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import { useStyles } from './BasicWatchlistSkeleton.styles';

export function BasicWatchlistSkeleton() {
  const classes = useStyles();
  return (
    <Grid container spacing={1} direction="column">
      <Grid item>
        <Skeleton variant="rect" width="100%" height={40} className={classes.skeleton} />
      </Grid>
      <Grid item>
        <Skeleton variant="rect" width="100%" height={40} className={classes.skeleton} />
      </Grid>
    </Grid>
  );
}
