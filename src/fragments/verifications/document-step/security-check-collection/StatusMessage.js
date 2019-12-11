import React from 'react';
import { Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';

const mapColor = {
  success: 'textSecondary',
  failure: 'error',
  checking: 'textPrimary',
};

export function StatusMessage({ status, error }) {
  const intl = useIntl();

  let message = '';

  if (status === 'success') {
    message = intl.formatMessage({ id: 'SecurityCheckStep.success' });
  }
  if (status === 'failure') {
    message = intl.formatMessage({ id: `SecurityCheckStep.${error.code}` });
  }

  return (
    <Typography component="span" color={mapColor[status]}>
      {message}
    </Typography>
  );
}
