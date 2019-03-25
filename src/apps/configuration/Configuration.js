import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { MatiButton } from 'src/components/mati-button'
import { Content } from 'src/components/application-box'
import { createOverlay, closeOverlay } from 'src/components/overlay'
import {
  getIntegrationCode,
  saveConfiguration,
  getMerchantApps,
  COLOR_PRESETS,
  AVAILABLE_LANGUAGES,
  AVAILABLE_DOCUMENT_TYPES,
  MANDATORY_DOCUMENT_TYPES
} from 'src/state/merchant'
import { getCountries } from 'src/state/countries'
import ConfigureColor from 'src/fragments/configuration/configure-color'
import VerificationSteps from 'src/fragments/configuration/verification-steps'
import LanguageStep from './LanguageStep'
import CSS from './Configuration.css'
import IconPlay from 'src/assets/icon-play.svg'
import IntegrationCodeModal from 'src/fragments/configuration/integration-code-modal'
import Countries from 'src/fragments/configuration/countries'

export default
@injectIntl
@connect(
  ({
    auth: { token },
    merchant: { configuration, configurations, integrationCode, apps = [] },
    countries: { countries, isLoading }
  }) => ({
    token,
    configuration,
    configurations,
    integrationCode,
    countries,
    apps,
    countriesAreLoading: isLoading
  }),
  {
    saveConfiguration,
    getIntegrationCode,
    getCountries,
    getMerchantApps
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
    this.props.getIntegrationCode(this.props.token)
    this.props.getCountries(this.props.token)
    this.props.getMerchantApps(this.props.token)
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
        <ConfigureColor
          presets={COLOR_PRESETS}
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
        <Content fullwidth={false} className={CSS.content}>
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
        <Content>
          <section className="mgi-section mgi-section__no-border">
            <h1>
              Preview Zone
              <p>Here you can see the result of your customizing.</p>
            </h1>
          </section>
          <section className="mgi-section mgi-section__no-border">
            {this.props.apps[0] && (
              <div>
                <h3>Your button</h3>
                <MatiButton
                  language={this.props.configuration.style.language}
                  color={this.props.configuration.style.color}
                  clientId={this.props.apps[0].clientId}
                  onSuccess={this.redirectToIdentity}
                />
              </div>
            )}{' '}
          </section>
          <section className="mgi-section mgi-section__no-border">
            <a
              className={classNames(CSS.onboardingVideoLink, 'text-secondary')}
              href="https://www.youtube.com/watch?v=NWRc84vkB5I&rel=0"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconPlay />
              <FormattedMessage id="onboarding.video.link" />
            </a>
          </section>
        </Content>
      </React.Fragment>
    )
  }
}
