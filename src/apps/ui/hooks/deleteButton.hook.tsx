import { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { DeleteButtonHookOptions } from '../models/DeleteButton.model';
import { useConfirmDelete } from './confirmDelete.hook';

export function useDeleteButtonHook(onDelete: () => Promise<void>, options: DeleteButtonHookOptions = {}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const history = useHistory();
  const intl = useIntl();

  const confirmDelete = useConfirmDelete(
    intl.formatMessage({ id: options.header || 'verificationModal.delete' }, options.headerOptions),
    intl.formatMessage({ id: options.confirm || 'verificationModal.delete.confirm' }, options.confirmOptions),
  );

  const handleDelete = useCallback(async () => {
    if (isDeleting) {
      return;
    }
    try {
      setIsDeleting(true);
      await confirmDelete();
      await onDelete();
      if (options.redirectUrl) {
        history.push(options.redirectUrl);
      }
    } catch (error) {
      if (!error) {
        // cancelled
        return;
      }
      console.error('remove error', error);
    } finally {
      setIsDeleting(false);
    }
  }, [isDeleting, confirmDelete, onDelete, options.redirectUrl, history]);

  return { isDeleting, handleDelete };
}
