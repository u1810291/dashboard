import PropTypes from 'prop-types';
import React from 'react';

import { Select, Input } from 'components/inputs';
import Button from 'components/button';
import { Field, Formik } from 'formik';
import { setI18nContext } from 'components/i18n-context';
import { FormattedMessage } from 'react-intl';
import { cleanText, email, required } from 'lib/validations';
import { pickBy, pick } from 'lodash';
import { notification } from 'components/notification';

import CSS from './SignUpForm.module.css';

const formikSettings = {
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verificationNum: '',
    websiteUrl: '',
  },

  verificationsNumOptions: [
    {
      label: 'I don\'t know',
      value: 'I don\'t know',
    },
    {
      label: '0–100',
      value: '0–100',
    },
    {
      label: '100–1000',
      value: '100–1000',
    },
    {
      label: '1000–5000',
      value: '1000–5000',
    },
    {
      label: '> 5000',
      value: '> 5000',
    },
  ],

  validate: (values) => {
    let errors = {};

    errors.firstName = required(values.firstName) || cleanText(values.firstName);
    errors.lastName = required(values.lastName) || cleanText(values.lastName);
    errors.email = required(values.email) || email(values.email);
    errors.verificationNum = required(values.verificationNum);
    errors.password = required(values.password);
    errors.websiteUrl = required(values.websiteUrl);
    errors = pickBy(errors, (v) => v);
    return errors;
  },
};

class SignUpForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  }

  onSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus({});
    const data = pick(
      values,
      'firstName',
      'lastName',
      'email',
      'password',
      'verificationNum',
      'websiteUrl',
    );

    try {
      await this.props.handleSubmit(data);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      notification.error(
        (error && error.response && error.response.data.message)
        || 'Something went wrong. Please retry later',
      );
    }
  };

  render() {
    return (
      <Formik
        initialValues={formikSettings.initialValues}
        onSubmit={this.onSubmit}
        validate={formikSettings.validate}
        render={(props) => (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              return props.handleSubmit(event);
            }}
            id="signup_form"
          >
            <div className={CSS.name}>
              <Field
                name="firstName"
                component={Input}
                error={props.touched.firstName && props.errors.firstName}
              />
              <Field
                name="lastName"
                component={Input}
                error={props.touched.lastName && props.errors.lastName}
              />
            </div>
            <Field
              type="text"
              name="websiteUrl"
              component={Input}
              error={props.touched.websiteUrl && props.errors.websiteUrl}
            />

            <Field
              name="verificationNum"
              component={Select}
              options={formikSettings.verificationsNumOptions}
              value={props.values.verificationNum}
              error={
                props.touched.verificationNum && props.errors.verificationNum
              }
            />

            <Field
              type="email"
              name="email"
              component={Input}
              error={props.touched.email && props.errors.email}
            />
            <Field
              type="password"
              name="password"
              component={Input}
              error={props.touched.password && props.errors.password}
            />
            <p>
              <Button
                type="submit"
                id="sign_up"
                className={CSS.submit}
                disabled={props.isSubmitting}
                buttonStyle="primary"
              >
                <FormattedMessage id="signup.action" />
              </Button>
            </p>
          </form>
        )}
      />
    );
  }
}

export default setI18nContext('signup.form')(SignUpForm);
