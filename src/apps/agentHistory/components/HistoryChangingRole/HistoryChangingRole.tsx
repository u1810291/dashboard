import Box from '@material-ui/core/Box';
import { BoxLabeled } from 'apps/ui';
import { useFormatMessage } from 'apps/intl';
import { CollaboratorRoles, getCollaboratorOption, IUser } from 'models/Collaborator.model';
import { Routes } from 'models/Router.model';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AgentHistoryEventTypes, IChangedValue } from '../../models/AgentHistory.model';
import { useStyles } from './HistoryChangingRole.styles';

export function HistoryChangingRole({ eventType, updatedBy, triggeredUser, role }: {
  eventType: AgentHistoryEventTypes.UserChangedTeammateRole | AgentHistoryEventTypes.UserRoleChangedByTeammate;
  updatedBy: IUser;
  triggeredUser: IUser;
  role: IChangedValue<CollaboratorRoles>;
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" color="common.black">
      {eventType === AgentHistoryEventTypes.UserChangedTeammateRole ? (
        <>
          <BoxLabeled mr={4.5} label={formatMessage('AgentHistory.agentInformation.name')}>
            <Link className={classes.link} to={`${Routes.collaborators.agentProfile.root}/${triggeredUser?._id}`}>
              {`${triggeredUser?.firstName} ${triggeredUser?.lastName}`}
            </Link>
          </BoxLabeled>
          <BoxLabeled label={formatMessage('AgentHistory.agentInformation.role')} mr={4.5}>
            <Box display="flex" alignItems="center" fontWeight="bold">
              <Box className={classes.role}>
                {role?.prevValue && formatMessage(getCollaboratorOption(role?.prevValue)?.label || 'Error.intl')}
              </Box>
              <Box display="flex" mx={1} fontSize={17} color="common.black75">
                <FiArrowRight />
              </Box>
              <Box className={classes.role}>
                {role?.nextValue && formatMessage(getCollaboratorOption(role?.nextValue)?.label || 'Error.intl')}
              </Box>
            </Box>
          </BoxLabeled>
        </>
      ) : (
        <>
          {updatedBy._id !== triggeredUser?._id && (
            <BoxLabeled mr={4.5} label={formatMessage('AgentHistory.userRoleChangedByTeammate.teammate.label')}>
              <Link className={classes.link} to={`${Routes.collaborators.agentProfile.root}/${triggeredUser?._id}`}>
                {`${triggeredUser?.firstName} ${triggeredUser?.lastName}`}
              </Link>
            </BoxLabeled>
          )}
          <BoxLabeled label={formatMessage('AgentHistory.agentInformation.role')} mr={4.5}>
            <Box display="flex" alignItems="center" fontWeight="bold">
              <Box className={classes.role}>
                {role?.prevValue && formatMessage(getCollaboratorOption(role.prevValue)?.label || 'Error.intl')}
              </Box>
              <Box display="flex" mx={1} fontSize={17} color="common.black75">
                <FiArrowRight />
              </Box>
              <Box className={classes.role}>
                {role?.nextValue && formatMessage(getCollaboratorOption(role.nextValue)?.label || 'Error.intl')}
              </Box>
            </Box>
          </BoxLabeled>
        </>
      )}
    </Box>
  );
}
