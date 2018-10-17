import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl'
import { withFormik, Field, Form } from 'formik'
import { get } from 'lodash'
import Button from 'src/components/button'
import { setI18nContext } from 'src/components/i18n-context'
import { Input, Select } from 'src/components/inputs'
import { signUp } from 'src/state/auth'
import { pick } from 'lodash'
import CSS from './Auth.css'

const formikSettings = {
  handleSubmit(values, { props, setSubmitting, setStatus }) {
    setStatus({})
    props
      .signUp(pick(values, 'firstName', 'lastName', 'email', 'password', 'roleInCompany'))
      .then(data => {
        setSubmitting(false)
        props.history.push('/')
      })
      .catch(error => {
        setSubmitting(false)
        setStatus({ password: error.response.data.message })
      })
  }
}

@setI18nContext('signup.form')
@connect(
  null,
  { signUp }
)
@withFormik(formikSettings)
@injectIntl
export default class SignUp extends React.Component {
  render() {
    return (
      <Form>
        <h2>
          <FormattedMessage id="signup.title" />
          <small className="text-secondary">
            <FormattedMessage id="signup.subtitle" />{' '}
            <Link to="/auth/signin">
              <FormattedMessage id="signup.subtitle.link" />
            </Link>
          </small>
        </h2>
        <div className={CSS.name}>
          <Field name="firstName" component={Input} />
          <Field name="lastName" component={Input} />
        </div>
        <Field type="email" name="email" component={Input} />
        <Field type="password" name="password" component={Input} />
        <Field name="roleInCompany" component={Input} />
        <Field name="companyUrl" component={Input} />
        <Field name="numVerifications" component={Select}>
          {Object.entries(
            get(this.props.intl.messages, 'signup.form.options.numVerifications', [])
          ).map(entry => <option value={entry[0]} key={entry[0]}>{entry[1]}</option>)}
        </Field>
        <div className={CSS.submit}>
          <p>
            <Button type="submit" disabled={this.props.isSubmitting} buttonStyle="primary">
              <FormattedMessage id="signup.action" />
            </Button>
          </p>
          <p className="text-secondary">
            <FormattedHTMLMessage id="terms-of-conditions" />
          </p>
        </div>
      </Form>
    )
  }
}
