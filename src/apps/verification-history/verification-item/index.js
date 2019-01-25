import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { authorizedUrl } from 'src/lib/client/http'
import { Content } from 'src/components/application-box'
import VerificationDetails, {
  extractIdentityData
} from 'src/fragments/verification-details'
import stringify from 'src/lib/stringify'
import VerificationFullNameLabel from 'src/fragments/verification-full-name-label'
import StatusSelect from 'src/fragments/status-select'
import WebbhooksIcon from './webhooks-icon.svg'
import Button from 'src/components/button'
import SpinnerPage from 'src/components/spinner-page'
import {
  getIdentityWithNestedData,
  patchIdentity,
  patchDocument
} from 'src/state/identities'
import { createOverlay, closeOverlay } from 'src/components/overlay'
import VerificationWebhookModal from 'src/fragments/verifications/verification-webhook-modal'

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

  onStatusChange = status => {
    const { id } = this.props.match.params
    this.props.patchIdentity(this.props.token, id, { status })
  }

  onFieldChange = (docId, field) => {
    this.props.patchDocument(
      this.props.token,
      this.props.match.params.id,
      docId,
      [field]
    )
  }

  openWebhookModal = () => {
    createOverlay(
      <VerificationWebhookModal
        webhook={stringify(this.props.identity.originalIdentity)}
        onClose={closeOverlay}
      />
    )
  }

  loadData = () => {
    const { token, getIdentityWithNestedData } = this.props
    const { id } = this.props.match.params
    getIdentityWithNestedData(token, id).then(identity => {
      if (
        identity.documents.every(
          doc => !['queued', 'processing'].includes(doc.status)
        )
      ) {
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
        <h1>
          <VerificationFullNameLabel>
            {identity.fullName}
          </VerificationFullNameLabel>
          <StatusSelect
            status={identity.status}
            onSelect={this.onStatusChange}
          />
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
          <Button onClick={this.openWebhookModal}>
            <WebbhooksIcon />
            <FormattedMessage id="verificationModal.webhookResponse" />
          </Button>
        </section>
      </Content>
    )
  }
}
