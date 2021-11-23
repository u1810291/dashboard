import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Grid, Typography, InputLabel, AppBar, Box, TextField } from '@material-ui/core';
import { notification } from 'apps/ui';
import { EMAIL_REG_EXP } from 'lib/validations';
import { ReactComponent as MatiLogo } from 'assets/mati-logo-v3.svg';
import SignInSession from 'assets/signin-session.png';
import SignInService from 'assets/signin-service.png';
import { IntlButton } from 'apps/intl';
import { Routes } from 'models/Router.model';
import { ErrorStatuses } from 'models/Error.model';
import { QATags } from 'models/QA.model';
import { useStyles } from './SignIn.styles';
import { signIn } from '../../state/auth.actions';
import { AuthInputTypes } from '../../models/Auth.model';

interface SignInInputs {
  [AuthInputTypes.Password]: string;
  [AuthInputTypes.Email]: string;
}

export function SignIn() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

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
    } catch (error) {
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
        default:
          notification.error(intl.formatMessage({ id: 'Error.common' }));
      }
    }
  }, [dispatch, history, intl, setError]);

  return (
    <Grid container className={classes.container}>
      <Grid className={classes.signIn} direction="column" container>
        <Grid className={classes.formWrapper} direction="column" container>
          <AppBar color="transparent" position="static" elevation={0} className={classes.appBar}>
            <IntlButton isSync={false} />
            <MatiLogo width={121} height={40} />
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
                <a href="https://www.getmati.com/contactus?utm_campaign=Product CTAs&utm_source=product&utm_medium=cta&utm_term=owned&utm_content=cta_signinpage" className={classes.link}>
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
      <Grid className={classes.description} direction="column" justify="center" alignItems="flex-start" container>
        <Box className={classes.descriptionWrapper}>
          <Typography variant="h2" className={classes.descriptionTitle}>
            {intl.formatMessage({ id: 'SignIn.description.title' })}
          </Typography>
          <Box className={classes.descriptionList}>
            <Typography variant="body1" className={classes.text}>
              {intl.formatMessage({ id: 'SignIn.description.text' })}
            </Typography>
            <img src={SignInSession} alt="" className={classes.descriptionImage} />
          </Box>
          <Box className={classes.service}>
            <img src={SignInService} alt="" />
            <Typography variant="body1" className={classes.serviceTitle}>
              {intl.formatMessage({ id: 'SignIn.description.serviceTitle' })}
            </Typography>
            <Typography variant="body1">
              {intl.formatMessage({
                id: 'SignIn.description.service',
              }, {
                breakingLine: <br />,
              })}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
