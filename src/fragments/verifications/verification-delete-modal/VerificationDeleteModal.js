import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal } from 'components/modal'
import Button from 'components/button'

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
