import { Button, Grid, Typography } from '@material-ui/core';
import { Page404 } from 'apps/layout';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useQuery } from 'lib/url';
import { businessEmail, email, required } from 'lib/validations';
import { get, pick, pickBy } from 'lodash';
import { DEFAULT_LOCALE } from 'models/Intl.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { dashboardUpdate } from 'state/merchant/merchant.actions';
import { isValidCheckSum } from '../../models/auth.model';
import { signUp } from '../../state/auth.actions';
import { Routes } from '../../../../models/Router.model';
import { QATags } from '../../../../models/QA.model';

const validateForm = (values) => pickBy(
  {
    email: required(values.email) || email(values.email) || businessEmail(values.email),
    password: required(values.password),
  },
  (v) => v,
);

const initialValues = {
  email: '',
  password: '',
  error: null,
};

export function SignUp() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();

  const submitData = useCallback(async (data, { setStatus, setSubmitting }) => {
    setStatus();
    try {
      await dispatch(signUp(pick(data, 'email', 'password')));
      await dispatch(dashboardUpdate({
        language: DEFAULT_LOCALE,
        usePlans: true,
      }));
      if (window.ga) {
        window.ga('send', 'event', 'form_submission');
      }
      history.push(Routes.root);
    } catch (err) {
      setSubmitting(false);
      setStatus(get(err, 'response.data.message', err.message));
    }
  }, [dispatch, history]);

  if (!isValidCheckSum(query.token)) {
    // TODO @dkchv: should be Page404, after merge 5394
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
        <Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={submitData}
          render={({ isSubmitting, submitForm, handleSubmit, status }) => (
            <Form onSubmit={handleSubmit}>
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
                    <Field
                      required
                      name="email"
                      type="input"
                      label={intl.formatMessage({
                        id: 'signup.form.labels.email',
                      })}
                      component={TextField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      fullWidth
                      placeholder="Work Email (no gmail, hotmail, etc)"
                      inputProps={{ 'data-qa': QATags.Auth.SignUp.EmailInput }}
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      name="password"
                      type="password"
                      label={intl.formatMessage({
                        id: 'signup.form.labels.password',
                      })}
                      variant="outlined"
                      fullWidth
                      component={TextField}
                      inputProps={{ 'data-qa': QATags.Auth.SignUp.PasswordInput }}
                    />
                  </Grid>
                </Grid>

                <Grid item container direction="column">
                  {status && (
                    <Grid item>
                      <Typography color="error">
                        <span>{status}</span>
                      </Typography>
                    </Grid>
                  )}
                  <Grid item>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      color="primary"
                      disabled={isSubmitting}
                      type="submit"
                      onClick={submitForm}
                      data-qa={QATags.Auth.SignUp.SignUpSubmitButton}
                    >
                      {intl.formatMessage({ id: 'signup.action' })}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        />
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
