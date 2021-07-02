import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { Box, Grid } from '@material-ui/core';
import { useStyles } from './ProductCheckStatus.styles';

export function ProductCheckStatus({ disabled = false, text }: {
  disabled?: boolean;
  text: string;
}) {
  const classes = useStyles({ disabled });

  return (
    <Grid container wrap="nowrap" alignItems="flex-start">
      <FiCheckCircle fontSize={17} className={classes.icon} />
      <Box ml={1} className={classes.text}>{text}</Box>
    </Grid>
  );
}
