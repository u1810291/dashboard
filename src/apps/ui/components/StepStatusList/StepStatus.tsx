import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { Box, Grid } from '@material-ui/core';
import { useStyles } from './StepStatus.styles';

interface StepStatusProps {
  disabled?: boolean;
  text: string;
}

export function StepStatus({ disabled, text }: StepStatusProps) {
  const classes = useStyles({ disabled });

  return (
    <Grid container wrap="nowrap" alignItems="flex-start">
      <FiCheckCircle fontSize={17} className={classes.icon} />
      <Box ml={1} className={classes.text}>{text}</Box>
    </Grid>
  );
}

StepStatus.defaultProps = {
  disabled: false,
};
