import { useCallback, useState } from 'react';
import { useConfirmDelete } from 'apps/identity/components/DeleteModal/DeleteModal';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { DeleteButtonHookOptions } from '../models/DeleteButton.model';

export function useDeleteButtonHook(onDelete: () => Promise<void>, options: DeleteButtonHookOptions = {}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const history = useHistory();
  const intl = useIntl();

  const confirmDelete = useConfirmDelete(
    intl.formatMessage({ id: options.header || 'verificationModal.delete' }),
    intl.formatMessage({ id: options.confirm || 'verificationModal.delete.confirm' }),
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
