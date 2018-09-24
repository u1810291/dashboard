import React from 'react'
import { Button } from 'mgi-ui-components'
import { Input } from 'src/components/inputs'
import { FormattedMessage } from 'react-intl'
import { withFormik, Field, Form } from 'formik'
import { setI18nContext } from 'src/components/i18n-context'
import CSS from './WebhookURLForm.css'

const formikSettings = {
  handleSubmit(values, { props, setSubmitting, setStatus }) {
    const { url } = values
    const { token } = props
    setStatus({})
    props.subscribeToWebhook(token, { url })
    .then(data => {
      setSubmitting(false)
    })
    .catch(error => {
      setSubmitting(false)
      setStatus({email: error.response.data.details})
    })
  }
}

@setI18nContext('onboarding.webhooks')
@withFormik(formikSettings)
export default class WebhookURLForm extends React.Component {
  render() {
    return (
      <Form className={CSS.form}>
        <Field name="url" hideLabel className={CSS.input} component={Input} />
        <Button type="submit" buttonStyle="primary">
          <FormattedMessage id="webhookUrl.save" />
        </Button>
      </Form>
    )
  }
}
