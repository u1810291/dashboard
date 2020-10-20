import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Button } from '@material-ui/core';
import Modal from 'components/modal';
import Img from 'assets/modal-delete.svg';
import { useOverlay } from 'apps/overlay';

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

export function useConfirmDelete() {
  const [createOverlay, closeOverlay] = useOverlay();

  return useCallback(() => new Promise((resolve, reject) => {
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
  }), [closeOverlay, createOverlay]);
}

DeleteModal.propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

DeleteModal.defaultProps = {
  onClose: () => {},
  onConfirm: () => {},
};
