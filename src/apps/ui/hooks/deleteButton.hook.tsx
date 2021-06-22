import { useCallback, useState } from 'react';
import { useConfirmDelete } from 'apps/identity/components/DeleteModal/DeleteModal';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

export function useDeleteButtonHook(onDelete: () => Promise<void>, redirectUrl?: string) {
  const [isDeleting, setIsDeleting] = useState(false);
  const history = useHistory();
  const intl = useIntl();

  const confirmDelete = useConfirmDelete(
    intl.formatMessage({ id: 'verificationModal.delete' }),
    intl.formatMessage({ id: 'verificationModal.delete.confirm' }),
  );

  const handleDelete = useCallback(async () => {
    if (isDeleting) {
      return;
    }
    try {
      setIsDeleting(true);
      await confirmDelete();
      await onDelete();
      if (redirectUrl) {
        history.push(redirectUrl);
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
  }, [isDeleting, confirmDelete, onDelete, redirectUrl, history]);

  return { isDeleting, handleDelete };
}
