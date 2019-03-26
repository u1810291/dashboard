import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { SyntaxHighlighter } from 'src/components/syntax-highlighter'
import { getIntegrationCode } from 'src/state/merchant'
import Support from 'src/fragments/account/support'
import MatiDocs from 'src/fragments/account/mati-docs'
import Layout from './IntegrationLayout'

function IntegrationCode({ integrationCode, getIntegrationCode, token }) {
  useEffect(() => {
    getIntegrationCode(token)
  })

  return (
    <React.Fragment>
      <h1>
        <FormattedMessage id="settings.integrationCode.title" />
      </h1>

      <Layout>
        <main>
          <SyntaxHighlighter dark={false} language="html" copyToClipboard code={integrationCode} />
          <MatiDocs />
        </main>

        <aside>
          <Support />
        </aside>
      </Layout>
    </React.Fragment>
  )
}

export default connect(
  ({ auth: { token }, merchant: { integrationCode } }) => ({
    token,
    integrationCode
  }),
  {
    getIntegrationCode
  }
)(IntegrationCode)
