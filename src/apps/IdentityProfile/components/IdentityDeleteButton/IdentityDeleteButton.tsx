import { ButtonHeaderMenu, useDeleteButtonHook } from 'apps/ui';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import React, { useCallback } from 'react';
import { FiLoader, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { identityProfileRemove } from '../../store/IdentityProfile.actions';
import { useStyles } from './IdentityDeleteButton.styles';

export function IdentityDeleteButton({ identityId }: {
  identityId: string;
}) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const classes = useStyles();

  const handleDeleteIdentity = useCallback(async () => {
    if (identityId) {
      await dispatch(identityProfileRemove(identityId));
    }
  }, [dispatch, identityId]);

  const { isDeleting, handleDelete } = useDeleteButtonHook(handleDeleteIdentity, {
    redirectUrl: Routes.identity.verification.root,
  });

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
