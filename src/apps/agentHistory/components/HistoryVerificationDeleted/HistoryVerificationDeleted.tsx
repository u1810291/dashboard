import { Box } from '@material-ui/core';
import { VerificationId } from 'models/Verification.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './HistoryVerificationDeleted.styles';

export function HistoryVerificationDeleted({ deletedId }: {
  deletedId: VerificationId;
}) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" className={classes.status}>
      <Box>
        {intl.formatMessage({ id: 'deleted' })}
        {deletedId}
      </Box>
    </Box>
  );
}
