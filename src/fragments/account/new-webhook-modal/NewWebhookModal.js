import React from 'react'
import { flowRight } from 'lodash/fp'
import { FormattedMessage } from 'react-intl'
import { withFormik, Field, Form } from 'formik'
import { Input } from 'src/components/inputs'
import { setI18nContext } from 'src/components/i18n-context'
import { Modal } from 'src/components/modal'
import Button from 'src/components/button'
import Items from 'src/components/items'

function NewWebhookModal({ onSave, onClose }) {
  return (
    <Form>
      <Modal>
        <main>
          <h1>
            <FormattedMessage id="fragments.account.new_webhook_modal.title" />
          </h1>
          <Field name="url" component={Input} />
          <Field name="secret" component={Input} />
        </main>
        <footer>
          <Items>
            <Button buttonStyle="primary" type="submit">
              <FormattedMessage id="done" />
            </Button>
            <Button onClick={onClose}>
              <FormattedMessage id="cancel" />
            </Button>
          </Items>
        </footer>
      </Modal>
    </Form>
  )
}

const formikSettings = {
  enableReinitialize: true,
  handleSubmit(values, { props, setStatus }) {
    setStatus({})
    const { url, secret } = values
    props
      .onSave(url, secret)
      .then(props.onClose)
      .catch(setStatus)
  }
}

export default flowRight(
  setI18nContext('onboarding.webhooks'),
  withFormik(formikSettings)
)(NewWebhookModal)
