import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { withFormik, Field, Form } from 'formik'
import { Button } from 'mgi-ui-components'
import { setI18nContext } from 'src/components/i18n-context'
import { Input } from 'src/components/inputs'
import { passwordRecovery } from 'src/state/auth'

const formikSettings = {
  handleSubmit(values, { props, setSubmitting, setStatus }) {
    const { email } = values
    setStatus({})
    props.passwordRecovery({ email })
    .then(data => {
      setSubmitting(false)
    })
    .catch(error => {
      setSubmitting(false)
      setStatus({email: error.response.data.message})
    })
  }
}

@setI18nContext('recovery.form')
@connect(null, { passwordRecovery })
@withFormik(formikSettings)
export default class PasswordRecovery extends React.Component {
  render() {
    return (
      <Form>
        <h2>
          <FormattedMessage id="recovery.title" />
          <small className="text-secondary">
            <FormattedMessage id="recovery.subtitle" />
          </small>
        </h2>
        <Field type="email" name="email" component={Input} />
        <p>
          <Button type="submit" disabled={this.props.isSubmitting} buttonStyle="primary">
            <FormattedMessage id="recovery.action" />
          </Button>
        </p>
        <p>
          <Link to="/auth/signin"><FormattedMessage id="recovery.signin" /></Link>
        </p>
      </Form>
    )
  }
}
