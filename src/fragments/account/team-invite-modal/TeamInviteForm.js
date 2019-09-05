import PropTypes from 'prop-types';
import React from 'react';
import { Field, Formik } from 'formik';
import { flow } from 'lodash/fp';

import { setI18nContext } from 'components/i18n-context';
import { Input, RadioButtonGroup } from 'components/inputs';
import { pickBy, pick } from 'lodash';
import { cleanText, email, required } from 'lib/validations';
import { injectIntl } from 'react-intl';

const formikSettings = {
  initialValues: {
    firstName: '',
    lastName: '',
    role: 2,
    email: '',
  },

  validate: (values) => {
    let errors = {};
    errors.firstName = required(values.firstName) || cleanText(values.firstName);
    errors.lastName = required(values.lastName) || cleanText(values.lastName);
    errors.email = required(values.email) || email(values.email);
    errors = pickBy(errors, (v) => v);
    return errors;
  },
};

class TeamInviteForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    innerRef: PropTypes.elementType.isRequired,
  }

  roleOptions = [
    {
      label: this.props.intl.formatMessage({
        id: 'teamTable.invite.form.roles.agent',
      }),
      value: 2,
    },
    {
      label: this.props.intl.formatMessage({
        id: 'teamTable.invite.form.roles.admin',
      }),
      value: 1,
    },
  ]

  onSubmit = (values, { setSubmitting, setStatus }) => {
    setStatus({});
    const data = pick(values, 'firstName', 'lastName', 'role', 'email');
    this.props
      .handleSubmit(data)
      .then(() => {
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        if (!error || !error.response || !error.response.data) return;
        setStatus({ password: error.response.data.message });
      });
  }

  render() {
    const { innerRef } = this.props;
    return (
      <Formik
        ref={innerRef}
        initialValues={formikSettings.initialValues}
        onSubmit={this.onSubmit}
        validate={formikSettings.validate}
        render={(props) => (
          <form onSubmit={props.handleSubmit}>
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
            <Field
              name="role"
              component={RadioButtonGroup}
              options={this.roleOptions}
              error={props.touched.password && props.errors.password}
            />
            <Field
              type="email"
              name="email"
              component={Input}
              error={props.touched.email && props.errors.email}
            />
          </form>
        )}
      />
    );
  }
}

export default flow(
  setI18nContext('teamTable.invite.form'),
  injectIntl,
  (Component) => React.forwardRef((props, ref) => <Component innerRef={ref} {...props} />),
)(TeamInviteForm);
