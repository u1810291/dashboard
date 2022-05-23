import Box from '@material-ui/core/Box';
import { BoxLabeled } from 'apps/ui';
import { useFormatMessage } from 'apps/intl';
import { IUser } from 'models/Collaborator.model';
import { Routes } from 'models/Router.model';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AgentHistoryEventTypes, IChangedValue } from '../../models/AgentHistory.model';
import { useStyles } from './HistoryChangingName.styles';

export function HistoryChangingName({ eventType, updatedBy, triggeredUser, firstName, lastName }: {
  eventType: AgentHistoryEventTypes.UserChangedTeammateName | AgentHistoryEventTypes.UserNameChangedByTeammate;
  updatedBy: IUser;
  triggeredUser: IUser;
  firstName: IChangedValue<string>;
  lastName: IChangedValue<string>;
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" color="common.black" fontWeight="bold">
      {eventType === AgentHistoryEventTypes.UserChangedTeammateName ? (
        <>
          <BoxLabeled label={formatMessage('AgentHistory.userChangedTeammateName.oldName')}>
            {`${firstName?.prevValue} ${lastName?.prevValue}`}
          </BoxLabeled>
          <Box display="flex" mx={1} fontSize={17} color="common.black75">
            <FiArrowRight />
          </Box>
          <BoxLabeled label={formatMessage('AgentHistory.userChangedTeammateName.newName')}>
            <Link className={classes.contrastLink} to={`${Routes.collaborators.agentProfile.root}/${triggeredUser?._id}`}>
              {`${firstName?.nextValue || firstName?.prevValue} ${lastName?.nextValue || lastName?.prevValue}`}
            </Link>
          </BoxLabeled>
        </>
      ) : (
        <>
          {updatedBy?._id !== triggeredUser?._id && (
            <BoxLabeled mr={4.5} label={formatMessage('AgentHistory.userRoleChangedByTeammate.teammate.label')}>
              <Link className={classes.link} to={`${Routes.collaborators.agentProfile.root}/${triggeredUser?._id}`}>
                {`${triggeredUser?.firstName} ${triggeredUser?.lastName}`}
              </Link>
            </BoxLabeled>
          )}
          <BoxLabeled label={formatMessage('AgentHistory.userChangedTeammateName.oldName')}>
            {`${firstName?.prevValue} ${lastName?.prevValue}`}
          </BoxLabeled>
          <Box display="flex" mx={1} fontSize={17} color="common.black75">
            <FiArrowRight />
          </Box>
          <BoxLabeled label={formatMessage('AgentHistory.userChangedTeammateName.newName')}>
            {`${firstName?.nextValue || firstName?.prevValue} ${lastName?.nextValue || lastName?.prevValue}`}
          </BoxLabeled>
        </>
      )}
    </Box>
  );
}
