import Modal from 'components/modal';
import { closeOverlay } from 'components/overlay';
import React from 'react';
import { Button } from '@material-ui/core';
import { useIntl } from 'react-intl';
import Img from 'assets/modal-delete.svg';

export function DeleteModal({ className, user, onSubmit, ...modalProps }) {
  const intl = useIntl();

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
