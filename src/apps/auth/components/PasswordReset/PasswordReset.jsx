import { Box, Button, Typography } from '@material-ui/core';
import { Field, Form, withFormik } from 'formik';
import { TextField } from 'formik-material-ui';
import { flowRight } from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Routes } from 'models/Router.model';
import { passwordReset } from '../../state/auth.actions';

const formikSettings = {
  handleSubmit(values, { props, setSubmitting, setStatus }) {
    const { password } = values;
    setStatus({});
    props.passwordReset({ password, token: props.match.params.token }).then(() => {
      setSubmitting(false);
      setStatus(true);
    }).catch((error) => {
      setSubmitting(false);
      setStatus({ password: error.response.data.message });
    });
  },
};

function PasswordReset({ status, isSubmitting }) {
  const intl = useIntl();

  if (status === true) {
    return <Redirect to={Routes.root} />;
  }

  return (
    <Form>
      <Typography variant="h1" gutterBottom>
        {intl.formatMessage({ id: 'passwordReset.title' })}
      </Typography>
      <Typography variant="body1">
        {intl.formatMessage({ id: 'passwordReset.subtitle' })}
      </Typography>

      <Box mt={1}>
        <Field
          type="password"
          name="password"
          label={intl.formatMessage({ id: 'SignIn.form.labels.password' })}
          variant="outlined"
          fullWidth
          component={TextField}
        />
      </Box>

      <Box mt={2}>
        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          color="primary"
          size="large"
        >
          {intl.formatMessage({ id: 'passwordReset.action' })}
        </Button>
      </Box>

      <Box mt={3}>
        <Link to={Routes.auth.signIn}>
          {intl.formatMessage({ id: 'PasswordRecovery.signin' })}
        </Link>
      </Box>
    </Form>
  );
}

export default flowRight(
  connect(
    null,
    { passwordReset },
  ),
  withFormik(formikSettings),
)(PasswordReset);
