import React from 'react'
import { Input } from 'src/components/inputs/index'
import { Formik, Field } from 'formik'
import { FormattedMessage } from 'react-intl'
import { setI18nContext } from 'src/components/i18n-context/index'
import Button from 'src/components/button/index'
import { pickBy, pick } from 'lodash'
import { cleanText, email, required } from 'src/lib/validations'

const formikSettings = {
  initialValues: {
    firstName: '',
    lastName: '',
    email: ''
  },

  validate: values => {
    let errors = {}
    errors.firstName = required(values.firstName) || cleanText(values.firstName)
    errors.lastName = required(values.lastName) || cleanText(values.lastName)
    errors.email = required(values.email) || email(values.email)
    errors = pickBy(errors, v => v)
    return errors
  }
}

export default
@setI18nContext('myAccount.form')
class AccountForm extends React.Component {

  onSubmit = (values, { setSubmitting, setStatus }) => {
    setStatus({})
    let data = pick(values, 'firstName', 'lastName', 'email')
    this.props.onSubmit(data)
  }

  render() {
    return (
      <Formik
        initialValues={this.props.initialValues || formikSettings.initialValues}
        onSubmit={this.onSubmit}
        validate={formikSettings.validate}
        render={props => (
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
              name="email"
              component={Input}
              error={props.touched.email && props.errors.email}
            />
            <p>
              <Button
                type="submit"
                disabled={this.props.isSubmitting}
                buttonStyle="primary"
              >
                <FormattedMessage id="myAccount.form.labels.submit" />
              </Button>
            </p>
          </form>
        )}
      />
    )
  }
}