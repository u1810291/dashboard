import { Box, Button, Typography } from '@material-ui/core';
import { useCountdownTimer } from 'apps/layout/hooks/CountdownTimer';
import { Modal } from 'apps/overlay';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './TimeoutModal.styles';

export function TimeoutModal({ title, onClose, timeoutSeconds, onTimerEnd }: {
  title: React.ReactNode;
  timeoutSeconds: number;
  onTimerEnd: () => void;
  onClose: () => void;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const [progressLabel] = useCountdownTimer(timeoutSeconds, onTimerEnd);

  return (
    <Modal onClose={onClose} className={classes.modal}>
      <Box mb={2} color="common.black90">
        <Typography variant="h4" align="center">
          {title}
        </Typography>
      </Box>
      <Box mb={2} color="common.black90" fontSize={36} fontWeight="bold" alignSelf="center">
        {progressLabel}
      </Box>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={onClose}
      >
        {intl.formatMessage({ id: 'ReviewMode.button.continue' })}
      </Button>
    </Modal>
  );
}
