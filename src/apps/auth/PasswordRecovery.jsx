import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { flowRight } from 'lodash/fp';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { withFormik, Field, Form } from 'formik';

import Button from 'components/button';
import { setI18nContext } from 'components/i18n-context';
import { Input } from 'components/inputs';
import { passwordRecovery } from 'state/auth';

const formikSettings = {
  handleSubmit(values, { props, setSubmitting, setStatus }) {
    const { email } = values;
    setStatus({});
    props
      .passwordRecovery({ email })
      .then(() => {
        setSubmitting(false);
        setStatus(true);
      })
      .catch((error) => {
        setSubmitting(false);
        setStatus({ email: error.response.data.message });
      });
  },
};

function PasswordRecovery({ status, isSubmitting }) {
  return status === true
    ? <Redirect to="/" />
    : (
      <Form>
        <h1 className="text-light">
          <FormattedMessage id="recovery.title" />
          <p>
            <FormattedMessage id="recovery.subtitle" />
          </p>
        </h1>
        <Field type="email" name="email" component={Input} />
        <p>
          <Button
            type="submit"
            disabled={isSubmitting}
            buttonStyle="primary"
          >
            <FormattedMessage id="recovery.action" />
          </Button>
        </p>
        <p>
          <Link to="/auth/signin">
            <FormattedMessage id="recovery.signin" />
          </Link>
        </p>
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
