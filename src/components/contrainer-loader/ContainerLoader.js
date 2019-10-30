import { Grid } from '@material-ui/core';
import { useStyles } from 'components/contrainer-loader/ContainerLoader.styles';
import React from 'react';
import { FiLoader } from 'react-icons/fi';

export function ContainerLoader() {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" justify="center" className={classes.root}>
      <FiLoader className={classes.icon} />
    </Grid>
  );
}
