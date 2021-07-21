import { Box, Grid, Paper } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { useStyles } from '../Support/Support.styles';

export function DarkFaqSection({ children }: {children: ReactNode}) {
  const classes = useStyles();
  return (
    <Box p={2} className={classes.supportBox}>
      <Grid container direction="column" spacing={2}>
        <Paper elevation={0} className={classes.paper}>
          <Box display="flex" flexDirection="row" justifyContent="stretch" flexWrap="nowrap">
            {children}
          </Box>
        </Paper>
      </Grid>
    </Box>
  );
}
