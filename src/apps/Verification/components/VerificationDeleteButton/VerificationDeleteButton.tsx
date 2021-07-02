import { ButtonHeaderMenu, useDeleteButtonHook } from 'apps/ui';
import classNames from 'classnames';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import React, { useCallback } from 'react';
import { FiLoader, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { verificationRemove } from '../../state/Verification.actions';
import { useStyles } from './VerificationDeleteButton.styles';

export interface VerificationDeleteButtonProps {
  className?: string,
  verificationId: string,
  identityId: string,
}

export function VerificationDeleteButton({ verificationId, identityId, className }: VerificationDeleteButtonProps) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleDeleteVerification = useCallback(async () => {
    if (verificationId && identityId) {
      await dispatch(verificationRemove(identityId, verificationId));
    }
  }, [dispatch, identityId, verificationId]);

  const { isDeleting, handleDelete } = useDeleteButtonHook(handleDeleteVerification, {
    redirectUrl: Routes.list.root,
  });

  return (
    <ButtonHeaderMenu
      variant="contained"
      onClick={handleDelete}
      startIcon={isDeleting ? <FiLoader /> : <FiTrash2 />}
      disabled={isDeleting}
      className={classNames(classes.deleteButton, className)}
      data-qa={QATags.Verification.Buttons.Delete}
    >
      {intl.formatMessage({ id: 'verificationModal.delete' })}
    </ButtonHeaderMenu>
  );
}
