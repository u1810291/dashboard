import React from 'react';
import { Link } from 'react-router-dom';
import pickBy from 'lodash/pickBy';
import pick from 'lodash/pick';
import get from 'lodash/get';
import { Grid, Button, Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { signUp } from 'state/auth';
import { getIntegrationCode, saveConfiguration } from 'state/merchant';

import { cleanText, email, required } from 'lib/validations';
import { useDispatch } from 'react-redux';

const validateForm = (values) => pickBy(
  {
    firstName: required(values.firstName) || cleanText(values.firstName),
    lastName: required(values.lastName) || cleanText(values.lastName),
    email: required(values.email) || email(values.email),
    password: required(values.password),
  },
  (v) => v,
);

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  error: null,
};

export default function SignUp() {
  const intl = useIntl();
  const dispatch = useDispatch();

  async function submitData(data, { setStatus, setSubmitting }) {
    setStatus();
    try {
      const {
        data: { merchant, token },
      } = await dispatch(
        signUp(pick(data, 'firstName', 'lastName', 'email', 'password')),
      );
      if (window.Appcues) window.Appcues.identify(data.email);
      await dispatch(getIntegrationCode(token));
      await dispatch(
        saveConfiguration(token, {
          dashboard: {
            ...merchant.dashboard,
            usePlans: true,
            shouldPassOnboarding: true,
          },
        }),
      );
      window.ga('send', 'event', 'form_submission');
      window.location = '/';
    } catch (err) {
      setSubmitting(false);
      setStatus(get(err, 'response.data.message', err.message));
    }
  }

  return (
    <Grid container direction="column" spacing={6} alignItems="stretch">
      <Grid item container spacing={1} direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h4">
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
        >
          {({ isSubmitting, submitForm, handleSubmit, status }) => (
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
                  <Grid item container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Field
                        required
                        name="firstName"
                        label={intl.formatMessage({
                          id: 'signup.form.labels.firstName',
                        })}
                        component={TextField}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        required
                        name="lastName"
                        label={intl.formatMessage({
                          id: 'signup.form.labels.lastName',
                        })}
                        component={TextField}
                      />
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Field
                      required
                      name="email"
                      type="email"
                      label={intl.formatMessage({
                        id: 'signup.form.labels.email',
                      })}
                      component={TextField}
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      name="password"
                      type="password"
                      label={intl.formatMessage({
                        id: 'signup.form.labels.password',
                      })}
                      component={TextField}
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
                    >
                      {intl.formatMessage({ id: 'signup.action' })}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
      <Grid item>
        <Typography align="center">
          {intl.formatMessage({ id: 'signup.haveAccount' })}
          {' '}
          <Link to="/auth/signin">
            {intl.formatMessage({ id: 'signup.haveAccount.link' })}
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}
