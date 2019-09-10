import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { passwordRecovery } from 'state/auth';
import { useDispatch } from 'react-redux';

const validateForm = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

async function handleSubmit(
  history,
  dispatch,
  { email },
  { setSubmitting, setStatus },
) {
  setStatus({});
  try {
    await dispatch(passwordRecovery({ email }));
    setSubmitting(false);
    setStatus(true);
  } catch (error) {
    setSubmitting(false);
    setStatus({ email: error.response.data.message });
  }
}

const initialValues = {
  email: '',
};

export default function SignInNew({ history }) {
  const intl = useIntl();
  const dispatch = useDispatch();

  return (
    <Grid container direction="column" spacing={6}>
      <Grid item container spacing={1} direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h4">
            {intl.formatMessage({ id: 'passwordReset.title' })}
          </Typography>
        </Grid>

        <Grid item>
          <Typography color="textSecondary" display="inline">
            {intl.formatMessage({ id: 'passwordReset.subtitle' })}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={(values, props) => handleSubmit(history, dispatch, values, props)}
        >
          {({ isSubmitting, submitForm }) => (
            <Form>
              <Grid container spacing={6} direction="column">
                <Grid item>
                  <Field
                    autoComplete="email"
                    name="email"
                    type="email"
                    label="Email"
                    component={TextField}
                  />
                </Grid>

                <Grid item>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    {intl.formatMessage({ id: 'recovery.action' })}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
      <Grid item>
        <Typography align="center">
          <Link to="/auth/signin">
            {intl.formatMessage({ id: 'recovery.signin' })}
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}
