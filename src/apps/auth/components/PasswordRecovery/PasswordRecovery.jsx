import { Box, Button, TextField, Typography } from '@material-ui/core';
import { setI18nContext } from 'components/i18n-context';
import { Field, Form, withFormik } from 'formik';
import { flowRight } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { passwordRecovery } from '../../state/auth.actions';

const formikSettings = {
  handleSubmit(values, { props, setSubmitting, setStatus }) {
    const { email } = values;
    setStatus({});
    props.passwordRecovery({ email }).then(() => {
      setSubmitting(false);
      setStatus(true);
    }).catch((error) => {
      setSubmitting(false);
      setStatus({ email: error.response.data.message });
    });
  },
};

function PasswordRecovery({ status, isSubmitting }) {
  const intl = useIntl();

  if (status === true) {
    return <Redirect to="/" />;
  }

  return (
    <Form>
      <Typography variant="h1" gutterBottom>
        {intl.formatMessage({ id: 'recovery.title' })}
      </Typography>
      <Typography variant="body1">
        {intl.formatMessage({ id: 'recovery.subtitle' })}
      </Typography>

      <Box mt={1}>
        <Field
          type="email"
          name="email"
          label={intl.formatMessage({ id: 'signin.form.labels.email' })}
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
          {intl.formatMessage({ id: 'recovery.action' })}
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

PasswordRecovery.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  status: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({})]),
};

PasswordRecovery.defaultProps = {
  status: undefined,
};

export default flowRight(
  setI18nContext('recovery.form'),
  connect(
    null,
    { passwordRecovery },
  ),
  withFormik(formikSettings),
)(PasswordRecovery);
