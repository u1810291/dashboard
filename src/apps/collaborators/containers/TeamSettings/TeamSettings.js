import { Button, Grid } from '@material-ui/core';
import { createOverlay } from 'components/overlay';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import React, { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { collaboratorAdd, collaboratorListLoad, collaboratorRemove, collaboratorUpdate } from '../../state/collaborator.actions';
import { selectCollaboratorCollection, selectCollaboratorState } from '../../state/collaborator.selectors';
import { TeamInviteModal } from '../../components/TeamInviteModal/TeamInviteModal';
import { TeamInviteSuccessModal } from '../../components/TeamInviteSuccessModal/TeamInviteSuccessModal';
import { TeamTable } from '../../components/TeamTable/TeamTable';
import { ReactComponent as InviteIcon } from './invite.svg';

export function TeamSettings() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const state = useSelector(selectCollaboratorState);
  const collaboratorList = useSelector(selectCollaboratorCollection);

  useEffect(() => {
    if (LoadableAdapter.isPristine(collaboratorList)) {
      dispatch(collaboratorListLoad());
    }
  }, [collaboratorList, dispatch]);

  const handleUpdate = useCallback((id, data) => {
    dispatch(collaboratorUpdate(id, data));
  }, [dispatch]);

  const handleRemove = useCallback((id) => {
    dispatch(collaboratorRemove(id));
  }, [dispatch]);

  const openInviteSuccessModal = useCallback(() => {
    createOverlay(
      <TeamInviteSuccessModal />);
  }, []);

  const handleInviteSubmit = useCallback(async (data) => {
    await dispatch(collaboratorAdd({
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
        onSubmit={handleInviteSubmit}
        isPosting={state.isPosting}
      />,
    );
  }, [handleInviteSubmit, state]);

  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={9}>
        <TeamTable
          list={collaboratorList}
          onInvite={openInviteModal}
          onUpdate={handleUpdate}
          onRemove={handleRemove}
        />
      </Grid>
      <Grid item xs={3}>
        {collaboratorList.isLoaded && collaboratorList.value.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={openInviteModal}
            startIcon={<InviteIcon />}
          >
            {intl.formatMessage({ id: 'settings.teamSettings.inviteTeammate' })}
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
