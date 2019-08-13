import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from 'components/button'
import Icons from 'components/icons'
import Items from 'components/items'
import { createOverlay, closeOverlay } from 'components/overlay'
import confirm from 'components/confirm'
import classNames from 'classnames'
import { copyToClipboard } from 'components/clipboard'
import NewWebhookModal from '../new-webhook-modal'
import CSS from './ClientApplication.module.css'
import { ReactComponent as Icon } from 'assets/copy-icon.v1.svg'

function CopyToClipboardCell({ text }) {
  return (
    <td className={classNames(['text-right', CSS.row])} onClick={() => copyToClipboard(text)}>
      <Button
        className={CSS.copy}
      >
        <Icon />
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
  const metadata = '{"email":"user@example.com"}'
  const permalink = `${process.env.REACT_APP_SIGNUP_URL}?merchantToken=${
    application.clientId
  }&metadata=${metadata}`

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
    <Items flow="row">
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
                  <FormattedMessage id="onboarding.webhookUrl.title" />
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
                <FormattedMessage id="onboarding.webhookUrl.title" />
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
  )
}
