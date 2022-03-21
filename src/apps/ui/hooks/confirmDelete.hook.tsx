import { useOverlay } from 'apps/overlay';
import React, { useCallback } from 'react';
import { DeleteModal } from 'apps/ui/components/DeleteModal/DeleteModal';

export function useConfirmDelete(title?: React.ReactNode, subtitle?: React.ReactNode) {
  const [createOverlay, closeOverlay] = useOverlay();

  return useCallback(() => new Promise<void>((resolve, reject) => {
    function onClose() {
      closeOverlay();
      reject();
    }

    function onConfirm() {
      closeOverlay();
      resolve();
    }

    createOverlay(
      <DeleteModal
        title={title}
        subtitle={subtitle}
        onClose={onClose}
        onConfirm={onConfirm}
      />, {
        onClose,
      },
    );
  }), [closeOverlay, createOverlay, subtitle, title]);
}
