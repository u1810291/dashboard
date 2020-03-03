import Button from 'components/button';
import Modal from 'components/modal';
import { closeOverlay } from 'components/overlay';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as DeleteSuccessIcon } from './deleteSuccess.svg';
import CSS from './DeleteSuccessModal.module.scss';

export function DeleteSuccessModal({ className, ...modalProps }) {
  return (
    <Modal {...modalProps} className={CSS.root}>
      <main className="">
        <DeleteSuccessIcon />
        <FormattedMessage id="teamTable.deleteSuccessModal.description" />
      </main>
      <footer className="modal--footer-center">
        <Button
          type="submit"
          buttonStyle="primary"
          onClick={closeOverlay}
        >
          <FormattedMessage id="teamTable.deleteSuccessModal.done" />
        </Button>
      </footer>
    </Modal>
  );
}
