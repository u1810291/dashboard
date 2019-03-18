import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { getMerchantApps } from 'src/state/merchant'
import { subscribeToWebhook, deleteWebhook, getWebhooks } from 'src/state/webhooks'
import ClientApplication from 'src/fragments/account/client-application'
import Support from 'src/fragments/account/support'
// import ClientApplicationsHelp from 'src/fragments/account/client-applications-help'
import SettingsCSS from '../Settings.scss'

function ClientApplications({
  apps = [],
  token,
  webhooks,
  getMerchantApps,
  subscribeToWebhook,
  deleteWebhook,
  getWebhooks
}) {
  useEffect(() => {
    getMerchantApps(token).then(response => {
      const apps = get(response, 'data.apps', [])
      apps.forEach(app => getWebhooks(app.clientId))
    })
  }, [])

  async function handleSubscribeToWebhook(clientId, url, secret) {
    await subscribeToWebhook(clientId, { url, secret })
    await getWebhooks(clientId)
  }

  async function handleDeleteWebhook(clientId, id) {
    await deleteWebhook(clientId, id)
    await getWebhooks(clientId)
  }

  return (
    <React.Fragment>
      <h2>
        <FormattedMessage id="settings.applications" />
      </h2>
      <div className="mgi-items">
        <section className={SettingsCSS.centralBlock}>
          {apps.map(app => (
            <ClientApplication
              key={app.clientId}
              application={app}
              webhooks={webhooks[app.clientId]}
              subscribeToWebhook={handleSubscribeToWebhook.bind(null, app.clientId)}
              deleteWebhook={handleDeleteWebhook.bind(null, app.clientId)}
            />
          ))}
        </section>
        <section className={SettingsCSS.rightBlock}>
          <Support />
        </section>
      </div>
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
