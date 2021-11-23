import React, { useCallback } from 'react';
import { CollaboratorOptions, CollaboratorRoles } from 'models/Collaborator.model';
import { collaboratorUpdate } from 'apps/collaborators/state/collaborator.actions';
import { notification } from 'apps/ui';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useConfirm } from 'apps/overlay';
import { selectOwnerId } from 'state/merchant/merchant.selectors';
import { selectUserId } from 'apps/user/state/user.selectors';

export function useChangeRole(previousRole: CollaboratorRoles): ({ id, event, onSuccess }: {id: string; event: React.ChangeEvent<{ name?: string; value: unknown }>; onSuccess?: () => void}) => Promise<void> {
  const intl = useIntl();
  const dispatch = useDispatch();
  const confirmRoleChanging = useConfirm();
  const ownerId = useSelector(selectOwnerId);
  const userId = useSelector(selectUserId);

  const handleUpdate = useCallback(async (id: string, data: { role: CollaboratorRoles }) => {
    try {
      await dispatch(collaboratorUpdate(id, data));
    } catch (error: any) {
      notification.error(intl.formatMessage({
        id: `Settings.teamSettings.update.${error.response?.data?.name}`,
        defaultMessage: intl.formatMessage({ id: 'Error.common' }),
      }));
      console.error(error);
      throw error;
    }
  }, [dispatch, intl]);

  const handleConfirmation = useCallback(async (id: string, newRole: CollaboratorRoles, oldRole: CollaboratorRoles, onSuccess?: () => void) => {
    try {
      const newRoleOptions = CollaboratorOptions.find((item) => item.value === newRole);
      const permissionsDescription = newRoleOptions?.permissionsLabel ? intl.formatMessage({ id: newRoleOptions.permissionsLabel }) : null;
      const newRoleText = newRoleOptions?.label ? intl.formatMessage({ id: newRoleOptions.label }) : null;
      const previousRoleLabel = CollaboratorOptions.find((item) => item.value === oldRole)?.label;
      const previousRoleText = intl.formatMessage({ id: previousRoleLabel });
      await confirmRoleChanging(intl.formatMessage({ id: 'Settings.teamSettings.modal.confirmRoleChanging' }, { permissionsDescription, newRole: newRoleText, oldRole: previousRoleText }));
      await handleUpdate(id, { role: newRole });
      onSuccess();
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  }, [confirmRoleChanging, handleUpdate, intl]);

  return useCallback(async ({ id, event, onSuccess }: {id: string; event: React.ChangeEvent<{ name?: string; value: unknown }>; onSuccess?: () => void}) => {
    if (id === ownerId) {
      return;
    }

    const newRole = event?.target?.value as CollaboratorRoles;

    if (id === userId) {
      await handleConfirmation(id, newRole, previousRole, onSuccess);
      return;
    }

    try {
      await handleUpdate(id, { role: newRole });
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  }, [previousRole, handleConfirmation, handleUpdate, ownerId, userId]);
}
