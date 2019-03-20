import React from 'react'
import { connect } from 'react-redux'
import Panel from 'src/components/panel'
import { SyntaxHighlighter } from 'src/components/syntax-highlighter'
import { getIntegrationCode } from 'src/state/merchant'
import Support from 'src/fragments/account/support'
import SettingsCSS from '../Settings.scss'
import { FormattedMessage } from 'react-intl'

export default
@connect(
  ({ auth: { token }, merchant: { integrationCode } }) => ({
    token,
    integrationCode
  }),
  {
    getIntegrationCode
  }
)
class IntegrationCode extends React.Component {
  componentDidMount() {
    this.props.getIntegrationCode(this.props.token)
  }

  render() {
    return (
      <div>
        <h2>
          <FormattedMessage id="settings.integrationCode.title" />
        </h2>
        <div className={SettingsCSS.insideContainer}>
          <div className={SettingsCSS.centralBlock}>
            <SyntaxHighlighter
              dark={false}
              language="html"
              copyToClipboard
              code={this.props.integrationCode}
            />
          </div>

          <div className={SettingsCSS.rightBlock}>
            <Panel>
              <Panel.Header>
                <FormattedMessage id="settings.integrationCode.matiDocumentation" />
              </Panel.Header>
              <Panel.Body>
                <h3>
                  <FormattedMessage id="settings.integrationCode.webhookDocumentation" />
                  <p>
                    <a href="https://docs.getmati.com">https://docs.getmati.com</a>
                  </p>
                </h3>
                <h3>
                  <FormattedMessage id="settings.integrationCode.iosDocumentation" />
                  <p>
                    <a href="https://github.com/MatiFace/mati-global-id-sdk/blob/master/Integration_iOS.md">
                      https://github.com/MatiFace/mati-global-id-sdk/blob/master/Integration_iOS.md
                    </a>
                  </p>
                </h3>
                <h3>
                  <FormattedMessage id="settings.integrationCode.androidDocumentation" />
                  <p>
                    <a href="https://github.com/MatiFace/mati-global-id-sdk/blob/master/Integration_android.md">
                      https://github.com/MatiFace/mati-global-id-sdk/blob/master/Integration_android.md
                    </a>
                  </p>
                </h3>
              </Panel.Body>
            </Panel>
            <Support />
          </div>
        </div>
      </div>
    )
  }
}
