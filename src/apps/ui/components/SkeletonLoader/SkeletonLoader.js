import React from 'react';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useStyles } from './SkeletonLoader.styles';

const widthValues = ['70%', '90%', '100%'];

export function SkeletonLoader({ variant, ...other }) {
  const width = variant === 'text' ? widthValues[Math.floor((Math.random() * widthValues.length))] : '100%';
  const classes = useStyles({ width });
  return (
    <Box className={classes.root}>
      <Skeleton variant={variant} {...other} />
    </Box>
  );
}
