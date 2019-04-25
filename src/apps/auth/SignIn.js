import React from 'react'
import { connect } from 'react-redux'
import { flowRight } from 'lodash/fp'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { withFormik, Field, Form } from 'formik'
import Button from 'src/components/button'
import { setI18nContext } from 'src/components/i18n-context'
import { Input } from 'src/components/inputs'
import { signIn } from 'src/state/auth'
import { ReactComponent as MatiLogo } from 'src/assets/mati-logo.svg'
import CSS from './Auth.css'
import { notification } from 'src/components/notification'

const formikSettings = {
  handleSubmit(values, { props, setSubmitting, setStatus }) {
    const { email, password } = values
    setStatus({})
    props
      .signIn({ email, password })
      .then(data => {
        setSubmitting(false)
        props.history.push('/')
      })
      .catch(error => {
        setSubmitting(false)
        notification.error(
          (error && error.response && error.response.data.details) ||
            'Something went wrong. Please retry later'
        )
      })
  }
}

class SignIn extends React.Component {
  render() {
    return (
      <Form>
        <MatiLogo className={CSS.logo} />
        <h1 className={'text-light ' + CSS.title}>
          <FormattedMessage id="signin.title" />
          <p className="text-secondary">
            <FormattedMessage id="signin.subtitle" />{' '}
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
            disabled={this.props.isSubmitting}
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
    )
  }
}

export default flowRight(
  setI18nContext('signin.form'),
  connect(
    null,
    { signIn }
  ),
  withFormik(formikSettings)
)(SignIn)
