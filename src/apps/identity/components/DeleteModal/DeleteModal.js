import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { createOverlay, closeOverlay } from 'components/overlay';
import { Button } from '@material-ui/core';
import Modal from 'components/modal';
import Img from 'assets/modal-delete.svg';

export function DeleteModal({ onClose, onConfirm }) {
  const intl = useIntl();

  return (
    <Modal
      data-role="confirmationModal"
      imgSrc={Img}
      title={intl.formatMessage({ id: 'verificationModal.delete' })}
      subtitle={intl.formatMessage({ id: 'verificationModal.delete.confirm' })}
      onClose={onClose}
    >
      <Button
        className="btn-delete"
        type="submit"
        data-role="confirm"
        onClick={onConfirm}
      >
        {intl.formatMessage({ id: 'delete' })}
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

export function confirmDelete() {
  return new Promise((resolve, reject) => {
    function onClose() {
      closeOverlay();
      reject();
    }

    function onConfirm() {
      closeOverlay();
      resolve();
    }

    createOverlay(<DeleteModal onClose={onClose} onConfirm={onConfirm} />, {
      onClose,
    });
  });
}

DeleteModal.propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

DeleteModal.defaultProps = {
  onClose: () => {},
  onConfirm: () => {},
};
