import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { useStyles } from './VerificationCheckCard.styles';

export function VerificationCheckCard({ children, titleComponent, bottomComponent }) {
  const classes = useStyles();

  return (
    <Box p={2} className={classes.check}>
      <Box mb={2}>
        {titleComponent}
        <Grid container justify="center" alignItems="center" className={classes.wrapper}>
          {children}
        </Grid>
      </Box>
      <Box>{bottomComponent}</Box>
    </Box>
  );
}
