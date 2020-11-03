import Modal from 'components/modal';
import { Button, Typography, Box } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './ForDevsWebhookModal.styles';

export function ForDevsWebhookModal({ onClose }) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Modal className={classes.modal}>
      <Typography variant="h4" gutterBottom className={classes.title}>
        { intl.formatMessage({ id: 'verificationWebhookModal.title' }) }
      </Typography>
      <Typography variant="body1" className={classes.subtitle}>
        { intl.formatMessage({ id: 'verificationWebhookModal.subtitle' }) }
      </Typography>
      <Box align="right">
        <Button
          color="primary"
          variant="contained"
          disableElevation
          className={classes.button}
          onClick={onClose}
        >
          { intl.formatMessage({ id: 'close' }) }
        </Button>
      </Box>
    </Modal>
  );
}
