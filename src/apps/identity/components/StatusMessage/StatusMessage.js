import React from 'react';
import { useIntl } from 'react-intl';
import { Typography } from '@material-ui/core';
import { useStatusColors } from '../StatusColors.styles';

export function StatusMessage({ status, error }) {
  const intl = useIntl();
  const classes = useStatusColors();

  let message = '';

  if (status === 'success') {
    message = intl.formatMessage({ id: 'SecurityCheckStep.success' });
  }
  if (status === 'failure') {
    message = intl.formatMessage({
      id: `SecurityCheckStep.${error.code}`,
      defaultMessage: intl.formatMessage({ id: 'SecurityCheckStep.failure' }),
    });
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
