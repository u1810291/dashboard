import { Box } from '@material-ui/core';
import { BoxLabeled } from 'apps/ui';
import { IUser } from 'models/Collaborator.model';
import { Routes } from 'models/Router.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { AgentHistoryEventTypes } from '../../models/AgentHistory.model';
import { useStyles } from './HistoryInvitingTeammate.styles';

export function HistoryInvitingTeammate({ eventType, triggeredUser }: {
  eventType: AgentHistoryEventTypes.UserInvitedTeammate | AgentHistoryEventTypes.UserInvitedByTeammate;
  triggeredUser: IUser;
}) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" color="common.black">
      {eventType === AgentHistoryEventTypes.UserInvitedTeammate ? (
        <>
          <BoxLabeled mr={4.5} label={intl.formatMessage({ id: 'AgentHistory.agentInformation.email' })}>
            <Box fontWeight="bold">
              {triggeredUser?._email?.address}
            </Box>
          </BoxLabeled>
          <BoxLabeled label={intl.formatMessage({ id: 'AgentHistory.agentInformation.name' })}>
            <Link className={classes.link} to={`${Routes.collaborators.agentProfile.root}/${triggeredUser?._id}`}>
              {`${triggeredUser?.firstName} ${triggeredUser?.lastName}`}
            </Link>
          </BoxLabeled>
        </>
      ) : (
        <BoxLabeled label={intl.formatMessage({ id: 'AgentHistory.userInvitedByTeammate.teammate.label' })}>
          <Link className={classes.link} to={`${Routes.collaborators.agentProfile.root}/${triggeredUser?._id}`}>
            {`${triggeredUser?.firstName} ${triggeredUser?.lastName}`}
          </Link>
        </BoxLabeled>
      )}
    </Box>
  );
}
