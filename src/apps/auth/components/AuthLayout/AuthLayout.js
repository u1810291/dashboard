import { Box } from '@material-ui/core';
import React from 'react';
import { useStyles } from './AuthLayout.styles';

export function AuthLayout({ children }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {children}
    </Box>
  );
}
