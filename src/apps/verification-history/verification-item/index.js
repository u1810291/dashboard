import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { authorizedUrl } from 'src/lib/client/http'
import { Content } from 'src/components/application-box'
import { SyntaxHighlighter } from 'src/components/syntax-highlighter'
import VerificationDetails, {
  extractIdentityData
} from 'src/fragments/verification-details'
import stringify from 'src/lib/stringify'
import VerificationFullNameLabel from 'src/fragments/verification-full-name-label'
import StatusSelect from 'src/fragments/status-select'
import WebbhooksIcon from 'src/fragments/verification-modal/webhooks-icon.svg'
import Button from 'src/components/button'
import { Modal } from 'src/components/modal'
import SpinnerPage from 'src/components/spinner-page'
import { getIdentityWithNestedData, patchIdentity, patchDocument } from 'src/state/identities'

const CHECK_INTERVAL = 5000

export default
@connect(
  (state, props) => ({
    token: state.auth.token,
    identity: state.identities.instances[props.match.params.id]
  }),
  { getIdentityWithNestedData, patchIdentity, patchDocument }
)
class VerificationItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.loadData()
    this.checkInterval = window.setInterval(this.loadData, CHECK_INTERVAL)
  }

  componentWillUnmount() {
    window.clearInterval(this.checkInterval)
  }

  onStatusChange = (status) => {
    const { id } = this.props.match.params
    this.props.patchIdentity(this.props.token, id, { status })
  }

  onFieldChange = (docId, field) => {
    this.props.patchDocument(this.props.token, docId, [field])
  }

  loadData = () => {
    const { token, getIdentityWithNestedData } = this.props
    const { id } = this.props.match.params
    getIdentityWithNestedData(token, id).then(identity => {
      if (identity.documents.every(doc => doc.status !== 'queued')) {
        window.clearInterval(this.checkInterval)
      }
    })
  }

  render() {
    if (!this.props.identity) {
      return <SpinnerPage />
    }

    const { identity, token } = this.props
    return (
      <Content>
        {this.state.webhookModalOpened && (
          <Modal
            onClose={() => this.setState({ webhookModalOpened: false })}
            wide
          >
            <header>
              <FormattedMessage id="verificationModal.webhookResponse" />
            </header>
            <main>
              <SyntaxHighlighter
                dark={false}
                copyToClipboard
                code={stringify(identity.originalIdentity)}
                language="javascript"
              />
            </main>
            <footer>
              <Button
                onClick={() => this.setState({ webhookModalOpened: false })}
                buttonStyle="primary"
              >
                <FormattedMessage id="done" />
              </Button>
            </footer>
          </Modal>
        )}
        <h1>
          <VerificationFullNameLabel>{identity.fullName}</VerificationFullNameLabel>
          <StatusSelect
            status={identity.status}
            onSelect={this.onStatusChange} />
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
            onFieldChange={this.onFieldChange}
          />
        </section>
        <section>
          <Button onClick={() => this.setState({ webhookModalOpened: true })}>
            <WebbhooksIcon />
            <FormattedMessage id="verificationModal.webhookResponse" />
          </Button>
        </section>
      </Content>
    )
  }
}
