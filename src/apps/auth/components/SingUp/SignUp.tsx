import React, { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Page404 } from 'apps/layout';
import { notification } from 'apps/ui';
import { useQuery } from 'lib/url';
import { EMAIL_REG_EXP, isBusinessEmail, PASSWORD_REG_EXP } from 'lib/validations';
import { DEFAULT_LOCALE } from 'models/Intl.model';
import { dashboardUpdate } from 'state/merchant/merchant.actions';
import { Routes } from 'models/Router.model';
import { QATags } from 'models/QA.model';
import { AuthInputTypes, isValidCheckSum } from '../../models/Auth.model';
import { signUp } from '../../state/auth.actions';

interface SignUpInputs {
  [AuthInputTypes.Password]: string;
  [AuthInputTypes.Email]: string;
}

export function SignUp() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpInputs>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const query = useQuery();

  const emailRegister = register(AuthInputTypes.Email, {
    required: intl.formatMessage({ id: 'validations.required' }),
    pattern: {
      value: EMAIL_REG_EXP,
      message: intl.formatMessage({ id: 'validations.email' }),
    },
    validate: (v) => isBusinessEmail(v) || intl.formatMessage({ id: 'validations.personalEmail' }),
  });

  const passwordRegister = register(AuthInputTypes.Password, {
    required: intl.formatMessage({ id: 'validations.required' }),
    pattern: {
      value: PASSWORD_REG_EXP,
      message: intl.formatMessage({ id: 'validations.password' }),
    },
  });

  const handleFormSubmit: SubmitHandler<SignUpInputs> = useCallback(async (data) => {
    try {
      setIsSubmitting(true);
      await dispatch(signUp(data));
      await dispatch(dashboardUpdate({
        language: DEFAULT_LOCALE,
        usePlans: true,
      }));
      setIsSubmitting(false);
      history.push(Routes.root);
    } catch (e: any) {
      setIsSubmitting(false);
      // TODO: @ggrigorev rework signUp in DIO-773
      if (e?.response?.data?.details?.[0]?.type === 'string.email') {
        notification.error(intl.formatMessage({ id: 'validations.email' }));
      } else if (e?.response?.data?.details?.[0]?.path === '_email.address') {
        notification.error(intl.formatMessage({ id: 'validations.alreadyInUse' }));
      } else {
        notification.error(intl.formatMessage({ id: 'Error.common' }));
      }
    }
  }, [dispatch, intl, history]);

  if (!isValidCheckSum(query.token)) {
    return <Page404 />;
  }

  return (
    <Grid container direction="column" spacing={6} alignItems="stretch">
      <Grid item container spacing={1} direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h1">
            {intl.formatMessage({ id: 'signup.title' })}
          </Typography>
        </Grid>

        <Grid item>
          <Typography color="textSecondary" display="inline">
            {intl.formatMessage({ id: 'signup.subtitle' })}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid
            container
            spacing={6}
            direction="column"
            alignItems="stretch"
          >
            <Grid
              item
              container
              spacing={2}
              direction="column"
              alignItems="stretch"
            >
              <Grid item>
                <TextField
                  {...emailRegister}
                  type="input"
                  label={intl.formatMessage({ id: 'signup.form.labels.email' })}
                  InputLabelProps={{ shrink: true }}
                  helperText={errors?.[AuthInputTypes.Email]?.message}
                  error={!!errors[AuthInputTypes.Email]}
                  variant="outlined"
                  fullWidth
                  inputProps={{ 'data-qa': QATags.Auth.SignUp.EmailInput }}
                  placeholder={intl.formatMessage({ id: 'signup.form.placeholders.workEmail' })}
                />
              </Grid>
              <Grid item>
                <TextField
                  {...passwordRegister}
                  type="password"
                  label={intl.formatMessage({ id: 'signup.form.labels.password' })}
                  variant="outlined"
                  fullWidth
                  helperText={errors?.[AuthInputTypes.Password]?.message}
                  error={!!errors[AuthInputTypes.Password]}
                  inputProps={{ 'data-qa': QATags.Auth.SignUp.PasswordInput }}
                />
              </Grid>
            </Grid>

            <Grid item container direction="column">
              <Grid item>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  disabled={isSubmitting}
                  data-qa={QATags.Auth.SignUp.SignUpSubmitButton}
                >
                  {intl.formatMessage({ id: 'signup.action' })}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item>
        <Typography align="center">
          {intl.formatMessage({ id: 'signup.haveAccount' })}
          {' '}
          <Link data-qa={QATags.Auth.SignUp.LoginButton} to={Routes.auth.signIn}>
            {intl.formatMessage({ id: 'signup.haveAccount.link' })}
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}
