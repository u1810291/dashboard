import React from 'react'
import { FormattedMessage } from 'react-intl'
import { SyntaxHighlighter } from 'src/components/syntax-highlighter'
import { Modal } from 'src/components/modal'
import Button from 'src/components/button'

export default function({ webhook, onClose }) {
  return (
    <Modal wide>
      <header>
        <FormattedMessage id="verificationModal.webhookResponse" />
      </header>
      <main>
        <SyntaxHighlighter
          dark={false}
          copyToClipboard
          code={webhook}
          language="javascript"
        />
      </main>
      <footer>
        <Button onClick={onClose} buttonStyle="primary">
          <FormattedMessage id="done" />
        </Button>
      </footer>
    </Modal>
  )
}
