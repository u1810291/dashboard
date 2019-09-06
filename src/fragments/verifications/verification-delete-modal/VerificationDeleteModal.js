import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Modal from 'components/modal';
import Button from 'components/button';

export default function VerificationDeleteModal({ onDelete }) {
  return (
    <Modal wide>
      <header>
        <FormattedMessage id="verificationModal.webhookResponse" />
      </header>
      <main>
        Are you sure?
      </main>
      <footer>
        <Button onClick={onDelete} buttonStyle="primary">
          <FormattedMessage id="done" />
        </Button>
      </footer>
    </Modal>
  );
}

VerificationDeleteModal.propTypes = {
  onDelete: PropTypes.func.isRequired,
};
