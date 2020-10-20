import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '../../../../components/button';
import Items from '../../../../components/items';
import Modal from '../../../../components/modal';

export function ConfirmModal({ message = '', onClose, onConfirm }) {
  return (
    <Modal className="small" data-role="confirmationModal">
      <main>{message || <FormattedMessage id="confirm_string" />}</main>
      <footer className="modal--footer-transparent">
        <Items inline>
          <Button buttonStyle="primary" onClick={onConfirm} data-role="confirm">
            <FormattedMessage id="confirm" />
          </Button>
          <Button onClick={onClose} data-role="cancel">
            <FormattedMessage id="cancel" />
          </Button>
        </Items>
      </footer>
    </Modal>
  );
}
