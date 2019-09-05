import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Modal from 'components/modal/index';
import Button from 'components/button/index';
import classNames from 'classnames';
import { ReactComponent as InviteSuccessIcon } from './inviteSuccess.svg';
import CSS from './TeamInviteModal.module.scss';

export default function InviteSuccessModal(props) {
  const { className, onClose, ...modalProps } = props;
  return (
    <Modal
      {...modalProps} // eslint-disable-line react/jsx-props-no-spreading
      className={classNames(CSS.inviteSuccessModal, className)}
    >
      <main>
        <InviteSuccessIcon />
        <FormattedMessage id="teamTable.inviteSuccessModal.description" />
      </main>
      <footer className="modal--footer-center">
        <Button
          type="submit"
          buttonStyle="primary"
          onClick={onClose}
        >
          <FormattedMessage id="teamTable.inviteSuccessModal.done" />
        </Button>
      </footer>
    </Modal>
  );
}

InviteSuccessModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
