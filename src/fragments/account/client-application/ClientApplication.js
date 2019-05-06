import React from 'react'
import { FormattedMessage } from 'react-intl'
import Card from 'components/card'
import Button from 'components/button'
import Icons from 'components/icons'
import Items from 'components/items'
import { createOverlay, closeOverlay } from 'components/overlay'
import confirm from 'components/confirm'
import { copyToClipboard } from 'components/clipboard'
import NewWebhookModal from '../new-webhook-modal'
import CSS from './ClientApplication.module.css'

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
    createOverlay(
      <NewWebhookModal onSave={subscribeToWebhook} onClose={closeOverlay} />
    )
  }

  const handleDeleteWebhook = id => {
    confirm(
      <FormattedMessage id="fragments.client_application.confirm_delete_webhook" />
    ).then(() => deleteWebhook(id))
  }

  return (
    <Card>
      <Items flow="row">
        <h3 className="text-active">
          <FormattedMessage id="fragments.client_application.production_title" />
        </h3>
        <hr />
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
                <td>
                  <Items templateColumns="minmax(auto, 100%) auto">
                    <code>{webhook.url}</code>
                    <Button
                      buttonStyle="invisible"
                      onClick={() => handleDeleteWebhook(webhook.id)}
                    >
                      <Icons.TrashBin className="svg-error" />
                    </Button>
                  </Items>
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
      </Items>
    </Card>
  )
}
