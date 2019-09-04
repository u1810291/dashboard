import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Modal from 'components/modal';
import Button from 'components/button';
import { ReactComponent as DeleteSuccessIcon } from './deleteSuccess.svg';

export default function DeleteSuccessModal({ className, onClose, ...modalProps }) {
  return (
    <Modal
      {...modalProps} // eslint-disable-line react/jsx-props-no-spreading
      className={className}
    >
      <main className="">
        <DeleteSuccessIcon />
        <FormattedMessage id="teamTable.deleteSuccessModal.description" />
      </main>
      <footer className="modal--footer-center">
        <Button
          type="submit"
          buttonStyle="primary"
          onClick={onClose}
        >
          <FormattedMessage id="teamTable.deleteSuccessModal.done" />
        </Button>
      </footer>
    </Modal>
  );
}

DeleteSuccessModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
