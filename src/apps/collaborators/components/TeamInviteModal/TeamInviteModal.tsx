import React, { useCallback } from 'react';
import { useFormatMessage } from 'apps/intl';
import { PageLoader } from 'apps/layout';
import { useOverlay, Modal } from 'apps/overlay';
import Img from 'assets/modal-team-invite.svg';
import { TeamInviteForm } from '../TeamInviteForm/TeamInviteForm';
import { useStyles } from './TeamInviteModal.styles';

export function TeamInviteModal({ onSubmit, isPosting }) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const [, closeOverlay] = useOverlay();

  const handleSubmit = useCallback((data) => onSubmit(data), [onSubmit]);

  return (
    <Modal
      onClose={closeOverlay}
      imgSrc={Img}
      title={formatMessage({ id: 'teamTable.inviteModal.title' })}
      subtitle={formatMessage({ id: 'teamTable.inviteModal.subtitle' })}
      className={classes.modal}
      wideHeader
    >
      <TeamInviteForm
        onSubmit={handleSubmit}
        onClose={closeOverlay}
      />
      {isPosting && <PageLoader />}
    </Modal>
  );
}
