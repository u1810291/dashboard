import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal } from 'src/components/modal'
import Button from 'src/components/button'

export default function({ onDelete, onCancel }) {
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
  )
}
