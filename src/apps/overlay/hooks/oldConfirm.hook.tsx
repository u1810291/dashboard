import React, { useCallback } from 'react';
import { ConfirmModal } from '../components/oldConfirm/Confirm';
import { useOverlay } from './Overlay.hook';

/**
 * @deprecated The method should not be used
 */
export function useConfirm(message?: React.ReactNode) {
  const [createOverlay, closeOverlay] = useOverlay();

  return useCallback((replacementMessage?: React.ReactNode) => new Promise<void>((resolve, reject) => {
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
        message={replacementMessage || message}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />, {
        onClose: handleClose,
      },
    );
  }), [createOverlay, message, closeOverlay]);
}
