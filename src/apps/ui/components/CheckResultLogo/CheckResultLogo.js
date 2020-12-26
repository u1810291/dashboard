import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './CheckResultLogo.styles';

export function CheckResultLogo({ status, type = 'document' }) {
  const intl = useIntl();
  const classes = useStyles({ status, type });

  return (
    <Box className={classes.result} mb={2}>
      <Typography className={classes.resultTitle} variant="h4" gutterBottom>
        {intl.formatMessage({ id: `Checks.result.${type}.${status}.title` })}
      </Typography>
      <Typography className={classes.resultText} variant="body1" gutterBottom>
        {intl.formatMessage({ id: `Checks.result.${type}.${status}.description` })}
      </Typography>
    </Box>
  );
}
