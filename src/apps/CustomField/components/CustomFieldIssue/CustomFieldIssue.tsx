import Box from '@material-ui/core/Box';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './CustomFieldIssue.module';

export function CustomFieldIssue() {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Box className={classes.badge}>
      {intl.formatMessage({ id: 'CustomField.issues.description' })}
    </Box>
  );
}
