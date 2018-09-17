import React from 'react'
import { TextField, Button } from 'mgi-ui-components'
import { FormattedMessage, injectIntl } from 'react-intl'
import CSS from './WebhookURLForm.css'

@injectIntl
export default class WebhookURLForm extends React.Component {
  render() {
    return (
      <div className={CSS.form}>
        <TextField placeholder={this.props.intl.formatMessage({id: "webhookUrl.placeholer"})} />
        <Button buttonStyle="primary">
          <FormattedMessage id="webhookUrl.save" />
        </Button>
      </div>
    )
  }
}
