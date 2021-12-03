import { Box } from '@material-ui/core';
import { IUser } from 'models/Collaborator.model';
import { Routes } from 'models/Router.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { AgentHistoryEventTypes } from '../../models/AgentHistory.model';
import { useStyles } from './HistoryChangingRole.styles';

export function HistoryChangingRole({ eventType, triggeredUser }: {
  eventType: AgentHistoryEventTypes.UserRoleChangedByTeammate | AgentHistoryEventTypes.UserChangedTeammateRole;
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
