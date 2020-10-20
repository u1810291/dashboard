import { useIntl } from 'react-intl';
import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from './VerificationFlow.styles';

export function VerificationFlow({ flowId }) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Box mb={2}>
      <Typography className={classes.data} variant="subtitle2" gutterBottom>
        {flowId}
      </Typography>
      <Typography className={classes.title} variant="body1">
        {intl.formatMessage({ id: 'identity.summary.flow' })}
      </Typography>
    </Box>
  );
}
