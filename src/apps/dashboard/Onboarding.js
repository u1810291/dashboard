import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
  getMerchantApps,
  saveConfiguration,
  AVAILABLE_COLORS,
  AVAILABLE_LANGUAGES,
  AVAILABLE_DOCUMENT_TYPES
} from 'src/state/merchant'
import { SyntaxHighlighter } from 'src/components/syntax-highlighter'
import { subscribeToWebhook, getWebhooks } from 'src/state/webhooks'
import clipboard from 'clipboard-polyfill'
import { sendNotification } from 'src/components/notification'
import IntegrationIcon from 'src/assets/icon-integration.svg'
import styles from './Onboarding.css'

@injectIntl
@connect(
  state => ({
    token: state.auth.token,
    configuration: state.merchant.configuration,
    lastWebhook: state.webhooks.lastWebhook,
    testWebhooks: state.webhooks.testWebhooks,
    integrationCode: state.merchant.integrationCode,
    clientId: state.merchant.anyApplication.clientId
  }),
  {
    saveConfiguration,
    subscribeToWebhook,
    getWebhooks,
    getIntegrationCode,
    getMerchantApps
  }
)
export default class Onboarding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideIntegrationCode: true
      // showDemoNotification: false
    }
  }
  componentDidMount() {
    this.props.getWebhooks(this.props.token)
    this.props.getIntegrationCode(this.props.token)
    this.props.getMerchantApps(this.props.token)
  }

  updateConfiguration = settings => {
    this.props.getMerchantApps(this.props.token)
    this.props.saveConfiguration(this.props.token, settings)
  }

  showDemoNotification = () => {
    // this.setState({
    //   showDemoNotification: true
    // })
    // setInterval(() => {
    //   this.setState({
    //     showDemoNotification: false
    //   })
    // }, 10000)
  }

  handleIntegrationCodeCopy = () => {
    clipboard.writeText(this.props.integrationCode)
    sendNotification(
      this.props.intl.formatMessage({ id: 'onboarding.integrationCode.confirmation' })
    )
  }

  toggleIntegrationCode = () => {
    this.props.getIntegrationCode(this.props.token).then(value => {
      this.setState({ hideIntegrationCode: false })
    })
  }

  closeIntegrationCode = () => {
    this.setState({ hideIntegrationCode: true })
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
    return (
      <React.Fragment>
        <Content className={styles.content}>
          <section>
            <h2>
              <FormattedMessage id="onboarding.flow.title" />
            </h2>
            {flowSteps.map((step, index) => (
              <section className="mgi-section-separated" key={index}>
                {step}
              </section>
            ))}
          </section>
          <section>
            <h2>
              <FormattedMessage id="onboarding.webhook.title" />
            </h2>
            <TestWebhook webhooks={this.props.testWebhooks} />
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
          <section>
            <h2>
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
          {/* {this.state.showDemoNotification && (
            <p className="text-secondary">
              <FormattedMessage id="onboarding.demo.confirmation" />
            </p>
          )} */}
          <div className={styles.showIntegrationCodeButton}>
            <Button onClick={this.toggleIntegrationCode}>
              <img src={IntegrationIcon} alt="" />{' '}
              <FormattedMessage id="onboarding.integrationCode.button" />
            </Button>
          </div>

          {!this.state.hideIntegrationCode && (
            <Modal
              onClose={this.closeIntegrationCode}
              closeButton={false}
              className={styles.integrationCodeModal}
            >
              <header>
                <FormattedMessage id="onboarding.integrationCode.modalTitle" />
              </header>
              <main>
                <SyntaxHighlighter language="html">{this.props.integrationCode}</SyntaxHighlighter>
              </main>
              <footer>
                <Button
                  buttonStyle="no-borders default text-secondary"
                  onClick={this.handleIntegrationCodeCopy}
                >
                  <FormattedMessage id="copy-to-clipboard" />
                </Button>
                <Button buttonStyle="primary" onClick={this.closeIntegrationCode}>
                  <FormattedMessage id="done" />
                </Button>
              </footer>
            </Modal>
          )}
        </Sidebar>
      </React.Fragment>
    )
  }
}
