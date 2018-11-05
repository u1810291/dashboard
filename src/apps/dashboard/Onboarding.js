import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import Button from 'src/components/button'
import { Modal } from 'src/components/modal'
import {
  DocumentTypeStep,
  ButtonColorStep,
  ButtonLanguageStep,
  GlobalWatchlistStep
} from 'src/components/flow/steps'
import { TestWebhook } from 'src/components/webhook'
import { WebhookURLForm } from 'src/components/webhook-url-form'
import { MatiButton } from 'src/components/mati-button'
import { Sidebar, Content } from 'src/components/application-box'
import {
  getIntegrationCode,
  saveConfiguration,
  AVAILABLE_COLORS,
  AVAILABLE_LANGUAGES,
  AVAILABLE_DOCUMENT_TYPES
} from 'src/state/merchant'
import { sendNotification } from 'src/components/notification'
import { SyntaxHighlighter } from 'src/components/syntax-highlighter'
import {
  subscribeToWebhook,
  getWebhooks,
  getWebhooksSamples,
  deleteWebhook
} from 'src/state/webhooks'
import IntegrationIcon from 'src/assets/icon-integration.svg'
import styles from './Onboarding.css'

@injectIntl
@connect(
  ({
    auth: { token },
    merchant: { configuration, integrationCode },
    webhooks: { lastWebhook, testWebhooks }
  }) => ({ token, configuration, lastWebhook, testWebhooks, integrationCode }),
  {
    saveConfiguration,
    subscribeToWebhook,
    deleteWebhook,
    getWebhooks,
    getWebhooksSamples,
    getIntegrationCode
  }
)
export default class Onboarding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideIntegrationCode: true
    }
  }

  showDemoNotification = () => {
    sendNotification(this.props.intl.formatMessage({ id: 'onboarding.demo.confirmation' }), 5000)
  }

  closeIntegrationCode = () => {
    this.setState({ hideIntegrationCode: true })
  }

  toggleIntegrationCode = () => {
    this.props.getIntegrationCode(this.props.token).then(value => {
      this.setState({ hideIntegrationCode: false })
    })
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    this.props.getWebhooks(this.props.token)
    this.props.getWebhooksSamples(this.props.token)
    this.props.getIntegrationCode(this.props.token)
  }

  updateConfiguration = settings => {
    this.props.saveConfiguration(this.props.token, settings)
  }

  handleSubscribeToWebhook = url => {
    const { token, lastWebhook, intl, subscribeToWebhook, deleteWebhook } = this.props
    if (lastWebhook.id) deleteWebhook(token, lastWebhook.id)
    return subscribeToWebhook(token, { url }).then(() =>
      sendNotification(intl.formatMessage({ id: 'webhookUrl.confirmation' }))
    )
  }

  render() {
    const flowSteps = [
      <DocumentTypeStep
        availableDocumentTypes={AVAILABLE_DOCUMENT_TYPES}
        documents={this.props.configuration.documents}
        onClick={this.updateConfiguration}
      />,
      <ButtonColorStep
        availableButtonColors={AVAILABLE_COLORS}
        color={this.props.configuration.color}
        onClick={this.updateConfiguration}
      />,
      <ButtonLanguageStep
        availableLanguages={AVAILABLE_LANGUAGES}
        language={this.props.configuration.language}
        onClick={this.updateConfiguration}
      />,
      <GlobalWatchlistStep
        globalWatchList={this.props.configuration.globalWatchList}
        onClick={this.updateConfiguration}
      />
    ]
    let stepsIndex = 0
    const getIndex = () => `${++stepsIndex}. `
    return (
      <React.Fragment>
        <Content className={styles.content}>
          <section>
            <h2>
              {getIndex()}
              <FormattedMessage id="onboarding.flow.title" />
            </h2>
            {flowSteps.map((step, index) => (
              <section className="mgi-section-separated" key={index}>
                {step}
              </section>
            ))}
          </section>
          <MediaQuery query="(max-width: 769px)">
            <section>
              <h2>
                {getIndex()}
                <FormattedMessage id="onboarding.demo.title" />
              </h2>
              <p>
                <FormattedMessage id="onboarding.demo.help-text" />
              </p>
              <MatiButton
                language={this.props.configuration.language}
                color={this.props.configuration.color}
                clientId={this.props.token}
                onSuccess={this.showDemoNotification}
                className={styles.matiMobileButton}
                responsive
              />
              <p>
                <FormattedMessage id="onboarding.integrationCode.modalTitle" />
              </p>
              <Button onClick={this.toggleIntegrationCode} className={styles.mobileShowIntegration}>
                <img src={IntegrationIcon} alt="" />
                <FormattedMessage id="onboarding.integrationCode.button" />
              </Button>
{/*
              <SyntaxHighlighter
                language="html"
                copyToClipboard
                lineNumbers={false}
                copyNotification={this.props.intl.formatMessage({
                  id: 'onboarding.integrationCode.confirmation'
                })}
              >
                {this.props.integrationCode || ""}
              </SyntaxHighlighter> */}
            </section>
          </MediaQuery>
          <section>
            <h2>
              {getIndex()}
              <FormattedMessage id="onboarding.webhook.title" />
            </h2>
            <TestWebhook webhooks={this.props.testWebhooks} />
          </section>
          <section>
            <h2>
              {getIndex()}
              <FormattedMessage id="onboarding.webhookUrl.title" />
            </h2>
            <WebhookURLForm
              subscribeToWebhook={this.handleSubscribeToWebhook}
              url={this.props.lastWebhook.url}
            />
          </section>
          <section>
            <h2>
              {getIndex()}
              <FormattedMessage id="onboarding.pricing.title" />
            </h2>
            <p>
              <FormattedMessage id="onboarding.pricing.text" />{' '}
              <Link to="/upgrade">
                <FormattedMessage id="onboarding.pricing.link" />
              </Link>
            </p>
          </section>
        </Content>
        <MediaQuery query="(min-width: 769px)">
          <Sidebar className={styles.sidebar}>
            <h3>
              <FormattedMessage id="onboarding.demo.title" />
            </h3>
            <p className="text-secondary">
              <FormattedMessage id="onboarding.demo.help-text" />
            </p>
            <MatiButton
              language={this.props.configuration.language}
              color={this.props.configuration.color}
              clientId={this.props.clientId}
              onSuccess={this.showDemoNotification}
              className={styles.matiButton}
            />
            <div className={styles.showIntegrationCodeButton}>
              <Button onClick={this.toggleIntegrationCode}>
                <img src={IntegrationIcon} alt="" />
                <FormattedMessage id="onboarding.integrationCode.button" />
              </Button>
            </div>
          </Sidebar>
        </MediaQuery>
        {!this.state.hideIntegrationCode && (
          <Modal onClose={this.closeIntegrationCode} className={styles.integrationCodeModal}>
            <header>
              <FormattedMessage id="onboarding.integrationCode.modalTitle" />
            </header>
            <main>
              <SyntaxHighlighter
                language="html"
                copyToClipboard
                copyNotification={this.props.intl.formatMessage({
                  id: 'onboarding.integrationCode.confirmation'
                })}
              >
                {this.props.integrationCode}
              </SyntaxHighlighter>
            </main>
            <footer className="modal--footer-transparent modal--footer-center">
              <Button buttonStyle="primary" onClick={this.closeIntegrationCode}>
                <FormattedMessage id="got-it" />
              </Button>
            </footer>
          </Modal>
        )}
      </React.Fragment>
    )
  }
}
