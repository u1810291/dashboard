import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { PayrollAccountDataVerification } from 'apps/PayrollAccountData';
import { useStyles } from './VerificationPayrollAccountDataCheck.styles';

export function VerificationPayrollAccountDataCheck({ data }) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2}>
          <Typography className={classes.title} variant="subtitle2">{intl.formatMessage({ id: 'PayrollAccountData.title' })}</Typography>
        </Box>
        <PayrollAccountDataVerification data={data} />
      </Box>
    </Paper>
  );
}
