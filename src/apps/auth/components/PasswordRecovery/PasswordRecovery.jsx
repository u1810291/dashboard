import { AppBar, Box, Button, Grid, InputLabel, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { ReactComponent as MatiLogo } from 'assets/mati-logo-v3.svg';
import SigninSession from 'assets/signin-session.png';
import SigninService from 'assets/signin-service.png';
import { passwordRecovery } from '../../state/auth.actions';
import { useStyles } from '../SignIn/SignIn.styles';
import { IntlButton } from '../../../intl';
import { Routes } from '../../../../models/Router.model';
import { QATags } from '../../../../models/QA.model';

export function PasswordRecovery() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);

  const handleSubmit = useCallback(async (data, { setSubmitting, setFieldError }) => {
    const { email } = data;
    setStatus(false);
    try {
      await dispatch(passwordRecovery({ email }));
      setSubmitting(false);
      setStatus(true);
    } catch (e) {
      setSubmitting(false);
      setFieldError('email', intl.formatMessage({ id: 'validations.email' }));
    }
  }, [dispatch, intl]);

  const initialValues = {
    email: '',
  };

  if (status === true) {
    return <Redirect to={Routes.root} />;
  }

  return (
    <Grid container className={classes.container}>
      <Grid className={classes.signin} direction="column" container>
        <Grid className={classes.formWrapper} direction="column" container>
          <AppBar color="transparent" position="static" elevation={0} className={classes.appBar}>
            <IntlButton isSync={false} />
            <MatiLogo width={121} height={40} />
          </AppBar>
          <Box className={classes.form}>
            <Box mb={5}>
              <Typography mb={1} variant="h1" gutterBottom>
                {intl.formatMessage({ id: 'PasswordRecovery.title' })}
              </Typography>
              <Typography variant="h4" className={classes.subtitle}>
                {intl.formatMessage({ id: 'PasswordRecovery.subtitle' })}
              </Typography>
            </Box>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Box mt={1} mb={6}>
                    <InputLabel className={classes.label}>
                      {intl.formatMessage({ id: 'SignIn.form.labels.email' })}
                    </InputLabel>
                    <Field
                      inputProps={{ 'data-qa': QATags.Auth.Recovery.EmailInput }}
                      type="input"
                      name="email"
                      variant="outlined"
                      fullWidth
                      component={TextField}
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
                </Form>
              )}
            </Formik>
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
            <img src={SigninSession} alt="" className={classes.descriptionImage} />
          </Box>
          <Box className={classes.service}>
            <img src={SigninService} alt="" />
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
