import { Box } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './BankAccountDataCountriesNotSpecified.styles';

export function BankAccountDataCountriesNotSpecified() {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Box className={classes.badge}>
      {intl.formatMessage({ id: 'BankAccountData.issues.isCountriesNotSpecified.description' })}
      <img src="https://i.imgflip.com/646fwv.jpg" alt="samuel" />
    </Box>
  );
}
