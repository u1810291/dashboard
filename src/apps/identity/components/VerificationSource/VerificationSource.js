import { useIntl } from 'react-intl';
import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from './VerificationSource.styles';

// next feature
export function VerificationSource({ source }) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Box mb={2}>
      <Typography className={classes.data} variant="subtitle2" gutterBottom>
        {source}
      </Typography>
      <Typography className={classes.title} variant="body1">
        {intl.formatMessage({ id: 'identity.summary.source' })}
      </Typography>
    </Box>
  );
}
