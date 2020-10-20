import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { FiActivity, FiFileText, FiCheckCircle } from 'react-icons/fi';
import { useStyles } from './VerificationSummaryTitle.styles';

const icons = {
  biometric: FiActivity,
  document: FiFileText,
  additional: FiCheckCircle,
};

export function VerificationSummaryTitle({ status, children, type = 'document' }) {
  const classes = useStyles({ status });
  const Icon = icons[type];

  return (
    <Grid container alignItems="center" justify="center" wrap="nowrap" className={classes.titleWrapper}>
      <Icon className={classes.titleIcon} />
      <Typography className={classes.title} variant="subtitle2">
        {children}
      </Typography>
    </Grid>
  );
}
