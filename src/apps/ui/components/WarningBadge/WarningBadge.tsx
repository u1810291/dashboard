import React from 'react';
import { Box } from '@material-ui/core';
import { FiAlertCircle } from 'react-icons/fi';
import { useStyles } from './WarningBadge.styles';

export function WarningBadge() {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper} bgcolor="common.yellow" color="common.black90" fontSize={17}>
      <FiAlertCircle />
    </Box>
  );
}
