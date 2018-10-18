import React from 'react'
import Button from 'src/components/button'
import { Input } from 'src/components/inputs'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withFormik, Field, Form } from 'formik'
import { setI18nContext } from 'src/components/i18n-context'
import { sendNotification } from 'src/components/notification'
import CSS from './WebhookURLForm.css'

const formikSettings = {
  handleSubmit(values, { props, setSubmitting, setStatus }) {
    const { url } = values
    const { token } = props
    setStatus({})
    props
      .subscribeToWebhook(token, { url, secret: token })
      .then(data => {
        setSubmitting(false)
        setStatus({ success: true })
      })
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

@setI18nContext('onboarding.webhooks')
@withFormik(formikSettings)
@injectIntl
export default class WebhookURLForm extends React.Component {
  componentDidUpdate(props) {
    if (
      props.status &&
      this.props.status.success !== props.status.success &&
      this.props.status.success
    ) {
      sendNotification(this.props.intl.formatMessage({ id: 'webhookUrl.confirmation' }))
    }
  }

  render() {
    return (
      <React.Fragment>
        <Form className={CSS.form}>
          <Field name="url" hideLabel className={CSS.input} component={Input} />
          <Button type="submit" buttonStyle="primary">
            <FormattedMessage id="webhookUrl.save" />
          </Button>
        </Form>
      </React.Fragment>
    )
  }
}
