import React from 'react'
import { FormattedMessage } from 'react-intl'
import SyntaxHighlighter from 'src/components/syntax-highlighter'
import { Modal } from 'src/components/modal'
import Button from 'src/components/button'
import stringify from 'src/lib/stringify'

export default function({ webhook, onClose }) {
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
  )
}
