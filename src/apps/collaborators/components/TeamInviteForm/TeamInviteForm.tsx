import React, { useCallback } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, InputLabel, Box, Button } from '@material-ui/core';
import { useFormatMessage } from 'apps/intl';
import { notification } from 'apps/ui';
import { CLEAN_TEXT_REG_EXP, EMAIL_REG_EXP } from 'lib/validations';
import { CollaboratorInputTypes, CollaboratorOptions, CollaboratorRoles } from 'models/Collaborator.model';
import { QATags } from 'models/QA.model';
import { RoleField } from '../RoleField/RoleField';
import { useStyles } from './TeamInviteForm.styles';

interface TeamInviteFormInputs {
  [CollaboratorInputTypes.FirstName]: string;
  [CollaboratorInputTypes.LastName]: string;
  [CollaboratorInputTypes.Email]: string;
  [CollaboratorInputTypes.Role]: CollaboratorRoles;
}

export function TeamInviteForm({ onSubmit, onClose }: {
  onSubmit: (data: TeamInviteFormInputs) => void;
  onClose: () => void;
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();

  const { register, handleSubmit, control, formState: { errors } } = useForm<TeamInviteFormInputs>({
    defaultValues: {
      [CollaboratorInputTypes.Role]: CollaboratorRoles.AGENT,
    },
  });

  const emailRegister = register(CollaboratorInputTypes.Email, {
    required: formatMessage({ id: 'validations.required' }),
    pattern: {
      value: EMAIL_REG_EXP,
      message: formatMessage({ id: 'validations.email' }),
    },
  });
  const firstNameRegister = register(CollaboratorInputTypes.FirstName, {
    required: formatMessage({ id: 'validations.required' }),
    pattern: {
      value: CLEAN_TEXT_REG_EXP,
      message: formatMessage({ id: 'validations.cleanText' }),
    },
  });
  const lastNameRegister = register(CollaboratorInputTypes.LastName, {
    required: formatMessage({ id: 'validations.required' }),
    pattern: {
      value: CLEAN_TEXT_REG_EXP,
      message: formatMessage({ id: 'validations.cleanText' }),
    },
  });

  const handleFormSubmit: SubmitHandler<TeamInviteFormInputs> = useCallback((data) => {
    try {
      onSubmit(data);
    } catch (error) {
      notification.error(formatMessage({ id: 'Error.common' }));
    }
  }, [onSubmit, formatMessage]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box className={classes.form}>
        <Box className={classes.wrapper}>
          <Box mb={{ xs: 4, lg: 2 }}>
            <InputLabel>
              {formatMessage({ id: 'teamTable.invite.form.labels.firstName' })}
            </InputLabel>
            <TextField
              {...firstNameRegister}
              inputProps={{ 'data-qa': QATags.Collaborators.FirstNameInput }}
              variant="outlined"
              margin="dense"
              fullWidth
              helperText={errors?.[CollaboratorInputTypes.FirstName]?.message}
              error={!!errors?.[CollaboratorInputTypes.FirstName]}
            />
          </Box>
          <Box mb={{ xs: 4, lg: 2 }}>
            <InputLabel>
              {formatMessage({ id: 'teamTable.invite.form.labels.lastName' })}
            </InputLabel>
            <TextField
              {...lastNameRegister}
              inputProps={{ 'data-qa': QATags.Collaborators.LastNameInput }}
              variant="outlined"
              margin="dense"
              fullWidth
              helperText={errors?.[CollaboratorInputTypes.LastName]?.message}
              error={!!errors?.[CollaboratorInputTypes.LastName]}
            />
          </Box>
          <Box mb={4}>
            <InputLabel>
              {formatMessage({ id: 'teamTable.invite.form.labels.email' })}
            </InputLabel>
            <TextField
              {...emailRegister}
              inputProps={{ 'data-qa': QATags.Collaborators.EmailInput }}
              type="input"
              variant="outlined"
              margin="dense"
              fullWidth
              helperText={errors?.[CollaboratorInputTypes.Email]?.message}
              error={!!errors?.[CollaboratorInputTypes.Email]}
            />
          </Box>
        </Box>
        <Box mb={4} className={classes.wrapper}>
          <Controller
            render={({ field }) => (
              <RoleField
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                options={CollaboratorOptions}
              />
            )}
            name={CollaboratorInputTypes.Role}
            control={control}
          />
        </Box>
      </Box>

      <Box className={classes.buttonWrapper}>
        <Button
          data-qa={QATags.Collaborators.SendButton}
          type="submit"
          color="primary"
          variant="contained"
          disableElevation
          fullWidth
        >
          {formatMessage({ id: 'teamTable.invite.form.btn.send' })}
        </Button>
        <Button
          variant="contained"
          disableElevation
          fullWidth
          onClick={onClose}
        >
          {formatMessage({ id: 'cancel' })}
        </Button>
      </Box>
    </form>
  );
}
