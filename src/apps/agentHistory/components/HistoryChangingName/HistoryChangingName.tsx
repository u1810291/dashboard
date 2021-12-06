import { Box } from '@material-ui/core';
import { BoxLabeled } from 'apps/ui';
import { selectUserId } from 'apps/user/state/user.selectors';
import { IUser } from 'models/Collaborator.model';
import { Routes } from 'models/Router.model';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AgentHistoryEventTypes, ChangedValue } from '../../models/AgentHistory.model';
import { useStyles } from './HistoryChangingName.styles';

export function HistoryChangingName({ eventType, triggeredUser, firstName, lastName }: {
  eventType: AgentHistoryEventTypes.UserChangedTeammateName | AgentHistoryEventTypes.UserNameChangedByTeammate;
  triggeredUser: IUser;
  firstName: ChangedValue<string>;
  lastName: ChangedValue<string>;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const userId = useSelector(selectUserId);

  return (
    <Box display="flex" alignItems="center" color="common.black" fontWeight="bold">
      {eventType === AgentHistoryEventTypes.UserChangedTeammateName ? (
        <>
          <BoxLabeled label={intl.formatMessage({ id: 'AgentHistory.userChangedTeammateName.oldName' })}>
            {`${firstName.prevValue} ${lastName.prevValue}`}
          </BoxLabeled>
          <Box display="flex" mx={1} fontSize={17} color="common.black75">
            <FiArrowRight />
          </Box>
          <BoxLabeled label={intl.formatMessage({ id: 'AgentHistory.userChangedTeammateName.newName' })}>
            <Link className={classes.contrastLink} to={`${Routes.collaborators.agentProfile.root}/${triggeredUser?._id}`}>
              {`${firstName.nextValue} ${lastName.nextValue}`}
            </Link>
          </BoxLabeled>
        </>
      ) : (
        <>
          {userId !== triggeredUser._id && (
            <BoxLabeled mr={4.5} label={intl.formatMessage({ id: 'AgentHistory.userRoleChangedByTeammate.teammate.label' })}>
              <Link className={classes.link} to={`${Routes.collaborators.agentProfile.root}/${triggeredUser?._id}`}>
                {`${triggeredUser.firstName} ${triggeredUser.lastName}`}
              </Link>
            </BoxLabeled>
          )}
          <BoxLabeled label={intl.formatMessage({ id: 'AgentHistory.userChangedTeammateName.oldName' })}>
            {`${firstName.prevValue} ${lastName.prevValue}`}
          </BoxLabeled>
          <Box display="flex" mx={1} fontSize={17} color="common.black75">
            <FiArrowRight />
          </Box>
          <BoxLabeled label={intl.formatMessage({ id: 'AgentHistory.userChangedTeammateName.newName' })}>
            {`${firstName.nextValue} ${lastName.nextValue}`}
          </BoxLabeled>
        </>
      )}
    </Box>
  );
}
