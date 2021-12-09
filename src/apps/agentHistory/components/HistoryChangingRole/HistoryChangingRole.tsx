import { Box } from '@material-ui/core';
import { BoxLabeled } from 'apps/ui';
import { CollaboratorRoles, getCollaboratorOption, IUser } from 'models/Collaborator.model';
import { Routes } from 'models/Router.model';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { AgentHistoryEventTypes, ChangedValue } from '../../models/AgentHistory.model';
import { useStyles } from './HistoryChangingRole.styles';

export function HistoryChangingRole({ eventType, updatedBy, triggeredUser, role }: {
  eventType: AgentHistoryEventTypes.UserChangedTeammateRole | AgentHistoryEventTypes.UserRoleChangedByTeammate;
  updatedBy: IUser;
  triggeredUser: IUser;
  role: ChangedValue<CollaboratorRoles>;
}) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" color="common.black">
      {eventType === AgentHistoryEventTypes.UserChangedTeammateRole ? (
        <>
          <BoxLabeled mr={4.5} label={intl.formatMessage({ id: 'AgentHistory.agentInformation.name' })}>
            <Link className={classes.link} to={`${Routes.collaborators.agentProfile.root}/${triggeredUser?._id}`}>
              {`${triggeredUser?.firstName} ${triggeredUser?.lastName}`}
            </Link>
          </BoxLabeled>
          <BoxLabeled label={intl.formatMessage({ id: 'AgentHistory.agentInformation.role' })} mr={4.5}>
            <Box display="flex" alignItems="center" fontWeight="bold">
              <Box className={classes.role}>
                {role?.prevValue && intl.formatMessage({ id: getCollaboratorOption(role?.prevValue)?.label || 'Error.intl' })}
              </Box>
              <Box display="flex" mx={1} fontSize={17} color="common.black75">
                <FiArrowRight />
              </Box>
              <Box className={classes.role}>
                {role?.nextValue && intl.formatMessage({ id: getCollaboratorOption(role?.nextValue)?.label || 'Error.intl' })}
              </Box>
            </Box>
          </BoxLabeled>
        </>
      ) : (
        <>
          {updatedBy._id !== triggeredUser?._id && (
            <BoxLabeled mr={4.5} label={intl.formatMessage({ id: 'AgentHistory.userRoleChangedByTeammate.teammate.label' })}>
              <Link className={classes.link} to={`${Routes.collaborators.agentProfile.root}/${triggeredUser?._id}`}>
                {`${triggeredUser?.firstName} ${triggeredUser?.lastName}`}
              </Link>
            </BoxLabeled>
          )}
          <BoxLabeled label={intl.formatMessage({ id: 'AgentHistory.agentInformation.role' })} mr={4.5}>
            <Box display="flex" alignItems="center" fontWeight="bold">
              <Box className={classes.role}>
                {role?.prevValue && intl.formatMessage({ id: getCollaboratorOption(role.prevValue)?.label || 'Error.intl' })}
              </Box>
              <Box display="flex" mx={1} fontSize={17} color="common.black75">
                <FiArrowRight />
              </Box>
              <Box className={classes.role}>
                {role?.nextValue && intl.formatMessage({ id: getCollaboratorOption(role.nextValue)?.label || 'Error.intl' })}
              </Box>
            </Box>
          </BoxLabeled>
        </>
      )}
    </Box>
  );
}
