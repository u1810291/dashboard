import React, { useCallback } from 'react';
import { ConfirmModal } from '../components/Confirm/Confirm';
import { useOverlay } from './Overlay.hook';

export function useConfirm(message) {
  const [createOverlay, closeOverlay] = useOverlay();

  return useCallback(() => new Promise<void>((resolve, reject) => {
    const handleClose = () => {
      closeOverlay();
      reject();
    };

    const handleConfirm = () => {
      closeOverlay();
      resolve();
    };

    createOverlay(
      <ConfirmModal
        message={message}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />, {
        onClose: handleClose,
      },
    );
  }), [createOverlay, message, closeOverlay]);
}
