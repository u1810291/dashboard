import React from 'react';
import clsx from 'clsx';
import { Paper } from '@material-ui/core';
import { useStyles } from './CheckBarIcon.styles';

export function CheckBarIcon({ icon, status }) {
  const classes = useStyles();

  return (
    <Paper variant="outlined" elevation={0} className={clsx(classes.icon, classes[`${status}Border`])}>
      {icon}
    </Paper>
  );
}
