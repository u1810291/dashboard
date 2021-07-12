import { ButtonHeaderMenu, useDeleteButtonHook } from 'apps/ui';
import classNames from 'classnames';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import React, { useCallback } from 'react';
import { FiLoader, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { verificationRemove } from 'state/verification/verification.actions';
import { useStyles } from './VerificationDeleteButton.styles';

export function VerificationDeleteButton({ verificationId, className }: {
  className?: string;
  verificationId: string;
}) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleDeleteVerification = useCallback(async () => {
    if (verificationId) {
      await dispatch(verificationRemove(verificationId));
    }
  }, [dispatch, verificationId]);

  const { isDeleting, handleDelete } = useDeleteButtonHook(handleDeleteVerification, {
    redirectUrl: Routes.identity.verification.root,
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
