import React from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { MatiButton } from 'src/components/mati-button'
import Button from 'src/components/button'
import { Content } from 'src/components/application-box'
import Items from 'src/components/items'
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
import IconPlay from 'src/assets/icon-play-rounded.svg'
import IconIntegrate from 'src/assets/icon-integrate.svg'
import IconFaq from 'src/assets/icon-faq.svg'
import Countries from 'src/fragments/configuration/countries'
import { showVideo as showOnboardingVideo } from 'src/fragments/configuration/how-it-works-video'

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
          <Items flow="row" gap={4}>
            <h1>
              <FormattedMessage id="onboarding.flow.title" />
            </h1>

            <Items flow="row" gap={4}>
              {flowSteps.map((step, index) => (
                <section key={index}>{step}</section>
              ))}
            </Items>
          </Items>
        </Content>
        <Content fullwidth={false}>
          <Items flow="row" gap={4}>
            <h1>
              <FormattedMessage id="fragments.configuration.title" />
            </h1>

            {this.props.apps[0] && (
              <section>
                <Items
                  align="center"
                  justifyContent="center"
                  className={CSS.matiButtonWrapper}
                >
                  <MatiButton
                    language={this.props.configuration.style.language}
                    color={this.props.configuration.style.color}
                    clientId={this.props.apps[0].clientId}
                    onSuccess={this.redirectToIdentity}
                  />
                </Items>
              </section>
            )}

            <section>
              <Items align="center" justifyContent="center">
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
              </Items>
            </section>

            <section>
              <Items align="center" templateColumns="1fr 1fr" gap={1}>
                <Button buttonStyle="primary" href="/integration" size="big">
                  <IconIntegrate />
                  <FormattedMessage id="fragments.configuration.button.start-integration" />
                </Button>
                <Button
                  buttonStyle="primary primary-revert"
                  href="/info"
                  size="big"
                >
                  <IconFaq />
                  <FormattedMessage id="fragments.configuration.button.common-questions" />
                </Button>
              </Items>
            </section>
          </Items>
        </Content>
      </React.Fragment>
    )
  }
}

export default connect(
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
)(Configuration)
