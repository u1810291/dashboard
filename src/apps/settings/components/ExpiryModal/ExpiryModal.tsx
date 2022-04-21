import React from 'react';
import { Routes } from 'models/Router.model';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useFormatMessage } from 'apps/intl';
import { PasswordExpirationPolicyDurationValue } from 'models/Settings.model';
import { Modal } from 'apps/overlay';
import { useStyles } from './ExpiryModal.styles';

export const ExpiryModal = ({ action, closeOverlay, expirationDuration }: {
  action: (value: PasswordExpirationPolicyDurationValue) => void;
  closeOverlay: () => void;
  expirationDuration: PasswordExpirationPolicyDurationValue;
}) => {
  const classes = useStyles();
  const history = useHistory();
  const formatMessage = useFormatMessage();

  const handleContinueButtonClick = () => {
    history.push(Routes.settings.root);
    action(expirationDuration);
  };

  const handleCancelButtonClick = () => {
    history.push(Routes.settings.root);
    closeOverlay();
  };

  return (
    <Modal
      className={classes.expiryModal}
      title={formatMessage('ExpiryModal.title')}
    >
      <Box className={classes.buttonsGroup}>
        <Button
          className={classes.button}
          tabIndex={0}
          color="primary"
          variant="contained"
          onClick={handleContinueButtonClick}
        >
          {formatMessage('ExpiryModal.continue')}
        </Button>
        <Button
          tabIndex={0}
          color="primary"
          className={classes.button}
          onClick={handleCancelButtonClick}
        >
          {formatMessage('ExpiryModal.cancel')}
        </Button>
      </Box>
    </Modal>
  );
};
