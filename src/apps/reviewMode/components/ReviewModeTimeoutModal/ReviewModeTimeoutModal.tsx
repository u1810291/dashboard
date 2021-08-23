import { Box, Button, Typography } from '@material-ui/core';
import { useCountdownTimer } from 'apps/layout/hooks/CountdownTimer';
import { Modal } from 'apps/overlay';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './RevieweModeTimeoutModal.styles';

export function ReviewModeTimeoutModal({
  closeOverlay,
  timeoutSeconds,
  onTimerEnd,
}: {
    closeOverlay: () => void;
    timeoutSeconds: number;
    onTimerEnd: () => void;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const [progressLabel] = useCountdownTimer(timeoutSeconds, onTimerEnd);

  return (
    <Modal onClose={closeOverlay} className={classes.modal}>
      <Box mb={2} color="common.black90">
        <Typography variant="h4" align="center">
          {intl.formatMessage({ id: 'ReviewMode.timeoutMessage' })}
        </Typography>
      </Box>
      <Box mb={2} color="common.black90" fontSize={36} fontWeight="bold" alignSelf="center">
        {progressLabel}
      </Box>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={closeOverlay}
      >
        {intl.formatMessage({ id: 'ReviewMode.button.continue' })}
      </Button>
    </Modal>
  );
}
