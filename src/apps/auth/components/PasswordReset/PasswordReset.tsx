import { useQuery } from 'lib/url';
import { PASSWORD_REG_EXP, SPECIAL_CHARACTERS_REG_EXP } from 'lib/validations';
import { ErrorStatuses, PasswordInvalidErrorCodes } from 'models/Error.model';
import { SupportedLocales } from 'models/Intl.model';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { AppBar, Box, Button, Grid, InputLabel, List, ListItem, ListItemText, TextField, Typography } from '@material-ui/core';
import { IntlButton } from 'apps/intl';
import { ReactComponent as MatiLogo } from 'assets/metamap-logo.svg';
import { notification, TextFieldPassword } from 'apps/ui';
import { Routes } from 'models/Router.model';
import { changeLanguage } from 'state/merchant/merchant.actions';
import { AuthInputTypes } from '../../models/Auth.model';
import { passwordReset } from '../../state/auth.actions';
import { AuthDescription } from '../AuthDescription/AuthDescription';
import { useStyles } from './PasswordReset.styles';

interface PasswordResetInputs {
  [AuthInputTypes.Password]: string;
  [AuthInputTypes.RepeatPassword]: string;
}

export function PasswordReset() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { token } = useParams();
  const { locale } = useQuery();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { register, handleSubmit, watch, setError, formState: { errors, isSubmitted } } = useForm<PasswordResetInputs>();

  useEffect(() => {
    if (Object.values(SupportedLocales).includes(locale as SupportedLocales)) {
      dispatch(changeLanguage(locale, false));
    }
  }, [locale, dispatch]);

  const passwordRegister = register(AuthInputTypes.Password, {
    required: true,
    pattern: PASSWORD_REG_EXP,
    deps: [AuthInputTypes.RepeatPassword],
  });
  const passwordWatch = watch(AuthInputTypes.Password);

  const passwordValidationChecks = useMemo<{ id: string; isValid: boolean }[]>(() => ([
    { id: 'PasswordReset.validationChecks.lowercase', isValid: /[a-z]/.test(passwordWatch) },
    { id: 'PasswordReset.validationChecks.capital', isValid: /[A-Z]/.test(passwordWatch) },
    { id: 'PasswordReset.validationChecks.number', isValid: /\d/.test(passwordWatch) },
    { id: 'PasswordReset.validationChecks.specialCharacter', isValid: SPECIAL_CHARACTERS_REG_EXP.test(passwordWatch) },
    { id: 'PasswordReset.validationChecks.minLength', isValid: passwordWatch?.length > 8 },
  ]), [passwordWatch]);

  const repeatPasswordRegister = register(AuthInputTypes.RepeatPassword, {
    required: intl.formatMessage({ id: 'validations.required' }),
    validate: (value) => value === passwordWatch || intl.formatMessage({ id: 'Settings.changePasswordModal.passwordsDontMatch' }),
  });

  const handleFormSubmit: SubmitHandler<PasswordResetInputs> = useCallback(async (data) => {
    const { password } = data;
    try {
      setIsSubmitting(true);
      await dispatch(passwordReset({ password, token }));
      setIsSubmitting(false);
      notification.success(intl.formatMessage({ id: 'PasswordReset.notification.passwordChanged' }));
      history.push(Routes.root);
    } catch (error: any) {
      setIsSubmitting(false);
      switch (error?.response?.status) {
        case ErrorStatuses.WrongCredentials:
          notification.error(intl.formatMessage({ id: 'PasswordReset.error.expiredLink' }));
          break;
        case ErrorStatuses.PasswordInvalid:
          if (error?.response?.data?.errorCode === PasswordInvalidErrorCodes.PasswordUsedBefore) {
            setError(AuthInputTypes.Password, {
              type: 'manual',
              message: intl.formatMessage({ id: 'PasswordReset.error.usedPassword' }),
            });
          } else {
            setError(AuthInputTypes.Password, {
              type: 'manual',
              message: intl.formatMessage({ id: 'PasswordReset.error.weakPassword' }),
            });
          }
          break;
        default:
          notification.error(intl.formatMessage({ id: 'Error.common' }));
          break;
      }
    }
  }, [dispatch, token, history, intl, setError]);

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
                {intl.formatMessage({ id: 'passwordReset.title' })}
              </Typography>
              <Grid container alignItems="baseline">
                <Typography variant="h4" className={classes.subtitle}>
                  {intl.formatMessage({ id: 'passwordReset.subtitle' })}
                </Typography>
                &nbsp;
                <Link to={Routes.auth.signIn} className={classes.link}>
                  {intl.formatMessage({ id: 'PasswordRecovery.signin' })}
                </Link>
              </Grid>
            </Box>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Grid container direction="column">
                <Grid item className={classes.inputWrapper}>
                  <InputLabel className={classes.label}>
                    {intl.formatMessage({ id: 'passwordReset.form.labels.password' })}
                  </InputLabel>
                  <TextFieldPassword
                    {...passwordRegister}
                    helperText={errors?.[AuthInputTypes.Password]?.message}
                    error={!!errors[AuthInputTypes.Password]}
                    className={classes.passwordField}
                    autoComplete="new-password"
                    variant="outlined"
                    fullWidth
                  />
                  <List className={classNames(classes.validationChecks, { [classes.validationChecksTouched]: isSubmitted })}>
                    {passwordValidationChecks.map((check) => (
                      <ListItem key={check.id} className={!!errors[AuthInputTypes.Password] && !check.isValid && classes.validationError}>
                        <ListItemText primary={intl.formatMessage({ id: check.id })} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item className={classes.inputWrapper}>
                  <InputLabel className={classes.label}>
                    {intl.formatMessage({ id: 'personalSettings.labels.repeatPassword' })}
                  </InputLabel>
                  <TextField
                    {...repeatPasswordRegister}
                    helperText={errors?.[AuthInputTypes.RepeatPassword]?.message}
                    error={!!errors[AuthInputTypes.RepeatPassword]}
                    autoComplete="new-password"
                    type="password"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button
                className={classes.button}
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                color="primary"
                size="large"
                fullWidth
              >
                {intl.formatMessage({ id: 'passwordReset.action' })}
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
      <AuthDescription />
    </Grid>
  );
}
