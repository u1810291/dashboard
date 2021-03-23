import { Button } from '@material-ui/core';
import { useFullStory } from 'apps/AppBootstrap';
import { Modal, useOverlay } from 'apps/overlay';
import Img from 'assets/modal-logout.svg';
import { QATags } from 'models/QA.model';
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
        data-qa={QATags.Auth.Logout.ConfirmButton}
      >
        {intl.formatMessage({ id: 'dashboard.logout.quit' })}
      </Button>
      <Button
        variant="contained"
        disableElevation
        fullWidth
        data-role="cancel"
        onClick={onClose}
        data-qa={QATags.Auth.Logout.CancelButton}
      >
        {intl.formatMessage({ id: 'cancel' })}
      </Button>
    </Modal>
  );
}

export function useLogout() {
  const [createOverlay, closeOverlay] = useOverlay();
  const disableFullstory = useFullStory();

  return useCallback(() => new Promise((resolve, reject) => {
    function onClose() {
      closeOverlay();
      reject();
    }

    function onConfirm() {
      disableFullstory();
      closeOverlay();
      resolve();
    }

    createOverlay(<LogoutModal onClose={onClose} onConfirm={onConfirm} />, {
      onClose,
    });
  }), [createOverlay, disableFullstory, closeOverlay]);
}

LogoutModal.propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

LogoutModal.defaultProps = {
  onClose: () => {},
  onConfirm: () => {},
};
