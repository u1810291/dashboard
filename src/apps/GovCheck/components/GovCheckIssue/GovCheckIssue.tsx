import { Box } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './GovCheckIssue.module';

export function GovCheckIssue() {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Box className={classes.badge}>
      {intl.formatMessage({ id: 'GovernmentCheck.issues.noConfig.description' })}
    </Box>
  );
}
