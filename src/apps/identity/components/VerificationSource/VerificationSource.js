import { useIntl } from 'react-intl';
import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from './VerificationSource.styles';
import { QATags } from '../../../../models/QA.model';

export function VerificationSource({ platformType }) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Box mb={2}>
      <Typography className={classes.data} variant="subtitle2" gutterBottom data-qa={QATags.Verification.Source}>
        {intl.formatMessage({ id: `identity.summary.source.${platformType}` })}
      </Typography>
      <Typography className={classes.title} variant="body1">
        {intl.formatMessage({ id: 'identity.summary.source.title' })}
      </Typography>
    </Box>
  );
}
