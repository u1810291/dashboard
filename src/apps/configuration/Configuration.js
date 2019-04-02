import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { MatiButton } from 'src/components/mati-button'
import Button from 'src/components/button'
import { Content } from 'src/components/application-box'
import Sections from 'src/components/sections'
import {
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
import Countries from 'src/fragments/configuration/countries'
import { showVideo as showOnboardingVideo } from 'src/fragments/configuration/how-it-works-video'

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
    getCountries,
    getMerchantApps
  }
)
class Configuration extends React.Component {
  redirectToIdentity = ({ identityId }) => {
    this.props.history.push(`/verifications/${identityId}`)
  }

  componentDidMount() {
    this.props.getCountries(this.props.token)
    this.props.getMerchantApps(this.props.token)
  }

  updateConfiguration = settings => {
    this.props.saveConfiguration(this.props.token, settings)
  }

  render() {
    const flowSteps = [
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
      />,
      <Countries
        countries={this.props.countries}
        onSubmit={this.updateConfiguration}
        supportedCountries={this.props.configuration.supportedCountries}
        isLoading={this.props.countriesAreLoading}
      />
    ]
    return (
      <React.Fragment>
        <Content fullwidth={false} className={CSS.content}>
          <Sections extraGap>
            <h1>
              <FormattedMessage id="onboarding.flow.title" />
            </h1>

            <Sections extraGap>
              {flowSteps.map((step, index) => (
                <section key={index}>{step}</section>
              ))}
            </Sections>
          </Sections>
        </Content>
        <Content fullwidth={false}>
          <Sections>
            <h1>
              <FormattedMessage id="fragments.configuration.title" />
            </h1>

            {this.props.apps[0] && (
              <section>
                <MatiButton
                  language={this.props.configuration.style.language}
                  color={this.props.configuration.style.color}
                  clientId={this.props.apps[0].clientId}
                  onSuccess={this.redirectToIdentity}
                />
              </section>
            )}

            <p className={CSS.sidebarIcon}>
              <Button
                className={CSS.onboardingVideoLink}
                buttonStyle="link"
                onClick={showOnboardingVideo}
              >
                <IconPlay />
                <FormattedMessage id="onboarding.video.link" />
              </Button>
            </p>
          </Sections>
        </Content>
      </React.Fragment>
    )
  }
}
