import { PageLoader } from 'apps/layout';
import { useOverlay, Modal } from 'apps/overlay';
import Img from 'assets/modal-team-invite.svg';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { TeamInviteForm } from '../TeamInviteForm/TeamInviteForm';
import { useStyles } from './TeamInviteModal.styles';

export function TeamInviteModal({ onSubmit, isPosting }) {
  const intl = useIntl();
  const classes = useStyles();
  const [, closeOverlay] = useOverlay();

  const handleSubmit = useCallback((data) => onSubmit(data), [onSubmit]);

  return (
    <Modal
      onClose={closeOverlay}
      imgSrc={Img}
      title={intl.formatMessage({ id: 'teamTable.inviteModal.title' })}
      subtitle={intl.formatMessage({ id: 'teamTable.inviteModal.subtitle' })}
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
