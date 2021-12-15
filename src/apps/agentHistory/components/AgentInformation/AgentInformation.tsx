import React, { useCallback, useState, useMemo } from 'react';
import { FiChevronDown, FiEdit3, FiSave } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Grid, Input, MenuItem, Paper, Select } from '@material-ui/core';
import { ButtonOutlined, notification, Spinner, UserRoundAvatar } from 'apps/ui';
import { DateFormat, utcToLocalFormat } from 'lib/date';
import { Collaborator, CollaboratorOptions, CollaboratorRoles } from 'models/Collaborator.model';
import { QATags } from 'models/QA.model';
import { selectOwnerId } from 'state/merchant/merchant.selectors';
import { useForm, useFormState } from 'react-hook-form';
import { collaboratorUpdate } from 'apps/collaborators/state/collaborator.actions';
import { difference } from 'lib/object';
import classnames from 'classnames';
import { useConfirmChangeRole } from 'apps/collaborators';
import { useStyles } from './AgentInformation.styles';

interface FormAgentInformation {
    role?: CollaboratorRoles;
    firstName?: string;
    lastName?: string;
}

export function AgentInformation({ collaborator }: {
  collaborator: Collaborator;
}) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { id: collaboratorId } = useParams();
  const classes = useStyles();
  const { user } = collaborator || {};
  const defaultValues = useMemo<FormAgentInformation>(() => ({ role: collaborator?.role, firstName: user?.firstName, lastName: user?.lastName }), [collaborator?.role, user?.firstName, user?.lastName]);
  const { register, handleSubmit, setValue, watch, reset, control } = useForm<FormAgentInformation>({ defaultValues });
  const { isSubmitting } = useFormState({ control });
  const values = watch();
  const changeRole = useConfirmChangeRole(collaborator?.role);
  const ownerId = useSelector(selectOwnerId);
  const isOwnerPage = useMemo(() => user?.id === ownerId, [ownerId, user?.id]);
  const labelSelectedRole = CollaboratorOptions.find((item) => item.value === collaborator?.role)?.label;

  const ButtonIcon = useMemo(() => {
    if (isSubmitting) {
      return <Spinner />;
    }
    if (isEditing) {
      return <FiSave />;
    }
    return <FiEdit3 />;
  }, [isEditing, isSubmitting]);

  const handleSubmitForm = useCallback(async (data) => {
    if (!user?.id) {
      return;
    }
    const diff: FormAgentInformation = difference(data, defaultValues);
    if (Object.keys(diff).length > 0) {
      await dispatch(collaboratorUpdate(user.id, { ...diff }));
    }
  }, [defaultValues, dispatch, user.id]);

  const handleRoleChange = useCallback((event) => setValue('role', event.target.value), [setValue]);
  const handleSwitchMode = useCallback(async () => {
    if (isEditing) {
      try {
        await changeRole({ id: user.id, newRole: values.role });
        await handleSubmit(handleSubmitForm)();
      } catch (error) {
        reset(defaultValues);
        if (error) {
          notification.error(intl.formatMessage({
            id: `Settings.teamSettings.update.${error.response?.data?.name}`,
            defaultMessage: intl.formatMessage({ id: 'Error.common' }),
          }));
          console.error(error);
        }
      }
    }
    setIsEditing(!isEditing);
  }, [changeRole, defaultValues, handleSubmit, handleSubmitForm, intl, isEditing, reset, user.id, values.role]);

  if (!collaborator) {
    return null;
  }

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2} color="common.black75" fontWeight="bold">
          {intl.formatMessage({ id: 'AgentHistory.agentInformation.agent' })}
        </Box>
        <Grid container justifyContent="space-between" spacing={2} alignItems="center">
          <Grid item xs={12} lg={2}>
            <Grid container alignItems="center" wrap="nowrap">
              <Box width={50} height={50} mr={1} flexShrink={0}>
                <UserRoundAvatar uniqueId={collaboratorId} name={user?.fullName} />
              </Box>
              <Grid item>
                <Box mb={0.2} color="common.black90" fontWeight="bold" className={classes.value}>
                  {isEditing ? (<Input disabled={isSubmitting} disableUnderline className={classes.input} {...register('firstName')} />) : user?.firstName}
                </Box>
                <Box color="common.black75">
                  {intl.formatMessage({ id: 'AgentHistory.agentInformation.firstName' })}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} lg={2} item>
            <Box mb={0.2} color="common.black90" fontWeight="bold" className={classes.value}>
              {isEditing ? (<Input disabled={isSubmitting} disableUnderline className={classes.input} {...register('lastName')} />) : user?.lastName}
            </Box>
            <Box color="common.black75">
              {intl.formatMessage({ id: 'AgentHistory.agentInformation.lastName' })}
            </Box>
          </Grid>
          <Grid item xs={12} lg="auto">
            <Box mb={0.2} color="common.black90" fontWeight="bold" className={classes.value}>
              {user?.email}
            </Box>
            <Box color="common.black75">
              {intl.formatMessage({ id: 'AgentHistory.agentInformation.email' })}
            </Box>
          </Grid>
          <Grid item xs={12} lg="auto">
            {isOwnerPage
              ? (<Box mb={0.2} color="common.black90" fontWeight="bold">{intl.formatMessage({ id: 'teamTable.roles.owner' })}</Box>)
              : isEditing
                ? (
                  <Select
                    disabled={isSubmitting}
                    value={values.role}
                    onChange={handleRoleChange}
                    className={classes.select}
                    disableUnderline
                    IconComponent={FiChevronDown}
                    data-qa={QATags.AgentHistory.AgentRoleSelect}
                  >
                    {CollaboratorOptions.map((role) => (
                      <MenuItem key={role.value} value={role.value}>
                        {intl.formatMessage({ id: role.label })}
                      </MenuItem>
                    ))}
                  </Select>
                )
                : (
                  <Box mb={0.2} color="common.black90" fontWeight="bold">{intl.formatMessage({ id: isOwnerPage ? 'teamTable.roles.owner' : labelSelectedRole })}</Box>
                )}
            <Box mt={0.3} color="common.black75">
              {intl.formatMessage({ id: 'AgentHistory.agentInformation.role' })}
            </Box>
          </Grid>
          <Grid item xs={12} lg={isOwnerPage ? 2 : 'auto'}>
            <Box mb={0.3} color="common.black90" fontWeight="bold">
              {utcToLocalFormat(user?.dateCreated, DateFormat.DateTime)}
            </Box>
            <Box color="common.black75">
              {intl.formatMessage({ id: 'AgentHistory.agentInformation.dateOfRegistration' })}
            </Box>
          </Grid>
          {!isOwnerPage && (
          <Grid item xs={12} lg={1}>
            <ButtonOutlined className={classnames({ [classes.button]: isEditing, [classes.buttonLoading]: isSubmitting })} variant={isEditing ? 'contained' : 'outlined'} disabled={isSubmitting} onClick={handleSwitchMode}>
              <Box display="flex" alignItems="center" mr={0.2}>
                {ButtonIcon}
              </Box>
              {intl.formatMessage({ id: isEditing ? 'AgentHistory.agentInformation.buttons.save' : 'AgentHistory.agentInformation.buttons.edit' })}
            </ButtonOutlined>
          </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
}
