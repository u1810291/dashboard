import { Box, Button, Typography } from '@material-ui/core';
import { Modal } from 'apps/overlay';
import { QATags } from 'models/QA.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Routes } from 'models/Router.model';
import { useStyles } from './RevieweModeExitModal.styles';

export function ReviewModeExitModal({
  closeOverlay,
  onExit,
}: {
  closeOverlay: () => void;
  onExit: () => void;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const history = useHistory();

  const handleExit = useCallback(() => {
    const backPath = history?.location?.state?.from || Routes.list.root;
    closeOverlay();
    onExit();
    history.push(backPath);
  }, [closeOverlay, history, onExit]);

  return (
    <Modal onClose={closeOverlay} className={classes.modal}>
      <Box mb={2} color="common.black90">
        <Typography variant="h4" align="center">
          {intl.formatMessage({ id: 'ReviewMode.exitMessage' })}
        </Typography>
      </Box>
      <Button
        className="btn-delete"
        type="submit"
        onClick={handleExit}
        data-qa={QATags.Review.Page.ExitModal.Exit}
      >
        {intl.formatMessage({ id: 'ReviewMode.button.exit' })}
      </Button>
      <Button
        variant="contained"
        disableElevation
        onClick={closeOverlay}
        data-qa={QATags.Review.Page.ExitModal.Cancel}
      >
        {intl.formatMessage({ id: 'ReviewMode.button.cancel' })}
      </Button>
    </Modal>
  );
}
