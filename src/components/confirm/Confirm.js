import React from 'react'
import { FormattedMessage } from 'react-intl'
import { createOverlay, closeOverlay } from '../overlay'
import { Modal } from '../modal'
import Button from '../button'

export function ConfirmModal({ message, onClose, onConfirm }) {
  return (
    <Modal className="small">
      <main>{message}</main>
      <footer className="mgi-items modal--footer-transparent">
        <Button buttonStyle="primary" onClick={onConfirm}>
          <FormattedMessage id="confirm" />
        </Button>
        <Button onClick={onClose}>
          <FormattedMessage id="cancel" />
        </Button>
      </footer>
    </Modal>
  )
}

export default function confirm(message) {
  return new Promise((resolve, reject) => {
    function onClose() {
      closeOverlay()
      reject()
    }

    function onConfirm() {
      closeOverlay()
      resolve()
    }

    createOverlay(
      <ConfirmModal
        message={message}
        onClose={onClose}
        onConfirm={onConfirm}
      />,
      { onClose }
    )
  })
}
