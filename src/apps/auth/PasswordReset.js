import React from 'react'
import { connect } from 'react-redux'
import { flowRight } from 'lodash/fp'
import { FormattedMessage } from 'react-intl'
import { Redirect } from 'react-router'
import { withFormik, Field, Form } from 'formik'
import Button from 'components/button'
import { setI18nContext } from 'components/i18n-context'
import { Input } from 'components/inputs'
import { passwordReset } from 'state/auth'

const formikSettings = {
  handleSubmit(values, { props, setSubmitting, setStatus }) {
    const { password } = values
    setStatus({})
    props
      .passwordReset({ password, token: props.match.params.token })
      .then(data => {
        setSubmitting(false)
        setStatus(true)
      })
      .catch(error => {
        setSubmitting(false)
        setStatus({ password: error.response.data.message })
      })
  }
}

class PasswordReset extends React.Component {
  render() {
    if (this.props.status === true) return <Redirect to="/" />
    return (
      <Form>
        <h1 className="text-light">
          <FormattedMessage id="passwordReset.title" />
          <p>
            <FormattedMessage id="passwordReset.subtitle" />
          </p>
        </h1>
        <Field type="password" name="password" component={Input} />
        <p>
          <Button
            type="submit"
            disabled={this.props.isSubmitting}
            buttonStyle="primary"
          >
            <FormattedMessage id="passwordReset.action" />
          </Button>
        </p>
      </Form>
    )
  }
}

export default flowRight(
  setI18nContext('passwordReset.form'),
  connect(
    null,
    { passwordReset }
  ),
  withFormik(formikSettings)
)(PasswordReset)
