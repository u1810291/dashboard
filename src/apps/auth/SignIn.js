import { Button, Grid, Typography } from '@material-ui/core';
import { notification } from 'components/notification';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { email, required } from 'lib/validations';
import { pickBy } from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn } from 'state/auth';

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

export default function SignIn() {
  const intl = useIntl();
  const dispatch = useDispatch();

  async function handleSubmit(data, { setSubmitting, setStatus }) {
    setStatus({});
    try {
      await dispatch(signIn(data));
      window.location = '/';
    } catch (error) {
      notification.error(
        <>
          {intl.formatMessage({ id: 'personalSettings.errors.password' })}
        </>,
      );
      setSubmitting(false);
    }
  }

  return (
    <Grid container direction="column" spacing={6}>
      <Grid item container spacing={1} direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h4">
            {intl.formatMessage({ id: 'signin.title' })}
          </Typography>
        </Grid>

        <Grid item>
          <Typography color="textSecondary" display="inline">
            {intl.formatMessage({ id: 'signin.subtitle' })}
            {' '}
          </Typography>
          <Typography display="inline">
            <Link to="/auth/signup">
              {intl.formatMessage({ id: 'signin.subtitle.link' })}
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid container spacing={6} direction="column">
                <Grid item container spacing={2} direction="column">
                  <Grid item>
                    <Field
                      autoComplete="email"
                      name="email"
                      type="email"
                      label={intl.formatMessage({
                        id: 'signin.form.labels.email',
                      })}
                      component={TextField}
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      autoComplete="password"
                      name="password"
                      type="password"
                      label={intl.formatMessage({
                        id: 'signin.form.labels.password',
                      })}
                      component={TextField}
                    />
                  </Grid>
                </Grid>

                <Grid item>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {intl.formatMessage({ id: 'signin.title' })}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
      <Grid item>
        <Typography align="center">
          <Link to="/auth/password-recovery">
            {intl.formatMessage({ id: 'signin.recovery' })}
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}
