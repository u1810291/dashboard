import { Button } from '@material-ui/core';
import { useOverlay, Modal } from 'apps/overlay';
import Img from 'assets/modal-logout.svg';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

export function LogoutModal({ onClose, onConfirm }) {
  const intl = useIntl();

  return (
    <Modal
      data-role="confirmationModal"
      imgSrc={Img}
      title={intl.formatMessage({ id: 'dashboard.logout.title' })}
      subtitle={intl.formatMessage({ id: 'dashboard.logout.subtitle' })}
    >
      <Button
        color="primary"
        variant="contained"
        type="submit"
        data-role="confirm"
        onClick={onConfirm}
      >
        {intl.formatMessage({ id: 'dashboard.logout.quit' })}
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

export function useLogout() {
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

    createOverlay(<LogoutModal onClose={onClose} onConfirm={onConfirm} />, {
      onClose,
    });
  }), [createOverlay, closeOverlay]);
}

LogoutModal.propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

LogoutModal.defaultProps = {
  onClose: () => {},
  onConfirm: () => {},
};
