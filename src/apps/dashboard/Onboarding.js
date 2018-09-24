import React from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Button } from 'mgi-ui-components'
import { ConfigureFlow } from 'src/components/flow'
import { TestWebhook } from 'src/components/webhook'
import { WebhookURLForm } from 'src/components/webhook-url-form'
import { MatiButton } from 'src/components/mati-button'
import {
  getMerchant,
  saveConfiguration,
  AVAILABLE_COLORS,
  AVAILABLE_LANGUAGES,
  AVAILABLE_DOCUMENT_TYPES
} from 'src/state/merchant'
import { subscribeToWebhook, getWebhooks } from 'src/state/webhooks'

import styles from './Onboarding.css'

@connect(
  state => ({
    token: state.auth.token,
    configuration: state.merchant.configuration,
    lastWebhook: state.webhooks
  }),
  { getMerchant, saveConfiguration, subscribeToWebhook, getWebhooks }
)
export default class Onboarding extends React.Component {
  componentDidMount() {
    this.props.getMerchant(this.props.token)
    this.props.getWebhooks(this.props.token)
  }

  updateConfiguration = settings => {
    const configuration = {
      ...this.props.configuration,
      ...settings,
      version: (parseInt(this.props.configuration.version, 10) || 0) + 1
    }
    this.props.saveConfiguration(this.props.token, configuration)
  }

  render() {
    return (
      <div className={styles.onboarding}>
        <div className={styles.content}>
          <section>
            <h2>
              <FormattedMessage id="onboarding.flow.title" />
            </h2>
            <ConfigureFlow
              {...this.props.configuration}
              availableButtonColors={AVAILABLE_COLORS}
              availableLanguages={AVAILABLE_LANGUAGES}
              availableDocumentTypes={AVAILABLE_DOCUMENT_TYPES}
              updateConfiguration={this.updateConfiguration}
            />
          </section>
          <section>
            <h2>
              <FormattedMessage id="onboarding.webhook.title" />
            </h2>
            <TestWebhook />
          </section>
          <section>
            <h2>
              <FormattedMessage id="onboarding.webhookUrl.title" />
            </h2>
            <WebhookURLForm
              token={this.props.token}
              subscribeToWebhook={this.props.subscribeToWebhook}
              url={this.props.lastWebhook.url}
            />
          </section>
          {/* <section>
            <h2>
              <FormattedMessage id="onboarding.pricing.title" />
            </h2>
            <Button buttonStyle="primary">
              <FormattedMessage id="onboarding.pricing.button" />
            </Button>
          </section> */}
        </div>
        <div className={styles.sidebar}>
          <h3>
            <FormattedMessage id="onboarding.demo.title" />
          </h3>
          <p className="text-secondary">
            <FormattedMessage id="onboarding.demo.help-text" />
          </p>
          <MatiButton />
        </div>
      </div>
    )
  }
}
