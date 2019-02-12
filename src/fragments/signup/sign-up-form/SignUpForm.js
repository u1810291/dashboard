import React from 'react'
import CSS from './SignUpForm.css'
import { Input } from 'src/components/inputs'
import Button from 'src/components/button'
import { Field, Formik } from 'formik'
import { setI18nContext } from 'src/components/i18n-context'
import { FormattedMessage } from 'react-intl'
import { cleanText, email, required } from 'src/lib/validations'
import { pickBy, pick } from 'lodash'
import { notification } from 'src/components/notification'

const formikSettings = {
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  },

  validate: values => {
    let errors = {}

    errors.firstName = required(values.firstName) || cleanText(values.firstName)
    errors.lastName = required(values.lastName) || cleanText(values.lastName)
    errors.email = required(values.email) || email(values.email)
    errors.password = required(values.password)
    errors = pickBy(errors, v => v)
    return errors
  }
}

export default
@setI18nContext('signup.form')
class SignUpForm extends React.Component {
  onSubmit = (values, { setSubmitting, setStatus }) => {
    setStatus({})
    let data = pick(values, 'firstName', 'lastName', 'email', 'password')
    this.props.handleSubmit(data)
      .then(() => {
        setSubmitting(false)
      })
      .catch(error => {
        setSubmitting(false)
        notification.error((error && error.response && error.response.data.message) ||
        'Something went wrong. Please retry later')
      })
  }
  render() {
    return (
      <Formik
        initialValues={formikSettings.initialValues}
        onSubmit={this.onSubmit}
        validate={formikSettings.validate}
        render={props => (
          <form onSubmit={props.handleSubmit}>
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
    )
  }
}
