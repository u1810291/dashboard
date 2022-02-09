import React from 'react';
import Box from '@material-ui/core/Box';
import { useFormatMessage } from 'apps/intl';
import { useStyles } from './FacematchVerificationIssues.styles';

export function FacematchVerificationIssues({ textId }) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();

  return (
    <Box className={classes.badge}>
      {formatMessage(textId)}
    </Box>
  );
}
