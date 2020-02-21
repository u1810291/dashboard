import { Button, Grid } from '@material-ui/core';
import { closeOverlay, createOverlay } from 'components/overlay';
import InviteSuccessModal from 'fragments/account/team-invite-modal/InviteSuccessModal';
import { TeamInviteModal } from 'fragments/account/team-invite-modal/TeamInviteModal';
import TeamTable from 'fragments/account/team-table';
import React, { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCollaborators, getCollaborators, patchCollaborators, postCollaborators } from 'state/collaborators/collaborator.actions';
import { selectCollaborators, selectCollaboratorState } from 'state/collaborators/collaborator.selectors';
import { ReactComponent as InviteIcon } from './invite.svg';

export function TeamSettings() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const collaborators = useSelector(selectCollaborators);
  const state = useSelector(selectCollaboratorState);

  const handleDeleteSubmit = useCallback((id) => dispatch(deleteCollaborators(id)), [dispatch]);

  const handleRoleChange = useCallback((id, role) => {
    dispatch(patchCollaborators(id, { role }));
  }, [dispatch]);

  const openInviteSuccessModal = useCallback(() => {
    createOverlay(
      <InviteSuccessModal onClose={closeOverlay} />);
  }, []);

  const handleInviteSubmit = useCallback(async (data) => {
    await dispatch(postCollaborators({
      role: parseInt(data.role, 10),
      user: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    }));
    openInviteSuccessModal();
  }, [openInviteSuccessModal, dispatch]);

  const openInviteModal = useCallback(() => {
    createOverlay(
      <TeamInviteModal
        onClose={closeOverlay}
        onSubmit={handleInviteSubmit}
        isPosting={state.isPosting}
      />,
    );
  }, [handleInviteSubmit, state]);

  useEffect(() => {
    dispatch(getCollaborators());
  }, [dispatch]);

  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={9}>
        <TeamTable
          onRoleChange={handleRoleChange}
          onDeleteSubmit={handleDeleteSubmit}
          collaborators={collaborators}
          isLoading={state.isLoading}
          isDeleting={state.isDeleting}
          isPatchingArray={state.isPatchingArray}
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={openInviteModal}
          startIcon={<InviteIcon />}
        >
          {intl.formatMessage({ id: 'settings.teamSettings.inviteTeammate' })}
        </Button>
      </Grid>
    </Grid>
  );
}
