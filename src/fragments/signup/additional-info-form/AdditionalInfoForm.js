import React from 'react'
import CSS from './AdditionalInfoForm.css'
import { Input } from 'src/components/inputs'
import Button from 'src/components/button'
import { Field, Formik } from 'formik'
import { setI18nContext } from 'src/components/i18n-context'
import { FormattedMessage } from 'react-intl'
import { pick } from 'lodash'

export default
@setI18nContext('additionalInfo.form')
class AdditionalInfoForm extends React.Component {
  onSubmit = (values, { setSubmitting, setStatus }) => {
    setStatus({})
    let data = pick(values, 'businessName', 'websiteUrl')
    this.props
      .handleSubmit(data)
      .then(() => {
        setSubmitting(false)
      })
      .catch(error => {
        setSubmitting(false)
        setStatus({ websiteUrl: error.response.data.message })
      })
  }
  render() {
    return (
      <Formik
        onSubmit={this.onSubmit}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <Field type="text" name="businessName" component={Input} />
            <Field type="text" name="websiteUrl" component={Input} />
            <p>
              <a href="/" className={CSS.skipLink}>
                <Button
                  className={CSS.submit}
                  disabled={props.isSubmitting}
                  buttonStyle="outline"
                >
                  <FormattedMessage id="additionalInfo.skip" />
                </Button>
              </a>
              <Button
                type="submit"
                className={CSS.submit}
                disabled={props.isSubmitting}
                buttonStyle="primary"
              >
                <FormattedMessage id="additionalInfo.action" />
              </Button>
            </p>
          </form>
        )}
      />
    )
  }
}
