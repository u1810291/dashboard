import { Button } from '@material-ui/core';
import { Modal, useOverlay } from 'apps/overlay';
import Img from 'assets/modal-delete.svg';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

export function DeleteModal({ onClose, onConfirm, title = '', subtitle = '' }) {
  const intl = useIntl();

  return (
    <Modal
      data-role="confirmationModal"
      imgSrc={Img}
      title={title}
      subtitle={subtitle}
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

export function useConfirmDelete(title, subtitle) {
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

    createOverlay(<DeleteModal title={title} subtitle={subtitle} onClose={onClose} onConfirm={onConfirm} />, {
      onClose,
    });
  }), [closeOverlay, createOverlay, subtitle, title]);
}

DeleteModal.propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

DeleteModal.defaultProps = {
  onClose: () => {},
  onConfirm: () => {},
};
