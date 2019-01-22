import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal } from 'src/components/modal'
import { SyntaxHighlighter } from 'src/components/syntax-highlighter'
import Button from 'src/components/button'

export default function IntegrationModal({ integrationCode, onClose }) {
  return (
    <Modal>
      <header>
        <FormattedMessage id="onboarding.integrationCode.modalTitle" />
      </header>
      <main>
        <SyntaxHighlighter
          language="html"
          copyToClipboard
          code={integrationCode}
        />
        <a
          href="https://github.com/MatiFace/mati-global-id-sdk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check out our mobile SDK
        </a>
      </main>
      <footer className="modal--footer-transparent modal--footer-center">
        <Button buttonStyle="primary" onClick={onClose}>
          <FormattedMessage id="got-it" />
        </Button>
      </footer>
    </Modal>
  )
}