import React from 'react'
import Button from 'src/components/button'
import { Input } from 'src/components/inputs'
import { FormattedMessage } from 'react-intl'
import { withFormik, Field, Form } from 'formik'
import { setI18nContext } from 'src/components/i18n-context'
import CSS from './WebhookURLForm.css'

const formikSettings = {
  enableReinitialize: true,
  handleSubmit(values, { props, setSubmitting, setStatus }) {
    const { url } = values
    setStatus({})
    props
      .subscribeToWebhook(url)
      .then(() => setSubmitting(false))
      .catch(error => {
        const status = {}
        error.response.data.details.forEach(e => {
          status[e.path.toString()] = e.message
        })
        setSubmitting(false)
        setStatus(status)
      })
  }
}

export default
@setI18nContext('onboarding.webhooks')
@withFormik(formikSettings)
class WebhookURLForm extends React.Component {
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
