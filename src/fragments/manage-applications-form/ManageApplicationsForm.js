import React from 'react'
import compose from 'lodash/fp/compose'
import { withFormik, Form, Field } from 'formik'
import { FormattedMessage } from 'react-intl'
import { Input } from 'src/components/inputs'
import Button from 'src/components/button'
import { setI18nContext } from 'src/components/i18n-context'

function ManageApplicationsForm({ createApplication, clientId, clientSecret }) {
  return (
    <React.Fragment>
      {clientId && clientSecret && (
        <Form className={CSS.form}>
          <div className="mgi-items">
            <Field
              className="mgi-items--grow"
              name="clientId"
              component={Input}
              readOnly
            />
            <Field
              className="mgi-items--grow"
              name="clientSecret"
              component={Input}
              readOnly
            />
          </div>
        </Form>
      )}
      <div>
        <Button onClick={createApplication} buttonStyle="primary">
          <FormattedMessage id="manage_applications.generate" />
        </Button>
      </div>
    </React.Fragment>
  )
}

export default compose(
  withFormik({
    enableReinitialize: true
  }),
  setI18nContext('manage_applications')
)(ManageApplicationsForm)
