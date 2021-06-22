import { useIntl } from 'react-intl';
import React, { useCallback } from 'react';
import { useDeleteButtonHook } from 'apps/ui/hooks/deleteButton.hook';
import { Routes } from 'models/Router.model';
import { FiLoader, FiTrash2 } from 'react-icons/fi';
import { QATags } from 'models/QA.model';
import { ButtonHeaderMenu } from 'apps/ui';
import classNames from 'classnames';
import { useStyles } from './VerificationDeleteButton.styles';

export interface VerificationDeleteButtonProps {
  className?: string
}

export function VerificationDeleteButton({ className }: VerificationDeleteButtonProps) {
  const intl = useIntl();
  const classes = useStyles();

  // TODO: Finish up delete verification when endpoint will be created
  const handleDeleteVerification = useCallback(async () => {
  }, []);

  const { isDeleting, handleDelete } = useDeleteButtonHook(handleDeleteVerification, Routes.list.root);

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
