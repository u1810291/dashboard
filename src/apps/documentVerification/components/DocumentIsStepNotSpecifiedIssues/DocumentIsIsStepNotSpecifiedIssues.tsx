import { Box } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './DocumentIsStepNotSpecifiedIssues.styles';

export function DocumentIsStepNotSpecifiedIssues() {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Box className={classes.badge}>
      {intl.formatMessage({ id: 'DocumentVerification.issues.isStepNotSpecified.description' })}
    </Box>
  );
}
