import React, { useCallback, useState, useMemo } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Grid, MenuItem, Paper, Select } from '@material-ui/core';
import { collaboratorUpdate } from 'apps/collaborators/state/collaborator.actions';
import { notification, UserRoundAvatar } from 'apps/ui';
import { DateFormat, utcToLocalFormat } from 'lib/date';
import { Collaborator, CollaboratorOptions, CollaboratorRoles } from 'models/Collaborator.model';
import { QATags } from 'models/QA.model';
import { selectOwnerId } from 'state/merchant/merchant.selectors';
import { useStyles } from './AgentInformation.styles';

export function AgentInformation({ collaborator }: {
  collaborator: Collaborator;
}) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState<CollaboratorRoles>(collaborator?.role);
  const { id: collaboratorId } = useParams();
  const ownerId = useSelector(selectOwnerId);
  const classes = useStyles();
  const { user } = collaborator || {};
  const isOwnerPage = useMemo(() => user?.id === ownerId, [ownerId, user?.id]);

  const handleUpdate = useCallback(async (id: string, data: { role: CollaboratorRoles }) => {
    try {
      await dispatch(collaboratorUpdate(id, data));
      setSelectedRole(data?.role);
    } catch (error: any) {
      notification.error(intl.formatMessage({
        id: `Settings.teamSettings.update.${error.response?.data?.name}`,
        defaultMessage: intl.formatMessage({ id: 'Error.common' }),
      }));
      console.error(error);
    }
  }, [dispatch, intl]);

  const handleRoleChange = useCallback((id: string) => (e) => {
    if (isOwnerPage) {
      return;
    }
    handleUpdate(id, { role: e?.target?.value });
  }, [handleUpdate, isOwnerPage]);

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
            {isOwnerPage
              ? (<Box mb={0.2} color="common.black90" fontWeight="bold">{intl.formatMessage({ id: 'teamTable.roles.owner' })}</Box>)
              : (
                <Select
                  className={classes.select}
                  disableUnderline
                  onChange={handleRoleChange(user.id)}
                  value={selectedRole}
                  IconComponent={FiChevronDown}
                  data-qa={QATags.AgentHistory.AgentRoleSelect}
                >
                  {CollaboratorOptions.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      {intl.formatMessage({ id: role.label })}
                    </MenuItem>
                  ))}
                </Select>
              )}
            <Box mt={0.2} color="common.black75">
              {intl.formatMessage({ id: 'AgentHistory.agentInformation.role' })}
            </Box>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Box mb={0.2} color="common.black90" fontWeight="bold">
              {utcToLocalFormat(user?.dateCreated, DateFormat.DateTime)}
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
