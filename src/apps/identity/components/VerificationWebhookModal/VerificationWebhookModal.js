import Button from 'components/button';
import Modal from 'components/modal';
import { SyntaxHighlighter } from 'components/syntax-highlighter';
import { SyntaxHighlighterLanguages } from 'components/syntax-highlighter/SyntaxHighlighter.model';
import stringify from 'lib/stringify';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export function VerificationWebhookModal({ webhook, onClose }) {
  return (
    <Modal wide>
      <header>
        <FormattedMessage id="verificationWebhookModal.title" />
      </header>
      <main>
        <SyntaxHighlighter code={stringify(webhook)} language={SyntaxHighlighterLanguages.JavaScript} />
      </main>
      <footer>
        <Button onClick={onClose} buttonStyle="primary">
          <FormattedMessage id="done" />
        </Button>
      </footer>
    </Modal>
  );
}
