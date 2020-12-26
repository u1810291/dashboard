import { Box } from '@material-ui/core';
import React from 'react';
import { useStyles } from './CheckBarIcon.styles';

export function CheckBarIcon({ icon }) {
  const classes = useStyles();

  return (
    <Box className={classes.icon}>
      {icon}
    </Box>
  );
}
