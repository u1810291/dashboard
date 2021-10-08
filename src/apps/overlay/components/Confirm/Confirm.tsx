import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Button } from '@material-ui/core';
import { Modal } from '../Modal/Modal';

export function ConfirmModal({ message = '', onClose, onConfirm }: {
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal className="small" data-role="confirmationModal">
      <main>{message || <FormattedMessage id="confirm_string" />}</main>
      <footer className="modal--footer-transparent">
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={onConfirm}
              data-role="confirm"
            >
              <FormattedMessage id="confirm" />
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              onClick={onClose}
              data-role="cancel"
            >
              <FormattedMessage id="cancel" />
            </Button>
          </Grid>
        </Grid>
      </footer>
    </Modal>
  );
}
