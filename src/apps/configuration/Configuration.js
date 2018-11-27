import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import Button from 'src/components/button'
import { Modal } from 'src/components/modal'
import { MatiButton } from 'src/components/mati-button'
import { Sidebar, Content } from 'src/components/application-box'
import {
  getIntegrationCode,
  saveConfiguration,
  AVAILABLE_COLORS,
  AVAILABLE_LANGUAGES,
  AVAILABLE_DOCUMENT_TYPES,
  MANDATORY_DOCUMENT_TYPES
} from 'src/state/merchant'
import { notification } from 'src/components/notification'
import { SyntaxHighlighter } from 'src/components/syntax-highlighter'
import IntegrationIcon from 'src/assets/icon-integration.svg'
import ColorStep from './ColorStep'
import DocumentTypesStep from './DocumentTypesStep'
import LanguageStep from './LanguageStep'
import SafetyProStep from './SafetyProStep'
import CSS from './Configuration.css'
import IconCurlyArrowUp from 'src/assets/icon-curly-arrow-up.svg'
import IconIOS from 'src/assets/icon-ios.svg'
import IconAndroid from 'src/assets/icon-android.svg'
import IconPlay from 'src/assets/icon-play.svg'

export default
@injectIntl
@connect(
  ({ auth: { token }, merchant: { configuration, integrationCode } }) => ({
    token,
    configuration,
    integrationCode
  }),
  {
    saveConfiguration,
    getIntegrationCode
  }
)
class Configuration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideIntegrationCode: true
    }
  }

  showDemoNotification = () => {
    notification.info(
      this.props.intl.formatMessage({ id: 'onboarding.demo.confirmation' })
    )
  }

  closeIntegrationCode = () => {
    this.setState({ hideIntegrationCode: true })
  }

  toggleIntegrationCode = () => {
    this.props.getIntegrationCode(this.props.token).then(value => {
      this.setState({ hideIntegrationCode: false })
    })
  }

  openIosManual() {
    const tab = window.open(
      'https://github.com/MatiFace/mati-global-id-sdk/blob/master/Integration_iOS.md',
      '_blank'
    )
    tab.focus()
  }

  openAndroidManual() {
    const tab = window.open(
      'https://github.com/MatiFace/mati-global-id-sdk/blob/master/Integration_android.md',
      '_blank'
    )
    tab.focus()
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    this.props.getIntegrationCode(this.props.token)
  }

  updateConfiguration = settings => {
    this.props.saveConfiguration(this.props.token, settings)
  }

  render() {
    const flowSteps = [
      <LanguageStep
        availableLanguages={AVAILABLE_LANGUAGES}
        language={this.props.configuration.language}
        onClick={this.updateConfiguration}
      />,
      <ColorStep
        availableButtonColors={AVAILABLE_COLORS}
        currentColor={this.props.configuration.color}
        onClick={this.updateConfiguration}
      />,
      <DocumentTypesStep
        availableDocumentTypes={AVAILABLE_DOCUMENT_TYPES}
        mandatoryDocumentTypes={MANDATORY_DOCUMENT_TYPES}
        documents={this.props.configuration.documents}
        onClick={this.updateConfiguration}
      />,
      <SafetyProStep
        globalWatchList={this.props.configuration.globalWatchList}
        liveness={this.props.configuration.liveness}
        databaseValidation={this.props.configuration.databaseValidation}
        onClick={this.updateConfiguration}
      />
    ]
    return (
      <React.Fragment>
        <Content className={CSS.content}>
          <section>
            <h1>
              <FormattedMessage id="onboarding.flow.title" />
              <p className="text-secondary">
                <FormattedMessage id="onboarding.flow.subtitle" />
              </p>
            </h1>
            {flowSteps.map((step, index) => (
              <section className="mgi-section-separated" key={index}>
                {step}
              </section>
            ))}
          </section>
        </Content>
        <Sidebar className={CSS.sidebar}>
          <p className="text-center">
            <a
              className={CSS.onboardingVideoLink}
              href="https://www.youtube.com/watch?v=NWRc84vkB5I&rel=0"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconPlay />
              <FormattedMessage id="onboarding.video.link" />
            </a>
          </p>
          <div>
            <MatiButton
              language={this.props.configuration.language}
              color={this.props.configuration.color}
              clientId={this.props.token}
              onSuccess={this.showDemoNotification}
              className={CSS.matiButtonConfiguration}
            />
            <div className={CSS.matiButtonHint}>
              <IconCurlyArrowUp />
              <br />
              <FormattedMessage id="onboarding.verify-button-hint" />
            </div>
          </div>
          <div>
            <Button
              className={CSS.showIntegrationCodeButton}
              onClick={this.toggleIntegrationCode}
            >
              <IntegrationIcon />
              <FormattedMessage id="onboarding.integrationCode.button" />
            </Button>
            <div className={CSS.mobileSdkButtons}>
              <Button onClick={this.openIosManual}>
                <IconIOS />
                <FormattedMessage id="onboarding.ios-sdk-link" />
              </Button>
              <Button onClick={this.openAndroidManual}>
                <IconAndroid />
                <FormattedMessage id="onboarding.android-sdk-link" />
              </Button>
            </div>
          </div>
        </Sidebar>
        {!this.state.hideIntegrationCode && (
          <Modal
            onClose={this.closeIntegrationCode}
            className={CSS.integratConfiguration}
          >
            <header>
              <FormattedMessage id="onboarding.integrationCode.modalTitle" />
            </header>
            <main>
              <SyntaxHighlighter
                language="html"
                copyToClipboard
                code={this.props.integrationCode}
              />
              <small>
                <a
                  href="https://github.com/MatiFace/mati-global-id-sdk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check out our mobile SDK
                </a>
              </small>
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
