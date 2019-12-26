import { Box } from '@material-ui/core';
import React from 'react';
import { useStyles } from './Placeholder.styles';

export function Placeholder({ width = 75 }) {
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      width={`${width}%`}
    />
  );
}
