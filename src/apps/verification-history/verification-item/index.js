import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { authorizedUrl } from 'src/lib/client/http'
import { Content } from 'src/components/application-box'
import Panel from 'src/components/panel'
import { SyntaxHighlighter } from 'src/components/syntax-highlighter'
import VerificationDetails, {
  extractIdentityData
} from 'src/components/verification-details'
import stringify from 'src/lib/stringify'
import { getIdentityWithNestedData } from 'src/state/identities'

export default
@connect(
  (state, props) => ({
    token: state.auth.token,
    identity: state.identities.instances[props.match.params.id]
  }),
  { getIdentityWithNestedData }
)
class VerificationItem extends React.Component {
  componentDidMount() {
    const { token, getIdentityWithNestedData } = this.props
    const { id } = this.props.match.params
    getIdentityWithNestedData(token, id)
  }

  render() {
    if (this.props.identity) {
      const { identity, token } = this.props
      return (
        <Content>
          <h1>
            <FormattedMessage id="verifirationModal.header" />
            {': '}
            {identity.fullName}
            <p className="text-secondary">
              <Link to="/verifications">
                <FormattedMessage id="identities.details.backToList" />
              </Link>
            </p>
          </h1>
          <section className="mgi-section-separated">
            <VerificationDetails
              fullName={identity.fullName}
              {...extractIdentityData(identity)}
              signURL={url => authorizedUrl(url, token)}
            />
          </section>
          <section className="mgi-section-separated">
            <Panel caption={<FormattedMessage id="identities.details.webhook" />}>
              <Panel.Body padded={false}>
                <SyntaxHighlighter
                  dark={false}
                  code={stringify(identity.originalIdentity)}
                  language="javascript"
                />
              </Panel.Body>
            </Panel>
          </section>
        </Content>
      )
    } else {
      return null
    }
  }
}
