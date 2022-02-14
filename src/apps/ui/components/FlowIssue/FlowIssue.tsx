import Box from '@material-ui/core/Box';
import React from 'react';
import { useFormatMessage } from 'apps/intl';
import { QATags } from 'models/QA.model';
import { useStyles } from './FlowIssue.styles';

export function FlowIssue(message: string) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();

  return (
    <Box className={classes.badge} data-qa={QATags.Flows.FlowIssueNotification}>
      {formatMessage(message)}
    </Box>
  );
}
