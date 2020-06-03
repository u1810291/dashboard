import Button from 'components/button';
import Modal from 'components/modal';
import { closeOverlay } from 'components/overlay';
import React from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as DeleteSuccessIcon } from './deleteSuccess.svg';
import { useStyles } from './DeleteSuccessModal.styles';

export function DeleteSuccessModal({ className, ...modalProps }) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Modal {...modalProps}>
      <main className={classes.deleteSuccessModal}>
        <DeleteSuccessIcon />
        {intl.formatMessage({ id: 'teamTable.deleteSuccessModal.description' })}
      </main>
      <footer className="modal--footer-center">
        <Button
          type="submit"
          buttonStyle="primary"
          onClick={closeOverlay}
        >
          {intl.formatMessage({ id: 'teamTable.deleteSuccessModal.done' })}
        </Button>
      </footer>
    </Modal>
  );
}
