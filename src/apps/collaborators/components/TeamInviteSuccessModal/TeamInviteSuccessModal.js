import Button from 'components/button';
import Modal from 'components/modal';
import { closeOverlay } from 'components/overlay';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as InviteSuccessIcon } from './inviteSuccess.svg';
import CSS from './TeamInviteSuccessModal.module.scss';

export function TeamInviteSuccessModal() {
  return (
    <Modal onClose={closeOverlay} className={CSS.inviteSuccessModal}>
      <main>
        <InviteSuccessIcon />
        <FormattedMessage id="teamTable.inviteSuccessModal.description" />
      </main>
      <footer className="modal--footer-center">
        <Button
          type="submit"
          buttonStyle="primary"
          onClick={closeOverlay}
        >
          <FormattedMessage id="teamTable.inviteSuccessModal.done" />
        </Button>
      </footer>
    </Modal>
  );
}
