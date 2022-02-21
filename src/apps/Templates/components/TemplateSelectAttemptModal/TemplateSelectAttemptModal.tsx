import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useFormatMessage } from 'apps/intl';
import { Modal } from 'apps/overlay';
import { ReactComponent as ExclamationMarkIcon } from 'assets/exclamation-mark-icon.svg';
import { useStyles } from './TemplateSelectAttemptModal.style';

export function TemplateSelectAttemptModal({ handleContinue, closeOverlay }: { handleContinue?: () => void; closeOverlay?: () => void }) {
  const classes = useStyles();

  const formatMessage = useFormatMessage();

  return (
    <Modal className={classes.modal}>
      <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
        <ExclamationMarkIcon />
        <span className={classes.title}>{formatMessage('Templates.selectModal.title')}</span>
        <span className={classes.subtitle}>{formatMessage('Templates.selectModal.subtitle')}</span>
        <Button
          className={classes.continueButton}
          type="submit"
          color="primary"
          variant="contained"
          disableElevation
          fullWidth
          onClick={handleContinue}
        >
          {formatMessage('Templates.selectModal.continueButton')}
        </Button>
        <Button
          variant="contained"
          disableElevation
          fullWidth
          onClick={closeOverlay}
        >
          {formatMessage('Templates.selectModal.cancelButton')}
        </Button>
      </Box>
    </Modal>
  );
}
