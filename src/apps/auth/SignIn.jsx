import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { flowRight } from 'lodash/fp';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { withFormik, Field, Form } from 'formik';

import Button from 'components/button';
import { setI18nContext } from 'components/i18n-context';
import { Input } from 'components/inputs';
import { signIn } from 'state/auth';
import { ReactComponent as MatiLogo } from 'assets/mati-logo.svg';
import { notification } from 'components/notification';
import CSS from './Auth.module.css';

const formikSettings = {
  handleSubmit(values, { props, setSubmitting, setStatus }) {
    const { email, password } = values;
    setStatus({});
    props
      .signIn({ email, password })
      .then(() => {
        setSubmitting(false);
        props.history.push('/');
      })
      .catch((error) => {
        setSubmitting(false);
        notification.error(
          (error && error.response && error.response.data.details)
            || 'Something went wrong. Please retry later',
        );
      });
  },
};

function SignIn({ isSubmitting }) {
  return (
    <Form>
      <MatiLogo className={CSS.logo} />
      <h1 className={`text-light ${CSS.title}`}>
        <FormattedMessage id="signin.title" />
        <p className="text-secondary">
          <FormattedMessage id="signin.subtitle" />
          {' '}
          <Link to="/auth/signup">
            <FormattedMessage id="signin.subtitle.link" />
          </Link>
        </p>
      </h1>
      <Field type="email" name="email" component={Input} />
      <Field type="password" name="password" component={Input} />
      <p>
        <Button
          className={CSS.submit}
          type="submit"
          disabled={isSubmitting}
          buttonStyle="primary"
        >
          <FormattedMessage id="signin.action" />
        </Button>
      </p>
      <p>
        <Link to="/auth/password-recovery">
          <FormattedMessage id="signin.recovery" />
        </Link>
      </p>
    </Form>
  );
}

SignIn.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
};

export default flowRight(
  setI18nContext('signin.form'),
  connect(
    null,
    { signIn },
  ),
  withFormik(formikSettings),
)(SignIn);