import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from './FakeInputs.styles';

export function FakeInput({ label, value }: { label: string; value: string }) {
  const classes = useStyles();

  return (
    <Grid container justifyContent="space-between" alignItems="center" direction="row" className={classes.input}>
      <Grid item><Typography variant="subtitle2">{label}</Typography></Grid>
      <Grid item><Typography variant="subtitle2" className={classes.colorBlue}>{value}</Typography></Grid>
    </Grid>
  );
}
