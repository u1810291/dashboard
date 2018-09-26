import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import { Button, Modal } from 'mgi-ui-components'
import { ConfigureFlow } from 'src/components/flow'
import { TestWebhook } from 'src/components/webhook'
import { WebhookURLForm } from 'src/components/webhook-url-form'
import { MatiButton } from 'src/components/mati-button'
import {
  getMerchant,
  getIntegrationCode,
  saveConfiguration,
  AVAILABLE_COLORS,
  AVAILABLE_LANGUAGES,
  AVAILABLE_DOCUMENT_TYPES
} from 'src/state/merchant'
import { subscribeToWebhook, getWebhooks } from 'src/state/webhooks'

import styles from './Onboarding.css'

@injectIntl
@connect(
  state => ({
    token: state.auth.token,
    configuration: state.merchant.configuration,
    lastWebhook: state.webhooks.lastWebhook,
    testWebhooks: state.webhooks.testWebhooks,
    integrationCode: state.merchant.integrationCode
  }),
  { getMerchant, saveConfiguration, subscribeToWebhook, getWebhooks, getIntegrationCode }
)
export default class Onboarding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideIntegrationCode: true
    }
  }
  componentDidMount() {
    this.props.getMerchant(this.props.token)
    this.props.getWebhooks(this.props.token)
    this.props.getIntegrationCode(this.props.token)
  }

  updateConfiguration = settings => {
    const configuration = {
      ...this.props.configuration,
      ...settings,
      version: (parseInt(this.props.configuration.version, 10) || 0) + 1
    }
    this.props.saveConfiguration(this.props.token, configuration).then(() => {
      this.props.getIntegrationCode(this.props.token)
    })
  }

  toggleIntegrationCode = () => {
    this.refs.integrationCodeModal.open()
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
            <TestWebhook webhooks={this.props.testWebhooks}/>
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
          <MatiButton
            language={this.props.configuration.language}
            color={this.props.configuration.color}
            clientId="5ba18720ef262b3cca94a375"
          />
          <div className={styles.showIntegrationCodeButton}>
            <Button onClick={this.toggleIntegrationCode}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.94692 0.168294L9.40628 0.02008C9.33669 -0.00312608 9.26814 0.00417162 9.20148 0.0419121C9.13461 0.0796831 9.08945 0.136385 9.06625 0.211927L5.81452 11.4665C5.79132 11.5421 5.79858 11.6134 5.83635 11.6801C5.87412 11.747 5.93071 11.792 6.00637 11.8152L6.54686 11.9635C6.6166 11.9869 6.6849 11.9796 6.75174 11.9418C6.81861 11.9038 6.86368 11.8473 6.88686 11.7719L10.1387 0.517088C10.1619 0.441546 10.1546 0.370278 10.1168 0.303378C10.079 0.236507 10.0225 0.191469 9.94692 0.168294Z" fill="#2196F3"/>
              <path d="M5.0738 2.36527C5.0738 2.28972 5.0447 2.22282 4.9866 2.16475L4.55066 1.72884C4.49255 1.67073 4.42568 1.6416 4.35014 1.6416C4.2746 1.6416 4.20769 1.67076 4.14962 1.72884L0.0872061 5.79125C0.0290076 5.84936 0 5.91623 0 5.99177C0 6.06731 0.0290992 6.13418 0.0872061 6.19226L4.14959 10.2547C4.20766 10.3129 4.27444 10.3418 4.35011 10.3418C4.42577 10.3418 4.49255 10.3128 4.55063 10.2547L4.98657 9.81901C5.04467 9.76093 5.07377 9.69403 5.07377 9.6184C5.07377 9.54294 5.04467 9.47607 4.98657 9.418L1.56052 5.99177L4.9866 2.56578C5.04479 2.50771 5.0738 2.44081 5.0738 2.36527Z" fill="#2196F3"/>
              <path d="M15.8661 5.79125L11.8036 1.72884C11.7455 1.67076 11.6786 1.6416 11.6032 1.6416C11.5275 1.6416 11.4609 1.67076 11.4026 1.72884L10.9668 2.16472C10.9087 2.22282 10.8798 2.2896 10.8798 2.36524C10.8798 2.44087 10.9087 2.50768 10.9668 2.56575L14.393 5.99183L10.9668 9.41809C10.9087 9.47617 10.8798 9.54307 10.8798 9.61849C10.8798 9.69415 10.9087 9.76102 10.9668 9.8191L11.4026 10.2548C11.4609 10.313 11.5275 10.3419 11.6032 10.3419C11.6786 10.3419 11.7455 10.3129 11.8036 10.2548L15.8661 6.19238C15.9242 6.1343 15.9532 6.06731 15.9532 5.99177C15.9532 5.9162 15.9242 5.84933 15.8661 5.79125Z" fill="#2196F3"/>
              </svg>
              {' '}
              <FormattedMessage id="onboarding.integrationCode.button" />
            </Button>
          </div>

          <Modal
            className={styles.integrationCodeModal}
            title={this.props.intl.formatMessage({ id: 'onboarding.integrationCode.modalTitle' })}
            ref="integrationCodeModal">
            <SyntaxHighlighter language='html'>
              {this.props.integrationCode}
            </SyntaxHighlighter>
          </Modal>
        </div>
      </div>
    )
  }
}
