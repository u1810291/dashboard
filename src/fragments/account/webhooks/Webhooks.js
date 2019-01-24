import React from 'react'
import Button from 'src/components/button'
import { FormattedMessage } from 'react-intl'
import Panel from 'src/components/panel'
import Icons from 'src/components/icons'
import DataTable from 'src/components/data-table'
import { createOverlay, closeOverlay } from 'src/components/overlay'
import confirm from 'src/components/confirm'
import NewWebhookModal from '../new-webhook-modal'

export default class Webhooks extends React.Component {
  handleAddNewWebhook = () => {
    createOverlay(
      <NewWebhookModal
        onSave={this.props.subscribeToWebhook}
        onClose={closeOverlay}
      />
    )
  }

  handleDeleteWebhook = ({ id }) => {
    confirm(<FormattedMessage id="fragments.account.webhooks.confirm" />).then(
      () => this.props.deleteWebhook(id)
    )
  }

  render() {
    const { webhooks = [] } = this.props
    const columns = [
      {
        label: <FormattedMessage id="fragments.account.webhooks.labels.url" />,
        size: 10,
        content: webhook => <code className="text-wrap">{webhook.url}</code>
      },
      {
        label: (
          <FormattedMessage id="fragments.account.webhooks.labels.delete" />
        ),
        content: webhook => (
          <Button
            buttonStyle="invisible"
            onClick={this.handleDeleteWebhook.bind(this, webhook)}
          >
            <Icons.TrashBin className="svg-error" />
          </Button>
        ),
        align: 'center'
      }
    ]
    return (
      <Panel>
        <Panel.Body>
          <section className="mgi-section mgi-section__no-border">
            <h3>
              <FormattedMessage id="webhook" />
              <p>
                <FormattedMessage id="developers.webhook.form.description" />
              </p>
            </h3>
          </section>
          {webhooks.length > 0 && (
            <section className="mgi-section mgi-section__no-border">
              <DataTable
                rows={webhooks}
                columns={columns}
                borderAround
                inline
              />
            </section>
          )}
          <section className="mgi-section">
            <Button buttonStyle="primary" onClick={this.handleAddNewWebhook}>
              <FormattedMessage id="fragments.account.webhooks.add" />
            </Button>
          </section>
        </Panel.Body>
      </Panel>
    )
  }
}
