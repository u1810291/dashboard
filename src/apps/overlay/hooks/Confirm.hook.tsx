import React, { useCallback } from 'react';
import { useOverlay } from 'apps/overlay/hooks/Overlay.hook';
import { ConfirmModal } from 'apps/overlay/components/ConfirmModal/ConfirmModal';

export function useConfirm(title?: React.ReactNode, subtitle?: React.ReactNode) {
  const [createOverlay, closeOverlay] = useOverlay();

  return useCallback((replacementSubtitle?: React.ReactNode) => new Promise<void>((resolve, reject) => {
    function onClose() {
      closeOverlay();
      reject();
    }

    function onConfirm() {
      closeOverlay();
      resolve();
    }

    createOverlay(
      <ConfirmModal
        title={title}
        subtitle={replacementSubtitle || subtitle}
        onClose={onClose}
        onConfirm={onConfirm}
      />, {
        onClose,
      },
    );
  }), [closeOverlay, createOverlay, subtitle, title]);
}
