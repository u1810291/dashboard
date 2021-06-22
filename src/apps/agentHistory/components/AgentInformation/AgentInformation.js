import { Box, Grid, MenuItem, Paper, Select } from '@material-ui/core';
import { collaboratorUpdate } from 'apps/collaborators/state/collaborator.actions';
import { notification } from 'apps/ui';
import { UserRoundAvatar } from 'apps/ui/components/UserRoundAvatar/UserRoundAvatar';
import { DateFormat, formatDate } from 'lib/date';
import { CollaboratorOptions } from 'models/Collaborator.model';
import { QATags } from 'models/QA.model';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useStyles } from './AgentInformation.styles';

export function AgentInformation({ collaborator }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState(collaborator?.role);
  const { id: collaboratorId } = useParams();

  const classes = useStyles();
  const { user } = collaborator || {};

  const handleUpdate = useCallback(async (id, data) => {
    try {
      await dispatch(collaboratorUpdate(id, data));
      setSelectedRole(data?.role);
    } catch (error) {
      notification.error(intl.formatMessage({
        id: `Settings.teamSettings.update.${error.response?.data?.name}`,
        defaultMessage: intl.formatMessage({ id: 'Error.common' }),
      }));
      console.error(error);
    }
  }, [dispatch, intl]);

  const handleRoleChange = useCallback((id, role) => {
    handleUpdate(id, { role });
  }, [handleUpdate]);

  if (!collaborator) {
    return null;
  }

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2} color="common.black75" fontWeight="bold">
          {intl.formatMessage({ id: 'AgentHistory.agentInformation.agent' })}
        </Box>
        <Grid container justify="space-between" spacing={2} alignItems="center">
          <Grid item container xs={12} lg={3} alignItems="center" wrap="nowrap">
            <Box width={50} height={50} mr={1} flexShrink={0}>
              <UserRoundAvatar uniqueId={collaboratorId} name={user?.firstName} />
            </Box>
            <Grid item>
              <Box mb={0.2} color="common.black90" fontWeight="bold" className={classes.value}>
                {user?.fullName}
              </Box>
              <Box color="common.black75">
                {intl.formatMessage({ id: 'AgentHistory.agentInformation.name' })}
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box mb={0.2} color="common.black90" fontWeight="bold" className={classes.value}>
              {user?.email}
            </Box>
            <Box color="common.black75">
              {intl.formatMessage({ id: 'AgentHistory.agentInformation.email' })}
            </Box>
          </Grid>
          <Grid item xs={12} lg={2}>
            <Select
              className={classes.select}
              disableUnderline
              onChange={(e) => handleRoleChange(user.id, e.target.value)}
              value={selectedRole}
              IconComponent={FiChevronDown}
              data-qa={QATags.AgentHistory.AgentRoleSelect}
            >
              {CollaboratorOptions.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {intl.formatMessage({ id: role.label })}
                </MenuItem>
              ))}
            </Select>
            <Box mt={0.2} color="common.black75">
              {intl.formatMessage({ id: 'AgentHistory.agentInformation.role' })}
            </Box>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Box mb={0.2} color="common.black90" fontWeight="bold">
              {formatDate(moment(user?.dateCreated), DateFormat.DateTime) }
            </Box>
            <Box color="common.black75">
              {intl.formatMessage({ id: 'AgentHistory.agentInformation.dateOfRegistration' })}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
