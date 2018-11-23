import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
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
import { Tabs, TabList, Tab, TabPanel } from 'src/components/tabs'
import classNames from 'classnames'
import Panel from 'src/components/panel'
import { Input } from 'src/components/inputs'
import Button from 'src/components/button'
import CSS from './styles.scss'

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
        <Panel caption="Webhook">
          <Panel.Header>
            <Icons.Info />
            <span className={CSS.webhookUrlHeader}>
              The weekhook is the way to receive the verification information on
              your backend. You will receive all user information: images of
              selfie & documents, document information (full name, document
              number, face match, and more), liveness score, global watchlist,
              etc... With this information on your backend, you will be able to
              fully automate your verifiation flow.
            </span>
          </Panel.Header>
          <Panel.Body>
            <WebhookURLForm
              subscribeToWebhook={this.handleSubscribeToWebhook}
              url={this.props.lastWebhook.url}
            />
          </Panel.Body>
        </Panel>
        <Panel caption="Developers integration sheet">
          <Panel.Body padded={false}>
            <Tabs className={classNames('tabs', 'stretched')}>
              <TabList>
                <Tab>
                  <Icons.Spy /> <span>Global Watchlist</span>
                </Tab>
                <Tab>
                  <Icons.FaceMatch /> <span>Face Match</span>
                </Tab>
                <Tab>
                  <Icons.TickFilled /> <span>Liveness</span>
                </Tab>
                <Tab>
                  <Icons.WarningTriangle /> <span>OCR data</span>
                </Tab>
              </TabList>
              <TabPanel />
              <TabPanel />
              <TabPanel />
              <TabPanel />
            </Tabs>
          </Panel.Body>
        </Panel>
        <Panel caption="How to fetch images">
          <Panel.Header>
            <div>
              <Icons.Info />
            </div>
            <span>
              Instruction here how to GET sample to fetch images in the webhook
              response
            </span>
          </Panel.Header>
          <Panel.Body />
        </Panel>
      </Content>
    )
  }
}
