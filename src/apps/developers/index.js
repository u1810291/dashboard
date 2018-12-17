import React from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { last } from 'lodash'
import {
  subscribeToWebhook,
  deleteWebhook,
  getWebhooks,
  getWebhooksSamples
} from 'src/state/webhooks'
import { getMerchantApps, createApplication } from 'src/state/merchant'
import { notification } from 'src/components/notification'
import { Content } from 'src/components/application-box'
import { WebhookURLForm } from 'src/components/webhook-url-form'
import Icons from 'src/components/icons'
import WebhookExamples from 'src/components/webhook-examples'
import ManageApplicationsForm from 'src/components/manage-applications-form'
import Panel from 'src/components/panel'
import CSS from './style.scss'

export default
@connect(
  ({
    auth: { token },
    webhooks: { lastWebhook, testWebhooks },
    merchant: { apps }
  }) => ({
    token,
    lastWebhook,
    testWebhooks,
    clientApplication: last(apps) || {}
  }),
  {
    subscribeToWebhook,
    deleteWebhook,
    getWebhooks,
    getWebhooksSamples,
    getMerchantApps,
    createApplication
  }
)
@injectIntl
class Developers extends React.Component {
  handleSubscribeToWebhook = async url => {
    const {
      token,
      lastWebhook,
      intl,
      subscribeToWebhook,
      deleteWebhook
    } = this.props

    if (lastWebhook.id) {
      await deleteWebhook(token, lastWebhook.id, false)
    }

    if (url) {
      await subscribeToWebhook(token, { url })
      notification.success(
        intl.formatMessage({ id: 'webhookUrl.confirmation' })
      )
    }
  }

  componentDidMount() {
    this.props.getWebhooks(this.props.token)
    this.props.getWebhooksSamples(this.props.token)
    this.props.getMerchantApps(this.props.token)
  }

  render() {
    const { token, clientApplication, createApplication } = this.props
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
              url={this.props.lastWebhook.url || ''}
            />
          </Panel.Body>
        </Panel>
        <Panel
          caption={this.props.intl.formatMessage({
            id: 'developers.token.caption'
          })}
        >
          <Panel.Body>
            <ManageApplicationsForm
              clientId={clientApplication.clientId}
              clientSecret={clientApplication.clientSecret}
              createApplication={() => createApplication(token)}
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
