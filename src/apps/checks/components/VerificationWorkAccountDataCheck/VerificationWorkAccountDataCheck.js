import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { WorkAccountDataVerification } from 'apps/WorkAccountData';
import { useStyles } from './VerificationWorkAccountDataCheck.styles';

export function VerificationWorkAccountDataCheck({ data }) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2}>
          <Typography className={classes.title} variant="subtitle2">{intl.formatMessage({ id: 'WorkAccountData.title' })}</Typography>
        </Box>
        <WorkAccountDataVerification data={data} />
      </Box>
    </Paper>
  );
}
