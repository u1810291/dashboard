import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { FiActivity, FiFileText, FiCheckCircle, FiSmartphone } from 'react-icons/fi';
import { VerificationSummaryTitleTypes } from 'models/Identity.model';
import { useStyles } from './VerificationSummaryTitle.styles';

const icons = {
  biometric: FiActivity,
  document: FiFileText,
  additional: FiCheckCircle,
  device: FiSmartphone,
};

export function VerificationSummaryTitle({ status, children, type = VerificationSummaryTitleTypes.document, isNoIcon = false }) {
  const classes = useStyles({ status });
  const Icon = icons[type];

  return (
    <Grid container alignItems="center" justify="center" wrap="nowrap" className={classes.titleWrapper}>
      {!isNoIcon && <Icon className={classes.titleIcon} />}
      <Typography className={classes.title} variant="subtitle2">
        {children}
      </Typography>
    </Grid>
  );
}
