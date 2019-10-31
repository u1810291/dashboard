import Button from 'components/button';
import { setI18nContext } from 'components/i18n-context';
import { Input } from 'components/inputs';
import { Field, Form, withFormik } from 'formik';
import { flowRight } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { passwordReset } from 'state/auth';

const formikSettings = {
  handleSubmit(values, { props, setSubmitting, setStatus }) {
    const { password } = values;
    setStatus({});
    props
      .passwordReset({ password, token: props.match.params.token })
      .then(() => {
        setSubmitting(false);
        setStatus(true);
      })
      .catch((error) => {
        setSubmitting(false);
        setStatus({ password: error.response.data.message });
      });
  },
};

function PasswordReset({ status, isSubmitting }) {
  return status === true
    ? <Redirect to="/" />
    : (
      <Form>
        <h1 className="text-light">
          <FormattedMessage id="passwordReset.title" />
          <p>
            <FormattedMessage id="passwordReset.subtitle" />
          </p>
        </h1>
        <Field type="password" name="password" component={Input} />
        <p>
          <Button
            type="submit"
            disabled={isSubmitting}
            buttonStyle="primary"
          >
            <FormattedMessage id="passwordReset.action" />
          </Button>
        </p>
      </Form>
    );
}

PasswordReset.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  status: PropTypes.bool.isRequired,
};

export default flowRight(
  setI18nContext('passwordReset.form'),
  connect(
    null,
    { passwordReset },
  ),
  withFormik(formikSettings),
)(PasswordReset);
