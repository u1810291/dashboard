import { Box } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './ReverificationIssues.styles';

export function ReverificationIssues() {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Box className={classes.badge}>
      {intl.formatMessage({ id: 'ReVerification.card.issue.mobileNotSupported' })}
    </Box>
  );
}
