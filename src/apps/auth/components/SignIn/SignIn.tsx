import { Modal, useOverlay } from 'apps/overlay';
import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Grid, Typography, InputLabel, AppBar, Box, TextField } from '@material-ui/core';
import { notification } from 'apps/ui';
import { EMAIL_REG_EXP } from 'lib/validations';
import { ReactComponent as MatiLogo } from 'assets/metamap-logo.svg';
import { IntlButton } from 'apps/intl';
import { Routes } from 'models/Router.model';
import { ErrorStatuses } from 'models/Error.model';
import { QATags } from 'models/QA.model';
import { useStyles } from './SignIn.styles';
import { signIn } from '../../state/auth.actions';
import { AuthDescription } from '../AuthDescription/AuthDescription';
import { AuthInputTypes } from '../../models/Auth.model';
import UpdatePasswordIcon from '../../assets/update-password-icon.svg';

interface SignInInputs {
  [AuthInputTypes.Password]: string;
  [AuthInputTypes.Email]: string;
}

export function SignIn() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [createOverlay] = useOverlay();

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<SignInInputs>();

  const emailRegister = register(AuthInputTypes.Email, {
    required: intl.formatMessage({ id: 'validations.required' }),
    pattern: {
      value: EMAIL_REG_EXP,
      message: intl.formatMessage({ id: 'validations.email' }),
    },
  });
  const passwordRegister = register(AuthInputTypes.Password, { required: intl.formatMessage({ id: 'validations.required' }) });

  const handleFormSubmit: SubmitHandler<SignInInputs> = useCallback(async (data) => {
    try {
      await dispatch(signIn(data));
      history.push(Routes.root);
    } catch (error: any) {
      const status = error?.response?.status;

      switch (status) {
        case ErrorStatuses.WrongCredentials:
          setError(AuthInputTypes.Password, {
            type: 'manual',
            message: intl.formatMessage({ id: 'SignIn.form.error.wrongCredentials' }),
          });
          break;
        case ErrorStatuses.BlockedByMerchant:
          notification.error(intl.formatMessage({ id: 'SignIn.form.error.blocked' }));
          break;
        case ErrorStatuses.TooManyRequests:
          notification.error(intl.formatMessage({ id: 'SignIn.form.error.tooManyRequest' }));
          break;
        case ErrorStatuses.PasswordInvalid:
          createOverlay(<Modal
            title={intl.formatMessage({ id: 'SignIn.updatePasswordModal.title' })}
            subtitle={intl.formatMessage({ id: 'SignIn.updatePasswordModal.subtitle' })}
            imgSrc={UpdatePasswordIcon}
          />);
          break;
        default:
          notification.error(intl.formatMessage({ id: 'Error.common' }));
      }
    }
  }, [dispatch, history, intl, setError, createOverlay]);

  return (
    <Grid container className={classes.container}>
      <Grid className={classes.signIn} direction="column" container>
        <Grid className={classes.formWrapper} direction="column" container>
          <AppBar color="transparent" position="static" elevation={0} className={classes.appBar}>
            <IntlButton isSync={false} />
            <MatiLogo width={160} height={40} />
          </AppBar>
          <Box className={classes.form}>
            <Box mb={5}>
              <Typography variant="h1" gutterBottom>
                {intl.formatMessage({ id: 'SignIn.title' })}
              </Typography>
              <Grid container alignItems="baseline">
                <Typography variant="h4" className={classes.subtitle}>
                  {intl.formatMessage({ id: 'SignIn.subtitle' })}
                </Typography>
                &nbsp;
                <a href="https://www.metamap.com/mati-contact-us" className={classes.link}>
                  {intl.formatMessage({ id: 'SignIn.subtitle.link' })}
                </a>
              </Grid>
            </Box>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Grid container direction="column">
                <Grid item className={classes.inputWrapper}>
                  <InputLabel className={classes.label}>
                    {intl.formatMessage({ id: 'SignIn.form.labels.email' })}
                  </InputLabel>
                  <TextField
                    {...emailRegister}
                    inputProps={{ 'data-qa': QATags.Auth.SignIn.EmailInput }}
                    helperText={errors?.[AuthInputTypes.Email]?.message}
                    error={!!errors[AuthInputTypes.Email]}
                    type="input"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item className={classes.inputWrapper}>
                  <Grid container alignItems="baseline" justify="space-between">
                    <InputLabel className={classes.label}>
                      {intl.formatMessage({ id: 'SignIn.form.labels.password' })}
                    </InputLabel>
                    <Link data-qa={QATags.Auth.Recovery.ForgotPasswordButton} to={Routes.auth.passwordRecovery}>
                      {intl.formatMessage({ id: 'SignIn.recovery' })}
                    </Link>
                  </Grid>
                  <TextField
                    {...passwordRegister}
                    inputProps={{ 'data-qa': QATags.Auth.SignIn.PasswordInput }}
                    autoComplete="password"
                    type="password"
                    variant="outlined"
                    helperText={errors?.[AuthInputTypes.Password]?.message}
                    error={!!errors[AuthInputTypes.Password]}
                    fullWidth
                  />
                </Grid>
                <Button
                  data-qa={QATags.Auth.SignIn.SubmitButton}
                  fullWidth
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.button}
                  disabled={isSubmitting}
                  type="submit"
                >
                  {intl.formatMessage({ id: 'SignIn.title' })}
                </Button>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
      <AuthDescription />
    </Grid>
  );
}
