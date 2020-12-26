import { Box, Button, Typography, Paper } from '@material-ui/core';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import React, { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'apps/ui';
import { useOverlay } from 'apps/overlay';
import { TeamInviteModal } from '../../components/TeamInviteModal/TeamInviteModal';
import { TeamTable } from '../../components/TeamTable/TeamTable';
import { collaboratorAdd, collaboratorListLoad, collaboratorRemove, collaboratorUpdate } from '../../state/collaborator.actions';
import { selectCollaboratorCollection, selectCollaboratorState } from '../../state/collaborator.selectors';
import { useStyles } from './TeamSettings.styles';

export function TeamSettings() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const state = useSelector(selectCollaboratorState);
  const collaboratorList = useSelector(selectCollaboratorCollection);

  useEffect(() => {
    if (LoadableAdapter.isPristine(collaboratorList)) {
      try {
        dispatch(collaboratorListLoad());
      } catch (error) {
        notification.error(intl.formatMessage({ id: 'Error.common' }));
        console.error(error);
      }
    }
  }, [collaboratorList, dispatch, intl]);

  const handleUpdate = useCallback((id, data) => {
    try {
      dispatch(collaboratorUpdate(id, data));
    } catch (error) {
      notification.error(intl.formatMessage({
        id: `Settings.teamSettings.update.${error.response?.data?.name}`,
        defaultMessage: intl.formatMessage({ id: 'Error.common' }),
      }));
      console.error(error);
    }
  }, [dispatch, intl]);

  const handleRemove = useCallback((id) => {
    try {
      dispatch(collaboratorRemove(id));
    } catch (error) {
      notification.error(intl.formatMessage({
        id: `Settings.teamSettings.remove.${error.response?.data?.name}`,
        defaultMessage: intl.formatMessage({ id: 'Error.common' }),
      }));
      console.error(error);
    }
  }, [dispatch, intl]);

  const handleInviteSubmit = useCallback(async (data) => {
    closeOverlay();
    try {
      await dispatch(collaboratorAdd({
        role: parseInt(data.role, 10),
        user: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      }));
      notification.info(intl.formatMessage({ id: 'teamTable.inviteSuccess.description' }));
    } catch (error) {
      notification.error(intl.formatMessage({
        id: `Settings.teamSettings.submit.${error.response?.data?.name}`,
        defaultMessage: intl.formatMessage({ id: 'Error.common' }),
      }));
      console.error(error);
    }
  }, [dispatch, intl, closeOverlay]);

  const openInviteModal = useCallback(() => {
    createOverlay(
      <TeamInviteModal
        onSubmit={handleInviteSubmit}
        isPosting={state.isPosting}
      />,
    );
  }, [handleInviteSubmit, state, createOverlay]);

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2}>
          <Typography variant="h3" className={classes.title}>
            {intl.formatMessage({ id: 'Settings.teamSettings.team' })}
          </Typography>
        </Box>
        <Box mb={2}>
          <TeamTable
            list={collaboratorList}
            onInvite={openInviteModal}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        </Box>
        <Box align="center">
          {collaboratorList.isLoaded && collaboratorList.value.length > 0 && (
          <Button
            variant="outlined"
            onClick={openInviteModal}
            className={classes.button}
          >
            {intl.formatMessage({ id: 'Settings.teamSettings.inviteTeammate' })}
          </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
