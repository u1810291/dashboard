import React from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { get } from 'lodash'
import { subscribeToWebhook, deleteWebhook, getWebhooks } from 'src/state/webhooks'
import { getMerchantApps, createApplication } from 'src/state/merchant'
import { Content } from 'src/components/application-box'
import Webhooks from 'src/fragments/account/webhooks'
import Permalink from 'src/fragments/account/permalink'
import Button from 'src/components/button'
import Panel from 'src/components/panel'
import { showIntercom } from 'src/lib/intercom'
import SupportIcon from './support.svg'
import CSS from './style.scss'
import ApplicationsList from '../../fragments/account/applications-list'

export default
@connect(
  ({ auth: { token }, webhooks: { webhooks }, merchant: { apps } }) => ({
    token,
    webhooks,
    clientApplicationsList: apps || [],
    firstClientApp: get(apps, '[0]', {})
  }),
  {
    subscribeToWebhook,
    deleteWebhook,
    getWebhooks,
    getMerchantApps,
    createApplication
  }
)
@injectIntl
class Developers extends React.Component {
  handleSubscribeToWebhook = async (url, secret) => {
    const { firstClientApp, subscribeToWebhook } = this.props
    await subscribeToWebhook(firstClientApp.clientId, { url, secret })
    await getWebhooks(firstClientApp.clientId)
  }

  handleDeleteWebhook = async id => {
    const { deleteWebhook, firstClientApp, getWebhooks } = this.props
    await deleteWebhook(firstClientApp.clientId, id)
    await getWebhooks(firstClientApp.clientId)
  }

  async componentDidMount() {
    const { getMerchantApps, getWebhooks, token } = this.props
    const {
      data: { apps }
    } = await getMerchantApps(token)
    await getWebhooks(apps[0].clientId)
  }

  render() {
    const { token, firstClientApp, createApplication, clientApplicationsList } = this.props
    return (
      <Content>
        <div className={CSS.content}>
          <Panel>
            <Panel.Body className={CSS.supportPanel}>
              <div className={CSS.supportContainer}>
                <div className={CSS.supportIconWrapper}>
                  <SupportIcon />
                </div>
                <div className={CSS.supportText}>
                  <FormattedMessage id="developers.support.chat" />
                </div>
                <div className={CSS.supportButtonWrapper}>
                  <Button buttonStyle="primary" onClick={showIntercom}>
                    <FormattedMessage id="developers.support.contact" />
                  </Button>
                </div>
              </div>
            </Panel.Body>
          </Panel>
          <Webhooks
            subscribeToWebhook={this.handleSubscribeToWebhook}
            deleteWebhook={this.handleDeleteWebhook}
            webhooks={this.props.webhooks}
          />
          <Permalink
            urlBase={process.env.REACT_APP_SIGNUP_URL}
            clientId={firstClientApp.clientId}
          />
          <Panel>
            <Panel.Body>
              <section className="mgi-section">
                <h3>
                  <FormattedMessage id="developers.token.caption" />
                </h3>
              </section>
              <ApplicationsList
                clientApplicationsList={clientApplicationsList}
                createApplication={() => createApplication(token)}
              />
            </Panel.Body>
          </Panel>
        </div>
      </Content>
    )
  }
}
