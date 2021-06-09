import { FiLoader, FiTrash2 } from 'react-icons/fi';
import { QATags } from 'models/QA.model';
import React, { useCallback } from 'react';
import { identityRemove } from 'state/identities/identities.actions';
import { Routes } from 'models/Router.model';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { ButtonHeaderMenu } from 'apps/ui';
import { useDeleteButtonHook } from 'apps/ui/hooks/deleteButton.hook';
import { useStyles } from './IdentityDeleteButton.styles';

export interface IdentityDeleteButtonProps {
  identityId: string,
}

export function IdentityDeleteButton({ identityId } : IdentityDeleteButtonProps) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const classes = useStyles();

  const handleDeleteIdentity = useCallback(async () => {
    await dispatch(identityRemove(identityId));
  }, [dispatch, identityId]);
  const { isDeleting, handleDelete } = useDeleteButtonHook(handleDeleteIdentity, Routes.list.root);

  return (
    <ButtonHeaderMenu
      variant="contained"
      onClick={handleDelete}
      startIcon={isDeleting ? <FiLoader /> : <FiTrash2 />}
      disabled={isDeleting}
      className={classes.deleteButton}
      data-qa={QATags.Verification.Buttons.Delete}
    >
      {intl.formatMessage({ id: 'verificationModal.delete' })}
    </ButtonHeaderMenu>
  );
}
