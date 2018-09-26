import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Redirect } from 'react-router'
import { withFormik, Field, Form } from 'formik'
import { Button } from 'mgi-ui-components'
import { setI18nContext } from 'src/components/i18n-context'
import { Input } from 'src/components/inputs'
import { passwordReset } from 'src/state/auth'

const formikSettings = {
  handleSubmit(values, { props, setSubmitting, setStatus }) {
    const { password } = values
    setStatus({})
    props.passwordReset({ password, token: props.match.params.token })
    .then(data => {
      setSubmitting(false)
      setStatus(true)
    })
    .catch(error => {
      setSubmitting(false)
      setStatus({password: error.response.data.message})
    })
  }
}

@setI18nContext('passwordReset.form')
@connect(null, { passwordReset })
@withFormik(formikSettings)
export default class PasswordReset extends React.Component {
  render() {
    if (this.props.status === true) return <Redirect to="/" />
    return (
      <Form>
        <h2>
          <FormattedMessage id="passwordReset.title" />
          <small className="text-secondary">
            <FormattedMessage id="passwordReset.subtitle" />
          </small>
        </h2>
        <Field type="password" name="password" component={Input} />
        <p>
          <Button type="submit"
            disabled={this.props.isSubmitting}
            buttonStyle="primary">
            <FormattedMessage id="passwordReset.action" />
          </Button>
        </p>
      </Form>
    )
  }
}
