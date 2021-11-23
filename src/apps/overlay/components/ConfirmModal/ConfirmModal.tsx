import { Button } from '@material-ui/core';
import { Modal } from 'apps/overlay';
import Img from 'assets/modal-delete.svg';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './ConfirmModal.styles';

export function ConfirmModal({ onClose, onConfirm, title, subtitle }: {
  onClose: () => void;
  onConfirm: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
}) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Modal
      data-role="confirmationModal"
      imgSrc={Img}
      title={title}
      subtitle={subtitle}
      onClose={onClose}
    >
      <Button
        className={classes.confirmButton}
        type="submit"
        data-role="confirm"
        onClick={onConfirm}
      >
        {intl.formatMessage({ id: 'confirm' })}
      </Button>
      <Button
        variant="contained"
        disableElevation
        fullWidth
        data-role="cancel"
        onClick={onClose}
      >
        {intl.formatMessage({ id: 'cancel' })}
      </Button>
    </Modal>
  );
}
