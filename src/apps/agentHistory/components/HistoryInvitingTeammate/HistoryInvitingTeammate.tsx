import { Box } from '@material-ui/core';
import { AgentHistoryEventTypes } from 'apps/agentHistory/models/AgentHistory.model';
import { IUser } from 'models/Collaborator.model';
import { Routes } from 'models/Router.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useStyles } from './HistoryInvitingTeammate.styles';

export function HistoryInvitingTeammate({ eventType, triggeredUser }: {
  eventType: AgentHistoryEventTypes.UserInvitedByTeammate | AgentHistoryEventTypes.UserInvitedTeammate;
  triggeredUser: IUser;
}) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" className={classes.status}>
      <Box mr={1} color="common.black">
        {intl.formatMessage({ id: `AgentHistory.invitingTeammate.${eventType}` })}
      </Box>
      <Box color="common.black75" mr={1}>
        {triggeredUser?._email?.address}
      </Box>
      <Box>
        <Link className={classes.link} to={`${Routes.collaborators.agentProfile.root}/${triggeredUser?._id}`}>
          {triggeredUser.firstName}
          {' '}
          {triggeredUser.lastName}
        </Link>
      </Box>
    </Box>
  );
}
