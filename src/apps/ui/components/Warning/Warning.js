import { Box } from '@material-ui/core';
import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { useStyles } from './Warning.styles';

export function Warning({ label }) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.icon}>
        <FiAlertCircle size={24} />
      </Box>
      <Box className={classes.content}>
        {label}
      </Box>
    </Box>
  );
}
