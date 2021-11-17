import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { BankAccountDataVerification } from 'apps/BankAccountData';
import { useStyles } from './VerificationBankAccountDataCheck.styles';

export function VerificationBankAccountDataCheck({ data }) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2}>
          <Typography className={classes.title} variant="subtitle2">{intl.formatMessage({ id: 'BankAccountData.title' })}</Typography>
        </Box>
        <BankAccountDataVerification data={data} />
      </Box>
    </Paper>
  );
}
