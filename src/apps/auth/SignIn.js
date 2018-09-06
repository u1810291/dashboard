import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { withFormik, Field, Form } from 'formik'
import { Button } from 'mgi-ui-components'
import { setI18nContext } from 'src/components/i18n-context'
import { Input } from 'src/components/inputs'
import { signIn } from 'src/state/auth'

const formikSettings = {
  handleSubmit(values, { props }) {
    const { email, password } = values
    props.dispatch(signIn({ email, password }))
  }
}

@setI18nContext('signin.form')
@connect()
@withFormik(formikSettings)
export default class SignIn extends React.Component {
  render() {
    return (
      <Form>
        <h1>
          <FormattedMessage id="signin.title" />
        </h1>
        <Field type="email" name="email" component={Input} />
        <Field type="password" name="password" component={Input} />
        <Button type="submit">
          <FormattedMessage id="signin.action" />
        </Button>
      </Form>
    )
  }
}
