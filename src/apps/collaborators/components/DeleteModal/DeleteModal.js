import Button from 'components/button';
import Modal from 'components/modal';
import { closeOverlay } from 'components/overlay';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export function DeleteModal({ className, user, onSubmit, ...modalProps }) {
  return (
    <Modal {...modalProps} onClose={closeOverlay} className={className}>
      <header>
        <FormattedMessage id="teamTable.deleteModal.title" />
      </header>
      <main>
        <FormattedMessage
          id="teamTable.deleteModal.description"
          values={{
            userName: <strong>{user.name || ''}</strong>,
          }}
        />
      </main>
      <footer className="modal--footer-center">
        <Button type="submit" buttonStyle="danger" onClick={() => onSubmit(user.id)}>
          <FormattedMessage id="teamTable.deleteModal.delete" />
        </Button>
      </footer>
    </Modal>
  );
}
