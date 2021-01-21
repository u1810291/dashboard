import { Box, Button } from '@material-ui/core';
import { PageLoader } from 'apps/layout';
import { useOverlay, Modal } from 'apps/overlay';
import Img from 'assets/modal-team-invite.svg';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { TeamInviteForm } from '../TeamInviteForm/TeamInviteForm';
import { useStyles } from './TeamInviteModal.styles';
import { QATags } from '../../../../models/QA.model';

export function TeamInviteModal({ onSubmit, isPosting }) {
  const intl = useIntl();
  const classes = useStyles();
  const formRef = React.createRef();
  const [, closeOverlay] = useOverlay();

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
      className={classes.modal}
      wideHeader
    >
      <TeamInviteForm
        innerRef={formRef}
        onSubmit={handleSubmit}
      />
      <Box className={classes.buttonWrapper}>
        <Button
          data-qa={QATags.Collaborators.SendButton}
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
      </Box>
      {isPosting && <PageLoader />}
    </Modal>
  );
}
