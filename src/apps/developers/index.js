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
    clientApplicationsList: apps || []
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
  handleSubscribeToWebhook = (url, secret) => {
    const { token, subscribeToWebhook } = this.props
    return subscribeToWebhook(token, { url, secret })
  }

  handleDeleteWebhook = id => {
    const { deleteWebhook, token, getWebhooks } = this.props
    return deleteWebhook(token, id).then(getWebhooks.bind(null, token))
  }

  componentDidMount() {
    this.props.getWebhooks(this.props.token)
    this.props.getMerchantApps(this.props.token)
  }

  render() {
    const { token, createApplication, clientApplicationsList } = this.props
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
            clientId={get(clientApplicationsList, '[0].clientId')}
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
