import React from 'react'
import { FormattedMessage } from 'react-intl'
import { withFormik, Field, Form } from 'formik'
import { Button } from 'mgi-ui-components'
import { setI18nContext } from 'src/components/i18n-context'
import { Input } from 'src/components/inputs'

@setI18nContext('signin.form')
@withFormik({})
export default class SignIn extends React.Component {
  render() {
    return (
      <Form>
        <h1>
          <FormattedMessage id="signin.title" />
        </h1>
        <Field type="email" name="email" autoComplete="email" component={Input} />
        <Field type="password" name="password" autoComplete="current-password" component={Input} />
        <Button>
          <FormattedMessage id="signin.action" />
        </Button>
      </Form>
    )
  }
}
