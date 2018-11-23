import React from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import {
  subscribeToWebhook,
  deleteWebhook,
  getWebhooks,
  getWebhooksSamples
} from 'src/state/webhooks'
import { sendNotification } from 'src/components/notification'
import { Content } from 'src/components/application-box'
import { WebhookURLForm } from 'src/components/webhook-url-form'
import Icons from 'src/components/icons'
import WebhookExamples from 'src/components/webhook-examples'
import Panel from 'src/components/panel'
import CSS from './style.scss'

export default
@connect(
  ({ auth: { token }, webhooks: { lastWebhook, testWebhooks } }) => ({
    token,
    lastWebhook,
    testWebhooks
  }),
  {
    subscribeToWebhook,
    deleteWebhook,
    getWebhooks,
    getWebhooksSamples
  }
)
@injectIntl
class Developers extends React.Component {
  handleSubscribeToWebhook = url => {
    const {
      token,
      lastWebhook,
      intl,
      subscribeToWebhook,
      deleteWebhook
    } = this.props
    if (lastWebhook.id) deleteWebhook(token, lastWebhook.id)
    return subscribeToWebhook(token, { url }).then(() =>
      sendNotification(intl.formatMessage({ id: 'webhookUrl.confirmation' }))
    )
  }

  componentDidMount() {
    this.props.getWebhooks(this.props.token)
    this.props.getWebhooksSamples(this.props.token)
  }

  render() {
    return (
      <Content>
        <Panel caption={this.props.intl.formatMessage({ id: 'webhook' })}>
          <Panel.Header>
            <Icons.Info />
            <span className={CSS.webhookUrlHeader}>
              <FormattedMessage id="developers.webhook.form.description" />
            </span>
          </Panel.Header>
          <Panel.Body>
            <WebhookURLForm
              subscribeToWebhook={this.handleSubscribeToWebhook}
              url={this.props.lastWebhook.url}
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
      </Content>
    )
  }
}
