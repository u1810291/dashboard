import { useCallback } from 'react';
import { CollaboratorOptions, CollaboratorRoles } from 'models/Collaborator.model';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useConfirm } from 'apps/overlay';
import { selectOwnerId } from 'state/merchant/merchant.selectors';
import { selectUserId } from 'apps/user/state/user.selectors';

export function useConfirmChangeRole(previousRole: CollaboratorRoles): ({ id, newRole }: {id: string; newRole: CollaboratorRoles}) => Promise<void> {
  const intl = useIntl();
  const confirmRoleChanging = useConfirm();
  const ownerId = useSelector(selectOwnerId);
  const userId = useSelector(selectUserId);

  const handleConfirmation = useCallback(async (id: string, newRole: CollaboratorRoles, oldRole: CollaboratorRoles) => {
    const newRoleOptions = CollaboratorOptions.find((item) => item.value === newRole);
    const permissionsDescription = newRoleOptions?.permissionsLabel ? intl.formatMessage({ id: newRoleOptions.permissionsLabel }) : null;
    const newRoleText = newRoleOptions?.label ? intl.formatMessage({ id: newRoleOptions.label }) : null;
    const previousRoleLabel = CollaboratorOptions.find((item) => item.value === oldRole)?.label;
    const previousRoleText = intl.formatMessage({ id: previousRoleLabel });
    await confirmRoleChanging(intl.formatMessage({ id: 'Settings.teamSettings.modal.confirmRoleChanging' }, { permissionsDescription, newRole: newRoleText, oldRole: previousRoleText }));
  }, [confirmRoleChanging, intl]);

  return useCallback(async ({ id, newRole }: {id: string; newRole: CollaboratorRoles}) => {
    if (id === ownerId || previousRole === newRole || id !== userId) {
      return;
    }

    await handleConfirmation(id, newRole, previousRole);
  }, [previousRole, handleConfirmation, ownerId, userId]);
}
