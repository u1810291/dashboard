import React from 'react'
import { connect } from 'react-redux'
import { SyntaxHighlighter } from 'src/components/syntax-highlighter'
import { getIntegrationCode } from 'src/state/merchant'
import Support from 'src/fragments/account/support'
import MatiDocs from 'src/fragments/account/mati-docs'
import { FormattedMessage } from 'react-intl'
import SettingsLayout from '../SettingsLayout'

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
      <React.Fragment>
        <h1>
          <FormattedMessage id="settings.integrationCode.title" />
        </h1>

        <SettingsLayout>

          <main>
            <SyntaxHighlighter
              dark={false}
              language="html"
              copyToClipboard
              code={this.props.integrationCode}
            />
            <MatiDocs />
          </main>

          <aside>
            <Support />
          </aside>

        </SettingsLayout>
      </React.Fragment>
    )
  }
}
