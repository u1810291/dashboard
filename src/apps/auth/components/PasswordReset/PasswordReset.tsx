import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { notification } from 'apps/ui';
import { Routes } from 'models/Router.model';
import { AuthInputTypes } from '../../models/Auth.model';
import { passwordReset } from '../../state/auth.actions';

interface PasswordResetInputs {
  [AuthInputTypes.Password]: string;
}

export function PasswordReset() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<PasswordResetInputs>();

  const passwordRegister = register(AuthInputTypes.Password, { required: intl.formatMessage({ id: 'validations.required' }) });

  const handleFormSubmit: SubmitHandler<PasswordResetInputs> = useCallback(async (data) => {
    const { password } = data;
    try {
      setIsSubmitting(true);
      await dispatch(passwordReset({ password, token }));
      setIsSubmitting(false);
      notification.success(intl.formatMessage({ id: 'PasswordReset.notification.passwordChanged' }));
      history.push(Routes.root);
    } catch (error) {
      setIsSubmitting(false);
      notification.error(intl.formatMessage({ id: 'PasswordReset.error.expiredLink' }));
    }
  }, [dispatch, token, history, intl]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Typography variant="h1" gutterBottom>
        {intl.formatMessage({ id: 'passwordReset.title' })}
      </Typography>
      <Typography variant="body1">
        {intl.formatMessage({ id: 'passwordReset.subtitle' })}
      </Typography>

      <Box mt={1}>
        <TextField
          {...passwordRegister}
          helperText={errors?.[AuthInputTypes.Password]?.message}
          error={!!errors[AuthInputTypes.Password]}
          label={intl.formatMessage({ id: 'SignIn.form.labels.password' })}
          type="password"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box mt={2}>
        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          color="primary"
          size="large"
        >
          {intl.formatMessage({ id: 'passwordReset.action' })}
        </Button>
      </Box>

      <Box mt={3}>
        <Link to={Routes.auth.signIn}>
          {intl.formatMessage({ id: 'PasswordRecovery.signin' })}
        </Link>
      </Box>
    </form>
  );
}
