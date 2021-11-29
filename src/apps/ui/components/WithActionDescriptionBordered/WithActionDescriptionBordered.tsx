import React from 'react';
import classnames from 'classnames';
import { Grid } from '@material-ui/core';
import { useStyles } from './WithActionDescriptionBordered.styles';

export const WithActionDescriptionBordered = ({
  children,
  description,
  error,
}: {
  children: React.ReactNode;
  description: string;
  error?: string;
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classnames(classes.wrapp, { [classes.wrappError]: !!error })} justifyContent="space-between" alignItems="center">
        <Grid item className={classes.description} title={description}>{description}</Grid>
        <Grid item>
          {children}
        </Grid>
      </Grid>
      {error && <span className={classes.error}>{error}</span>}
    </>
  );
};
