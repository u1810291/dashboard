import React from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './CheckBarIcon.styles';

export function CheckBarIcon({ icon }) {
  const classes = useStyles();

  return (
    <Box className={classes.icon}>
      {icon}
    </Box>
  );
}
