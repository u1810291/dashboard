import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { getMerchantApps } from 'state/merchant'
import { subscribeToWebhook, deleteWebhook, getWebhooks } from 'state/webhooks'
import Items from 'components/items'
import ClientApplication from 'fragments/account/client-application'
import Support from 'fragments/account/support'
import IntegrationLayout from './IntegrationLayout'

function ClientApplications({
  apps = [],
  token,
  webhooks = {},
  getMerchantApps,
  subscribeToWebhook,
  deleteWebhook,
  getWebhooks
}) {
  useEffect(() => {
    getMerchantApps(token).then(response => {
      const apps = get(response, 'data.apps', [])
      apps.forEach(app => getWebhooks(token, app.clientId))
    })
  }, [getMerchantApps, getWebhooks, token])

  async function handleSubscribeToWebhook(clientId, url, secret) {
    await subscribeToWebhook(token, clientId, { url, secret })
    await getWebhooks(token, clientId)
  }

  async function handleDeleteWebhook(clientId, id) {
    await deleteWebhook(token, clientId, id)
    await getWebhooks(token, clientId)
  }

  return (
    <IntegrationLayout>
      <main>
        <Items flow="row">
          {apps.map(app => (
            <ClientApplication
              key={app.clientId}
              application={app}
              webhooks={webhooks[app.clientId]}
              subscribeToWebhook={handleSubscribeToWebhook.bind(
                null,
                app.clientId
              )}
              deleteWebhook={handleDeleteWebhook.bind(null, app.clientId)}
            />
          ))}
        </Items>
      </main>
      <aside>
        <Support />
      </aside>
    </IntegrationLayout>
  )
}

export default connect(
  state => ({
    apps: state.merchant.apps,
    token: state.auth.token,
    webhooks: state.webhooks.webhooks
  }),
  {
    getMerchantApps,
    subscribeToWebhook,
    deleteWebhook,
    getWebhooks
  }
)(ClientApplications)
