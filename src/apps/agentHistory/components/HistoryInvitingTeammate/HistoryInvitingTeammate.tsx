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
  eventType: AgentHistoryEventTypes.UserInvitedByTeammate | AgentHistoryEventTypes.UserInvitedTeammate;
  triggeredUser: IUser;
}) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" color="common.black75">
      <BoxLabeled label={intl.formatMessage({ id: 'Email' })} mr={4.5}>
        <Box fontWeight="bold" color="common.black">
          {triggeredUser?._email?.address}
        </Box>
      </BoxLabeled>
      <BoxLabeled label={intl.formatMessage({ id: 'Name' })}>
        <Link className={classes.link} to={`${Routes.collaborators.agentProfile.root}/${triggeredUser?._id}`}>
          {triggeredUser.firstName}
          {' '}
          {triggeredUser.lastName}
        </Link>
      </BoxLabeled>
    </Box>
  );
}
