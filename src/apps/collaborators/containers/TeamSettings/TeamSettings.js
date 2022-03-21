import { Box, Button, Paper, Typography } from '@material-ui/core';
import { useOverlay } from 'apps/overlay';
import { notification } from 'apps/ui';
import { useFormatMessage } from 'apps/intl';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TeamInviteModal } from '../../components/TeamInviteModal/TeamInviteModal';
import { collaboratorListLoad, inviteCollaborator } from '../../state/collaborator.actions';
import { selectCollaboratorCollectionWithOwnerModel, selectCollaboratorState } from '../../state/collaborator.selectors';
import { useStyles } from './TeamSettings.styles';
import { TeamTable } from '../../components/TeamTable/TeamTable';

export function TeamSettings() {
  const dispatch = useDispatch();
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const state = useSelector(selectCollaboratorState);
  const collaboratorList = useSelector(selectCollaboratorCollectionWithOwnerModel);

  const openInviteModal = useCallback(() => {
    createOverlay(
      <TeamInviteModal
        onSubmit={(data) => {
          closeOverlay();
          dispatch(inviteCollaborator(formatMessage, data));
        }}
        isPosting={state.isPosting}
      />,
    );
  }, [state, createOverlay]);

  useEffect(() => {
    if (LoadableAdapter.isPristine(collaboratorList)) {
      try {
        dispatch(collaboratorListLoad());
      } catch (error) {
        notification.error(formatMessage('Error.common'));
        console.error(error);
      }
    }
  }, [collaboratorList, dispatch]);

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2}>
          <Typography variant="h3" className={classes.title}>
            {formatMessage('Settings.teamSettings.team')}
          </Typography>
        </Box>
        <Box mb={2}>
          <TeamTable list={collaboratorList} />
        </Box>
        <Box align="center">
          {collaboratorList.isLoaded && collaboratorList.value.length > 0 && (
          <Button
            variant="outlined"
            onClick={openInviteModal}
            className={classes.button}
          >
            {formatMessage('Settings.teamSettings.inviteTeammate')}
          </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
