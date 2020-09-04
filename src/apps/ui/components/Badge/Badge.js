import React from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './Badge.styles';

export function Badge({ children }) {
  const classes = useStyles();
  return (
    <Box className={classes.badge}>
      {children}
    </Box>
  );
}
