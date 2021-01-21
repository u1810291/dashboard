import { Modal, useOverlay } from 'apps/overlay';
import React from 'react';
import { Button } from '@material-ui/core';
import { useIntl } from 'react-intl';
import Img from 'assets/modal-delete.svg';
import { QATags } from '../../../../models/QA.model';

export function DeleteModal({ className, user, onSubmit, ...modalProps }) {
  const intl = useIntl();
  const [, closeOverlay] = useOverlay();

  return (
    <Modal
      {...modalProps}
      onClose={closeOverlay}
      className={className}
      imgSrc={Img}
      title={intl.formatMessage({ id: 'teamTable.deleteModal.title' })}
      subtitle={intl.formatMessage({ id: 'teamTable.deleteModal.subtitle' })}
    >
      <Button
        data-qa={QATags.Modal.Delete.ConfirmDeleteButton}
        className="btn-delete"
        type="submit"
        onClick={() => onSubmit(user.id)}
      >
        {intl.formatMessage({ id: 'delete' })}
      </Button>
      <Button
        variant="contained"
        disableElevation
        fullWidth
        onClick={closeOverlay}
      >
        {intl.formatMessage({ id: 'cancel' })}
      </Button>
    </Modal>
  );
}
