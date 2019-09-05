import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import SyntaxHighlighter from 'components/syntax-highlighter';
import Modal from 'components/modal';
import Button from 'components/button';
import stringify from 'lib/stringify';

export default function VerificationWebhookModal({ webhook, onClose }) {
  return (
    <Modal wide>
      <header>
        <FormattedMessage id="verificationWebhookModal.title" />
      </header>
      <main>
        <SyntaxHighlighter code={stringify(webhook)} language="javascript" />
      </main>
      <footer>
        <Button onClick={onClose} buttonStyle="primary">
          <FormattedMessage id="done" />
        </Button>
      </footer>
    </Modal>
  );
}

VerificationWebhookModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  webhook: PropTypes.shape({}).isRequired,
};
