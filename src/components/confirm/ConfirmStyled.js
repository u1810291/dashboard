import React from 'react';
import { createOverlay, closeOverlay } from '../overlay';
import { Modal } from '../modal';
import Items from '../items';
import Button from '../button';
import CSS from './ConfirmStyled.module.scss';

const ConfirmModal = ({ 
  header,
  message,
  onClose,
  onConfirm,
  confirmText,
  cancelText,
}) => (
  <Modal data-role="confirmationModal" className={CSS.modal}>
    { header && <header>{header}</header> }
    <main>{message}</main>
    <footer className="modal--footer-transparent">
      <Items inline>
        <Button buttonStyle="primary" onClick={onConfirm} data-role="confirm">
          {confirmText}
        </Button>
        <Button onClick={onClose} data-role="cancel" buttonStyle="outline">
          {cancelText}
        </Button>
      </Items>
    </footer>
  </Modal>
);


export default function confirmStyled({
  message,
  header,
  confirmText,
  cancelText,
}) {
  return new Promise((resolve, reject) => {
    function onClose() {
      closeOverlay()
      reject()
    }

    function onConfirm() {
      
      closeOverlay()
      resolve()
    }

    createOverlay(<ConfirmModal
      header={header}
      message={message}
      confirmText={confirmText}
      cancelText={cancelText} 
      onClose={onClose}
      onConfirm={onConfirm} />,
    {
      onClose
    })
  })
}
