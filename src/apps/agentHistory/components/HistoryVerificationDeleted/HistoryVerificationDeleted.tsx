import { Box } from '@material-ui/core';
import { BoxLabeled } from 'apps/ui';
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
      <BoxLabeled label={intl.formatMessage({ id: 'AgentHistory.verificationDeleted.verificationId' })}>
        {deletedId}
      </BoxLabeled>
    </Box>
  );
}
