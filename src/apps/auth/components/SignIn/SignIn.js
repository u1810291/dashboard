import { Button, Grid, Typography } from '@material-ui/core';
import { ROOT_PATH } from 'apps/routing';
import { notification } from 'components/notification';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { email, required } from 'lib/validations';
import { pickBy } from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signIn } from '../../state/auth.actions';

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
  const history = useHistory();

  async function handleSubmit(data, { setSubmitting, setStatus }) {
    setStatus({});
    try {
      await dispatch(signIn(data));
      history.push(ROOT_PATH);
    } catch (error) {
      notification.error(intl.formatMessage({ id: 'personalSettings.errors.password' }));
      setSubmitting(false);
    }
  }

  return (
    <Grid container direction="column" spacing={6}>
      <Grid item container spacing={1} direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h1">
            {intl.formatMessage({ id: 'signin.title' })}
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Work Email (no gmail, hotmail, etc)"
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
