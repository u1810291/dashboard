import React, { useCallback } from 'react';
import Modal from 'components/modal';
import { closeOverlay } from 'components/overlay';
import { useIntl } from 'react-intl';
import { Button } from '@material-ui/core';
import { PageLoader } from 'apps/layout';
import Img from 'assets/modal-team-invite.svg';
import TeamInviteForm from '../TeamInviteForm/TeamInviteForm';

export function TeamInviteModal({ onSubmit, isPosting }) {
  const intl = useIntl();
  const formRef = React.createRef();

  const handleSubmit = useCallback((data) => onSubmit(data), [onSubmit]);

  const handleInviteClick = useCallback(() => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  }, [formRef]);

  return (
    <Modal
      onClose={closeOverlay}
      imgSrc={Img}
      title={intl.formatMessage({ id: 'teamTable.inviteModal.title' })}
      subtitle={intl.formatMessage({ id: 'teamTable.inviteModal.subtitle' })}
    >
      <TeamInviteForm
        ref={formRef}
        handleSubmit={handleSubmit}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        disableElevation
        fullWidth
        onClick={handleInviteClick}
      >
        {intl.formatMessage({ id: 'teamTable.invite.form.btn.send' })}
      </Button>
      <Button
        variant="contained"
        disableElevation
        fullWidth
        onClick={closeOverlay}
      >
        {intl.formatMessage({ id: 'cancel' })}
      </Button>
      {isPosting && <PageLoader />}
    </Modal>
  );
}
