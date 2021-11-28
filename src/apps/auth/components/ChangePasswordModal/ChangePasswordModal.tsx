import { ErrorStatuses } from 'models/Error.model';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Box, Button, InputLabel, TextField } from '@material-ui/core';
import { notification } from 'apps/ui';
import { Modal } from 'apps/overlay';
import { QATags } from 'models/QA.model';
import { PASSWORD_REG_EXP } from 'lib/validations';
import Img from 'assets/modal-change-pass.svg';
import { passwordChange } from '../../state/auth.actions';
import { AuthInputTypes } from '../../models/Auth.model';

interface ChangePasswordModalInputs {
  [AuthInputTypes.OldPassword]: string;
  [AuthInputTypes.Password]: string;
  [AuthInputTypes.RepeatPassword]: string;
}

export function ChangePasswordModal({ onClose }: {
  onClose: () => void;
}) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting } } = useForm<ChangePasswordModalInputs>();

  const oldPasswordRegister = register(AuthInputTypes.OldPassword, { required: intl.formatMessage({ id: 'validations.required' }) });
  const passwordRegister = register(AuthInputTypes.Password, {
    required: intl.formatMessage({ id: 'validations.required' }),
    pattern: {
      value: PASSWORD_REG_EXP,
      message: intl.formatMessage({ id: 'validations.password' }),
    },
    deps: [AuthInputTypes.RepeatPassword],
  });
  const passwordWatch = watch(AuthInputTypes.Password);

  const repeatPasswordRegister = register(AuthInputTypes.RepeatPassword, {
    required: intl.formatMessage({ id: 'validations.required' }),
    validate: (value) => value === passwordWatch || intl.formatMessage({ id: 'Settings.changePasswordModal.passwordsDontMatch' }),
  });

  const handleFormSubmit: SubmitHandler<ChangePasswordModalInputs> = useCallback(async (data) => {
    const { password, oldPassword } = data;
    try {
      await dispatch(passwordChange({ password, oldPassword }));
      onClose();
    } catch (error) {
      switch (error?.response?.status) {
        case ErrorStatuses.ValidationError:
          setError(AuthInputTypes.OldPassword, {
            type: 'manual',
            message: intl.formatMessage({ id: 'personalSettings.errors.password' }),
          });
          break;
        case ErrorStatuses.PasswordWasUsedBefore:
          setError(AuthInputTypes.Password, {
            type: 'manual',
            message: intl.formatMessage({ id: 'PasswordReset.error.usedPassword' }),
          });
          break;
        case ErrorStatuses.TooManyRequests:
          notification.error(intl.formatMessage({ id: 'SignIn.form.error.tooManyRequest' }));
          break;
        default:
          notification.error(intl.formatMessage({ id: 'Error.common' }));
          break;
      }
    }
  }, [onClose, dispatch, setError, intl]);

  return (
    <Modal
      imgSrc={Img}
      title={intl.formatMessage({ id: 'Settings.companySettings.changePassword' })}
      subtitle={intl.formatMessage({ id: 'Settings.companySettings.subtitle' })}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box mb={4}>
          <InputLabel>
            {intl.formatMessage({ id: 'personalSettings.labels.oldPassword' })}
          </InputLabel>
          <TextField
            {...oldPasswordRegister}
            helperText={errors?.[AuthInputTypes.OldPassword]?.message}
            error={!!errors[AuthInputTypes.OldPassword]}
            inputProps={{ 'data-qa': QATags.Auth.ChangePassword.CurrentPasswordInput }}
            type="password"
            variant="outlined"
            margin="dense"
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <InputLabel>
            {intl.formatMessage({ id: 'personalSettings.labels.password' })}
          </InputLabel>
          <TextField
            {...passwordRegister}
            helperText={errors?.[AuthInputTypes.Password]?.message}
            error={!!errors[AuthInputTypes.Password]}
            inputProps={{ 'data-qa': QATags.Auth.ChangePassword.NewPasswordInput }}
            autoComplete="new-password"
            type="password"
            variant="outlined"
            margin="dense"
            fullWidth
          />
        </Box>
        <Box mb={4}>
          <InputLabel>
            {intl.formatMessage({ id: 'personalSettings.labels.repeatPassword' })}
          </InputLabel>
          <TextField
            {...repeatPasswordRegister}
            helperText={errors?.[AuthInputTypes.RepeatPassword]?.message}
            error={!!errors[AuthInputTypes.RepeatPassword]}
            inputProps={{ 'data-qa': QATags.Auth.ChangePassword.RepeatPasswordInput }}
            autoComplete="new-password"
            type="password"
            variant="outlined"
            margin="dense"
            fullWidth
          />
        </Box>
        <Button
          data-qa={QATags.Auth.ChangePassword.SubmitButton}
          type="submit"
          color="primary"
          variant="contained"
          disabled={isSubmitting}
          disableElevation
          fullWidth
        >
          {intl.formatMessage({ id: 'Settings.changePasswordModal.send' })}
        </Button>
        <Button
          data-qa={QATags.Auth.ChangePassword.CancelButton}
          variant="contained"
          disableElevation
          fullWidth
          onClick={onClose}
        >
          {intl.formatMessage({ id: 'cancel' })}
        </Button>
      </form>
    </Modal>
  );
}
