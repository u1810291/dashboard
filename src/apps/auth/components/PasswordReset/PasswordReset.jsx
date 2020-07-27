import { Box, Button, TextField, Typography } from '@material-ui/core';
import { setI18nContext } from 'components/i18n-context';
import { Field, Form, withFormik } from 'formik';
import { flowRight } from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
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
    return <Redirect to="/" />;
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
          label={intl.formatMessage({ id: 'signin.form.labels.password' })}
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
        <Link to="/auth/signin">
          {intl.formatMessage({ id: 'recovery.signin' })}
        </Link>
      </Box>
    </Form>
  );
}

export default flowRight(
  setI18nContext('passwordReset.form'),
  connect(
    null,
    { passwordReset },
  ),
  withFormik(formikSettings),
)(PasswordReset);
