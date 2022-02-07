import Box from '@material-ui/core/Box';
import React from 'react';
import { useFormatMessage } from 'apps/intl';
import { useStyles } from './BankAccountDataCountriesNotSpecified.styles';

export function BankAccountDataCountriesNotSpecified() {
  const classes = useStyles();
  const formatMessage = useFormatMessage();

  return (
    <Box className={classes.badge}>
      {formatMessage('BankAccountData.issues.isCountriesNotSpecified.description')}
    </Box>
  );
}
