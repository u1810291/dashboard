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
export default class WebhookURLForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showConfirmation: false
    }
  }

  componentDidUpdate(props) {
    if (
      props.status &&
      this.props.status.success !== props.status.success &&
      this.props.status.success
    ) {
      this.setState({ showConfirmation: true })
      setInterval(() => {
        this.setState({ showConfirmation: false })
      }, 3000)
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
        {this.state.showConfirmation && (
          <span className="text-secondary">
            <FormattedMessage id="webhookUrl.confirmation" />
          </span>
        )}
      </React.Fragment>
    )
  }
}
