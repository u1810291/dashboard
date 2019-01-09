import React from 'react'
import { Field, Formik } from 'formik'
import { setI18nContext } from 'src/components/i18n-context'
import { Input, RadioButtonGroup } from 'src/components/inputs'
import { pickBy, pick } from 'lodash'
import { cleanText, email, required } from 'src/lib/validations'
import { injectIntl } from 'react-intl'

const formikSettings = {
  initialValues: {
    firstName: '',
    lastName: '',
    role: 'agent',
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

@setI18nContext('teamTable.invite.form')
@injectIntl
class TeamInviteForm extends React.Component {

  roleOptions = [
    {
      label: this.props.intl.formatMessage({
        id: 'teamTable.invite.form.roles.agent'
      }),
      value: 'agent'
    },
    {
      label: this.props.intl.formatMessage({
        id: 'teamTable.invite.form.roles.admin'
      }),
      value: 'admin'
    }
  ]

  onSubmit = (values, { setSubmitting, setStatus }) => {
    setStatus({})
    let data = pick(values, 'firstName', 'lastName', 'role', 'email')
    this.props
      .handleSubmit(data)
      .then(() => {
        setSubmitting(false)
      })
      .catch(error => {
        setSubmitting(false)
        setStatus({ password: error.response.data.message })
      })
  }

  render() {
    return (
      <Formik
        ref={this.props.innerRef}
        initialValues={formikSettings.initialValues}
        onSubmit={this.onSubmit}
        validate={formikSettings.validate}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <div className="row">
              <div className="X12 S6">
                <Field
                  name="firstName"
                  component={Input}
                  error={props.touched.firstName && props.errors.firstName}
                />
              </div>
              <div className="X12 S6">
                <Field
                  name="lastName"
                  component={Input}
                  error={props.touched.lastName && props.errors.lastName}
                />
              </div>
            </div>
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
    )
  }
}

export default
React.forwardRef((props, ref) => <TeamInviteForm innerRef={ref} {...props}/>)
