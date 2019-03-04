import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { MatiButton } from 'src/components/mati-button'
import { Sidebar, Content } from 'src/components/application-box'
import Button from 'src/components/button'
import { createOverlay, closeOverlay } from 'src/components/overlay'
import {
  getIntegrationCode,
  saveConfiguration,
  AVAILABLE_COLORS,
  AVAILABLE_LANGUAGES,
  AVAILABLE_DOCUMENT_TYPES,
  MANDATORY_DOCUMENT_TYPES
} from 'src/state/merchant'
import { getCountries } from 'src/state/countries'
import IntegrationIcon from 'src/assets/icon-integration.svg'
import ColorStep from './ColorStep'
import VerificationSteps from 'src/fragments/configuration/verification-steps'
import LanguageStep from './LanguageStep'
import CSS from './Configuration.css'
import IconCurlyArrowUp from 'src/assets/icon-curly-arrow-up.svg'
import IconIOS from 'src/assets/icon-ios.svg'
import IconAndroid from 'src/assets/icon-android.svg'
import IconPlay from 'src/assets/icon-play.svg'
import IntegrationCodeModal from 'src/fragments/configuration/integration-code-modal'
import Countries from 'src/fragments/configuration/countries'

export default
@injectIntl
@connect(
  ({
    auth: { token },
    merchant: { configuration, configurations, integrationCode },
    countries: { countries, isLoading }
  }) => ({
    token,
    configuration,
    configurations,
    integrationCode,
    countries,
    countriesAreLoading: isLoading
  }),
  {
    saveConfiguration,
    getIntegrationCode,
    getCountries
  }
)
class Configuration extends React.Component {
  redirectToIdentity = ({ identityId }) => {
    this.props.history.push(`/verifications/${identityId}`)
  }

  toggleIntegrationCode = () => {
    this.props.getIntegrationCode(this.props.token).then(value => {
      createOverlay(
        <IntegrationCodeModal integrationCode={this.props.integrationCode} onClose={closeOverlay} />
      )
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
    this.props.getCountries(this.props.token)
  }

  loadData() {
    this.props.getIntegrationCode(this.props.token)
  }

  updateConfiguration = settings => {
    this.props.saveConfiguration(this.props.token, settings)
  }

  render() {
    const flowSteps = [
      <Countries
        countries={this.props.countries}
        onSubmit={this.updateConfiguration}
        supportedCountries={this.props.configuration.supportedCountries}
        isLoading={this.props.countriesAreLoading}
      />,
      <div id="language">
        <LanguageStep
          availableLanguages={AVAILABLE_LANGUAGES}
          style={this.props.configuration.style}
          onClick={this.updateConfiguration}
        />
      </div>,
      <div id="buttonColor">
        <ColorStep
          availableButtonColors={AVAILABLE_COLORS}
          style={this.props.configuration.style}
          onClick={this.updateConfiguration}
        />
      </div>,
      <VerificationSteps
        availableDocumentTypes={AVAILABLE_DOCUMENT_TYPES}
        mandatoryDocumentTypes={MANDATORY_DOCUMENT_TYPES}
        steps={this.props.configuration.verificationSteps}
        onChange={this.updateConfiguration}
      />
    ]
    return (
      <React.Fragment>
        <Content className={CSS.content}>
          <section className="mgi-section">
            <h1>
              <FormattedMessage id="onboarding.flow.title" />
              <p className="text-secondary">
                <FormattedMessage id="onboarding.flow.subtitle" />
              </p>
            </h1>
          </section>
          {flowSteps.map((step, index) => (
            <section className="mgi-section mgi-section__huge" key={index}>
              {step}
            </section>
          ))}
        </Content>
        <Sidebar className={CSS.sidebar}>
          <p className={CSS.sidebarIcon}>
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
              language={this.props.configuration.style.language}
              color={this.props.configuration.style.color}
              clientId={this.props.token}
              onSuccess={this.redirectToIdentity}
              className={CSS.matiButtonConfiguration}
            />
            <div className={CSS.matiButtonHint}>
              <IconCurlyArrowUp />
              <br />
              <FormattedMessage id="onboarding.verify-button-hint" />
            </div>
          </div>
          <div className={CSS.helpButtons}>
            <Button onClick={this.toggleIntegrationCode}>
              <IntegrationIcon />
              <FormattedMessage id="onboarding.integrationCode.button" />
            </Button>
            <Button onClick={this.openIosManual}>
              <IconIOS />
              <FormattedMessage id="onboarding.ios-sdk-link" />
            </Button>
            <Button onClick={this.openAndroidManual}>
              <IconAndroid />
              <FormattedMessage id="onboarding.android-sdk-link" />
            </Button>
          </div>
        </Sidebar>
      </React.Fragment>
    )
  }
}
