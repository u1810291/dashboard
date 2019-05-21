import React from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { MatiButton } from 'components/mati-button'
import { Content } from 'components/application-box'
import { Click, Items, Icons, Card, H3, Text, createOverlay } from 'components'
import { UsecaseModal } from 'fragments'
import {
  saveConfiguration,
  getMerchantApps,
  COLOR_PRESETS,
  AVAILABLE_LANGUAGES,
  AVAILABLE_DOCUMENT_TYPES,
  MANDATORY_DOCUMENT_TYPES
} from 'state/merchant'
import { getCountries } from 'state/countries'
import ConfigureColor from 'fragments/configuration/configure-color'
import VerificationSteps from 'fragments/configuration/verification-steps'
import LanguageStep from './LanguageStep'
import CSS from './Configuration.module.css'
import { ReactComponent as IconIntegrate } from 'assets/icon-repeat.svg'
import Countries from 'fragments/configuration/countries'

function showUsecaseModal() {
  createOverlay(<UsecaseModal />)
}

function permalink(cliendId) {
  const baseURL = process.env.REACT_APP_SIGNUP_URL
  return `${baseURL}/?merchantToken=${cliendId}&metadata={}`
}

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
          <Items flow="row" gap={4} className={CSS.sidebar}>
            <h1>
              <FormattedMessage id="fragments.configuration.title" />
            </h1>

            {this.props.apps[0] && (
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
            )}

            <Click onClick={showUsecaseModal} background="active" shadow="2">
              <Icons.Play />
              <FormattedMessage id="fragments.configuration.usecase-modal" />
            </Click>

            {this.props.apps[0] && (
              <Items flow="row" gap="1">
                <H3>
                  <FormattedMessage id="fragments.configuration.permalink-title" />
                </H3>
                <Card shadow="0" border="blue" padding="1">
                  <Text
                    color="blue"
                    as="a"
                    href={permalink(this.props.apps[0].clientId)}
                  >
                    {permalink(this.props.apps[0].clientId)}
                  </Text>
                </Card>
              </Items>
            )}

            <Items justifyContent="end" gap={1}>
              <Click background="active" href="/integration" as="a">
                <IconIntegrate />
                <FormattedMessage id="fragments.configuration.button.start-integration" />
              </Click>
            </Items>
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
