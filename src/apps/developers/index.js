import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { last } from 'lodash'
import {
  subscribeToWebhook,
  deleteWebhook,
  getWebhooks
} from 'src/state/webhooks'
import { getMerchantApps } from 'src/state/merchant'
import { Content } from 'src/components/application-box'
import Webhooks from 'src/fragments/account/webhooks'
import WebhookExamples from 'src/fragments/webhook-examples'
import ManageApplicationsForm from 'src/fragments/manage-applications-form'
import Panel from 'src/components/panel'
import CSS from './style.scss'

export default
@connect(
  ({ auth: { token }, webhooks: { webhooks }, merchant: { apps } }) => ({
    token,
    webhooks,
    clientApplication: last(apps) || {}
  }),
  {
    subscribeToWebhook,
    deleteWebhook,
    getWebhooks,
    getMerchantApps
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
    const { clientApplication } = this.props
    return (
      <Content>
        <div className={CSS.content}>
          <Webhooks
            subscribeToWebhook={this.handleSubscribeToWebhook}
            deleteWebhook={this.handleDeleteWebhook}
            webhooks={this.props.webhooks}
          />
          <Panel
            caption={this.props.intl.formatMessage({
              id: 'developers.token.caption'
            })}
          >
            <Panel.Body>
              <ManageApplicationsForm
                clientId={clientApplication.clientId}
                clientSecret={clientApplication.clientSecret}
              />
            </Panel.Body>
          </Panel>
          <Panel
            caption={this.props.intl.formatMessage({
              id: 'developers.webhook.example.header'
            })}
          >
            <Panel.Body padded={false}>
              <WebhookExamples />
            </Panel.Body>
          </Panel>
        </div>
      </Content>
    )
  }
}
