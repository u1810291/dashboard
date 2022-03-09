import { Box } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './GovCheckDependsIssue.module';

export function GovCheckDependsIssue() {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Box className={classes.badge}>
      {intl.formatMessage({ id: 'GovernmentCheck.issues.description' })}
    </Box>
  );
}
