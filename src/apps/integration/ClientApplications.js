import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { getMerchantApps } from 'src/state/merchant'
import {
  subscribeToWebhook,
  deleteWebhook,
  getWebhooks
} from 'src/state/webhooks'
import ClientApplication from 'src/fragments/account/client-application'
import Support from 'src/fragments/account/support'

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
  }, [])

  async function handleSubscribeToWebhook(clientId, url, secret) {
    await subscribeToWebhook(token, clientId, { url, secret })
    await getWebhooks(token, clientId)
  }

  async function handleDeleteWebhook(clientId, id) {
    await deleteWebhook(token, clientId, id)
    await getWebhooks(token, clientId)
  }

  return (
    <React.Fragment>
      <main>
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
      </main>
      <aside>
        <Support />
      </aside>
    </React.Fragment>
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
