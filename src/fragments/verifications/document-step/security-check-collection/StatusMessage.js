import React from 'react';
import { useIntl } from 'react-intl';
import { Typography } from '@material-ui/core';
import { useStyles } from './StatusMessage.styles';

export function StatusMessage({ status, error }) {
  const intl = useIntl();
  const classes = useStyles();

  let message = '';

  if (status === 'success') {
    message = intl.formatMessage({ id: 'SecurityCheckStep.success' });
  }
  if (status === 'failure') {
    message = intl.formatMessage({ id: `SecurityCheckStep.${error.code}` });
  }
  if (status === 'checking') {
    message = intl.formatMessage({ id: 'SecurityCheckStep.checking' });
  }

  return (
    <Typography component="span" className={classes[status]}>
      {message}
    </Typography>
  );
}
