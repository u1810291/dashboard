import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createOverlay, closeOverlay } from '../overlay';
import Modal from '../modal';
import Items from '../items';
import Button from '../button';

export function ConfirmModal({ message, onClose, onConfirm }) {
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

export default function confirm(message) {
  return new Promise((resolve, reject) => {
    function onClose() {
      closeOverlay();
      reject();
    }

    function onConfirm() {
      closeOverlay();
      resolve();
    }

    createOverlay(<ConfirmModal message={message} onClose={onClose} onConfirm={onConfirm} />, {
      onClose,
    });
  });
}

ConfirmModal.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

ConfirmModal.defaultProps = {
  message: '',
  onClose: () => {},
  onConfirm: () => {},
};
