import React from 'react'
import CSS from './SignUpForm.css'
import { Select, Input } from 'src/components/inputs'
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
    password: '',
    verificationNum: ''
  },

  verificationsNumOptions: [
    {
      label: 'I don\'t know',
      value: 'I don\'t know'
    },
    {
      label: '0–100',
      value: '0–100'
    },
    {
      label: '100–1000',
      value: '100–1000'
    },
    {
      label: '1000–5000',
      value: '1000–5000'
    },
    {
      label: '> 5000',
      value: '> 5000'
    }
  ],

  validate: values => {
    let errors = {}

    errors.firstName = required(values.firstName) || cleanText(values.firstName)
    errors.lastName = required(values.lastName) || cleanText(values.lastName)
    errors.email = required(values.email) || email(values.email)
    errors.verificationNum = required(values.verificationNum)
    errors.password = required(values.password)
    errors.websiteUrl = required(values.websiteUrl)
    errors = pickBy(errors, v => v)
    return errors
  }
}

class SignUpForm extends React.Component {
  onSubmit = (values, { setSubmitting, setStatus }) => {
    setStatus({})
    let data = pick(
      values,
      'firstName',
      'lastName',
      'email',
      'password',
      'verificationNum',
      'websiteUrl'
    )
    this.props
      .handleSubmit(data)
      .then(() => {
        setSubmitting(false)
      })
      .catch(error => {
        setSubmitting(false)
        notification.error(
          (error && error.response && error.response.data.message) ||
            'Something went wrong. Please retry later'
        )
      })
  }
  render() {
    return (
      <Formik
        initialValues={formikSettings.initialValues}
        onSubmit={this.onSubmit}
        validate={formikSettings.validate}
        render={props => (
          <form onSubmit={props.handleSubmit} id="signup_form">
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
    )
  }
}

export default setI18nContext('signup.form')(SignUpForm)
