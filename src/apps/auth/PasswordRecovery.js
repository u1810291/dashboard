import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { withFormik, Field, Form } from 'formik'
import Button from 'src/components/button'
import { setI18nContext } from 'src/components/i18n-context'
import { Input } from 'src/components/inputs'
import { passwordRecovery } from 'src/state/auth'

const formikSettings = {
  handleSubmit(values, { props, setSubmitting, setStatus }) {
    const { email } = values
    setStatus({})
    props
      .passwordRecovery({ email })
      .then(data => {
        setSubmitting(false)
        setStatus(true)
      })
      .catch(error => {
        setSubmitting(false)
        setStatus({ email: error.response.data.message })
      })
  }
}

export default
@setI18nContext('recovery.form')
@connect(
  null,
  { passwordRecovery }
)
@withFormik(formikSettings)
class PasswordRecovery extends React.Component {
  render() {
    if (this.props.status === true) return <Redirect to="/" />
    return (
      <Form>
        <h1 className="text-light">
          <FormattedMessage id="recovery.title" />
          <p>
            <FormattedMessage id="recovery.subtitle" />
          </p>
        </h1>
        <Field type="email" name="email" component={Input} />
        <p>
          <Button
            type="submit"
            disabled={this.props.isSubmitting}
            buttonStyle="primary"
          >
            <FormattedMessage id="recovery.action" />
          </Button>
        </p>
        <p>
          <Link to="/auth/signin">
            <FormattedMessage id="recovery.signin" />
          </Link>
        </p>
      </Form>
    )
  }
}
