import React, { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { AppBar, Box, Button, Grid, InputLabel, TextField, Typography } from '@material-ui/core';
import { notification } from 'apps/ui';
import { IntlButton } from 'apps/intl';
import { EMAIL_REG_EXP } from 'lib/validations';
import { ReactComponent as MatiLogo } from 'assets/metamap-logo.svg';
import { Routes } from 'models/Router.model';
import { QATags } from 'models/QA.model';
import { passwordRecovery } from '../../state/auth.actions';
import { AuthInputTypes } from '../../models/Auth.model';
import { AuthDescription } from '../AuthDescription/AuthDescription';
import { useStyles } from '../SignIn/SignIn.styles';

interface PasswordRecoveryInputs {
  [AuthInputTypes.Email]: string;
}

export function PasswordRecovery() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<PasswordRecoveryInputs>();

  const emailRegister = register(AuthInputTypes.Email, {
    required: intl.formatMessage({ id: 'validations.required' }),
    pattern: {
      value: EMAIL_REG_EXP,
      message: intl.formatMessage({ id: 'validations.email' }),
    },
  });

  const handleFormSubmit: SubmitHandler<PasswordRecoveryInputs> = useCallback(async (data) => {
    const { email } = data;
    try {
      setIsSubmitting(true);
      await dispatch(passwordRecovery({ email }));
      setIsSubmitting(false);
      notification.success(intl.formatMessage({ id: 'PasswordReset.notification.emailSent' }));
      history.push(Routes.root);
    } catch (e) {
      setIsSubmitting(false);
      notification.error(intl.formatMessage({ id: 'Error.common' }));
    }
  }, [dispatch, intl, history]);

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
                {intl.formatMessage({ id: 'PasswordRecovery.title' })}
              </Typography>
              <Typography variant="h4" className={classes.subtitle}>
                {intl.formatMessage({ id: 'PasswordRecovery.subtitle' })}
              </Typography>
            </Box>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Box mt={1} mb={6}>
                <InputLabel className={classes.label}>
                  {intl.formatMessage({ id: 'SignIn.form.labels.email' })}
                </InputLabel>
                <TextField
                  {...emailRegister}
                  inputProps={{ 'data-qa': QATags.Auth.Recovery.EmailInput }}
                  helperText={errors?.[AuthInputTypes.Email]?.message}
                  error={!!errors[AuthInputTypes.Email]}
                  type="input"
                  variant="outlined"
                  fullWidth
                />
              </Box>

              <Box mb={5}>
                <Button
                  data-qa={QATags.Auth.Recovery.ResetPasswordSubmit}
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  color="primary"
                  size="large"
                  className={classes.button}
                >
                  {intl.formatMessage({ id: 'PasswordRecovery.action' })}
                </Button>
              </Box>

              <Box>
                <Link to={Routes.auth.signIn} data-qa={QATags.Auth.Recovery.GoBackButton} className={classes.link}>
                  {intl.formatMessage({ id: 'PasswordRecovery.signin' })}
                </Link>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
      <AuthDescription />
    </Grid>
  );
}
