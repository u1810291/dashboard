import React from 'react'
import { FormattedMessage } from 'react-intl'
import Panel from 'src/components/panel'
import Button from 'src/components/button'
import Icons from 'src/components/icons'
import { createOverlay, closeOverlay } from 'src/components/overlay'
import confirm from 'src/components/confirm'
import { copyToClipboard } from 'src/components/clipboard'
import NewWebhookModal from '../new-webhook-modal'
import CSS from './ClientApplication.css'

function CopyToClipboardCell({ text }) {
  return (
    <td className="text-right" onClick={() => copyToClipboard(text)}>
      <Button buttonStyle="invisible">
        <Icons.Clipboard className="svg-primary" />
      </Button>
    </td>
  )
}

export default function ClientApplication({
  application = {},
  webhooks = [],
  subscribeToWebhook = () => {},
  deleteWebhook = () => {}
}) {
  const permalink = `${process.env.REACT_APP_SIGNUP_URL}?merchantToken=${
    application.clientId
  }&metadata={}`

  const handleAddNewWebhook = () => {
    createOverlay(<NewWebhookModal onSave={subscribeToWebhook} onClose={closeOverlay} />)
  }

  const handleDeleteWebhook = id => {
    confirm(<FormattedMessage id="fragments.client_application.confirm_delete_webhook" />).then(
      () => deleteWebhook(id)
    )
  }

  return (
    <Panel>
      <Panel.Body>
        <section className="mgi-section">
          <h3 className="text-active">
            <FormattedMessage id="fragments.client_application.production_title" />
            <p>
              <FormattedMessage id="fragments.client_application.production_subtitle" />
            </p>
          </h3>
        </section>
        <section className="mgi-section">
          <table className="mgi-table">
            <colgroup>
              <col className={CSS.headerColumn} />
              <col />
              <col className={CSS.copyButtonColumn} />
            </colgroup>
            <tbody>
              <tr>
                <th>
                  <FormattedMessage id="fragments.client_application.client_id" />
                </th>
                <td className="text-secondary">{application.clientId}</td>
                <CopyToClipboardCell text={application.clientId} />
              </tr>
              <tr>
                <th>
                  <FormattedMessage id="fragments.client_application.client_secret" />
                </th>
                <td className="text-secondary">{application.clientSecret}</td>
                <CopyToClipboardCell text={application.clientSecret} />
              </tr>
              <tr>
                <th>
                  <FormattedMessage id="fragments.client_application.permalink" />
                </th>
                <td className="text-secondary">{permalink}</td>
                <CopyToClipboardCell text={permalink} />
              </tr>
              {webhooks.map((webhook, index) => (
                <tr key={webhook.id}>
                  {index === 0 && (
                    <th rowSpan={webhooks.length}>
                      <FormattedMessage id="fragments.client_application.webhook" />
                    </th>
                  )}
                  <td className="mgi-items">
                    <code className="mgi-items--grow">{webhook.url}</code>
                    <Button buttonStyle="invisible" onClick={() => handleDeleteWebhook(webhook.id)}>
                      <Icons.TrashBin className="svg-error" />
                    </Button>
                  </td>
                  <CopyToClipboardCell text={webhook.url} />
                </tr>
              ))}

              {webhooks.length === 0 && (
                <tr>
                  <th>
                    <FormattedMessage id="fragments.client_application.webhook" />
                  </th>
                  <td>
                    <Button buttonStyle="primary" onClick={handleAddNewWebhook}>
                      <FormattedMessage id="fragments.client_application.add_webhook" />
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </Panel.Body>
    </Panel>
  )
}
