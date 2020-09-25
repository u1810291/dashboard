import { Button, Grid, Typography, InputLabel, AppBar, Box } from '@material-ui/core';
import { ROOT_PATH } from 'apps/routing';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { email, required } from 'lib/validations';
import { pickBy } from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as MatiLogo } from 'assets/mati-logo-v3.svg';
import SigninSession from 'assets/signin-session.png';
import SigninService from 'assets/signin-service.png';
import { signIn } from '../../state/auth.actions';
import { useStyles } from './SignIn.styles';
import { IntlButton } from '../../../intl';

const validateForm = (values) => pickBy(
  {
    email: required(values.email) || email(values.email),
    password: required(values.password),
  },
  (v) => v,
);

const initialValues = {
  email: '',
  passwords: '',
};

export function SignIn() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  async function handleSubmit(data, { setStatus, setFieldError }) {
    setStatus({});
    try {
      await dispatch(signIn(data));
      history.push(ROOT_PATH);
    } catch (error) {
      setFieldError('password', intl.formatMessage({ id: 'SignIn.form.authError' }));
    }
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
            <Formik
              initialValues={initialValues}
              validate={validateForm}
              validateOnBlur={false}
              validateOnСhange={false}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Grid container direction="column">
                    <Grid item className={classes.inputWrapper}>
                      <InputLabel className={classes.label}>
                        {intl.formatMessage({ id: 'SignIn.form.labels.email' })}
                      </InputLabel>
                      <Field
                        name="email"
                        type="input"
                        variant="outlined"
                        fullWidth
                        component={TextField}
                      />
                    </Grid>
                    <Grid item className={classes.inputWrapper}>
                      <Grid container alignItems="baseline" justify="space-between">
                        <InputLabel className={classes.label}>
                          {intl.formatMessage({ id: 'SignIn.form.labels.password' })}
                        </InputLabel>
                        <Link to="/auth/password-recovery">
                          {intl.formatMessage({ id: 'SignIn.recovery' })}
                        </Link>
                      </Grid>
                      <Field
                        autoComplete="password"
                        name="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        component={TextField}
                        className={classes.input}
                      />
                    </Grid>
                    <Button
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
