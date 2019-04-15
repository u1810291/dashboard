import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { get } from 'lodash'
import { Content } from 'src/components/application-box'
import Items from 'src/components/items'
import VerificationDetails from 'src/fragments/verifications/verification-details'
import {
  getSelfie,
  getPhotos,
  getDocuments
} from 'src/fragments/verifications/verification-details/extractIdentityData'
import stringify from 'src/lib/stringify'
import WebbhooksIcon from './webhooks-icon.svg'
//import DownloadIcon from './download-icon.svg'
import DeleteIcon from './delete-icon.svg'
import Button from 'src/components/button'
import {
  getIdentityWithNestedData,
  patchIdentity,
  deleteIdentity,
  patchDocument
} from 'src/state/identities'
import { createOverlay, closeOverlay } from 'src/components/overlay'
import VerificationWebhookModal from 'src/fragments/verifications/verification-webhook-modal'
import confirm from 'src/components/confirm'
import DocumentStatusHelp from 'src/fragments/verifications/document-status-help'
import Spinner from 'src/components/spinner'
import PageContentLayout from 'src/components/page-content-layout'
import { isFeatureEnabled } from 'src/lib/isFeatureEnabled'

const CHECK_INTERVAL = 5000

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
        webhook={stringify(this.props.identity.originalIdentity._embedded)}
        onClose={closeOverlay}
      />
    )
  }

  deleteIdentity = () => {
    const { id } = this.props.match.params
    confirm(<FormattedMessage id="verificationModal.delete.confirm" />).then(
      () => {
        this.props
          .deleteIdentity(this.props.token, id)
          .then(() => this.props.history.push('/verifications'))
      },
      () => {}
    )
  }

  loadData = () => {
    const { token, getIdentityWithNestedData } = this.props
    const { id } = this.props.match.params
    getIdentityWithNestedData(token, id).then(identity => {
      if (get(identity, '_embedded.verification.documents.length')) {
        if (
          identity._embedded.verification.documents.every(doc => {
            return doc.steps.every(step => step.status === 200)
          })
        ) {
          window.clearInterval(this.checkInterval)
        }
      } else {
        if (identity.documents.every(doc => doc.status === 'ready')) {
          window.clearInterval(this.checkInterval)
        }
      }
    })
  }

  render() {
    if (!this.props.identity) return null
    const { identity, token, deletingIdentities } = this.props
    const isDeleting = deletingIdentities.includes(identity.id)
    return (
      <Content>
        <Items flow="row">
          <h1>
            <Link to="/verifications">
              <Button className="text-active">
                <FormattedMessage id="identities.details.backToList" />
              </Button>
            </Link>
          </h1>
          <PageContentLayout>
            <main>
              <VerificationDetails
                fullName={identity.fullName}
                documents={getDocuments(identity)}
                metadata={identity.metadata}
                photos={getPhotos(identity, token)}
                selfie={getSelfie(identity, token)}
                onFieldChange={this.onFieldChange}
                status={identity.status}
                onStatusChange={this.onStatusChange}
                patchIsLoading={this.props.patchIsLoading}
                patchError={this.props.patchError}
                patchingFields={this.props.patchingFields}
                erroredFields={this.props.erroredFields}
              />
            </main>

            <aside>
              <Items flow="row">
                <Button onClick={this.openWebhookModal}>
                  <WebbhooksIcon />
                  <FormattedMessage id="verificationModal.webhookData" />
                </Button>
                <Button onClick={this.deleteIdentity} disabled={isDeleting}>
                  {isDeleting ? <Spinner /> : <DeleteIcon />}
                  <FormattedMessage id="verificationModal.delete" />
                </Button>
                {isFeatureEnabled('STATUSES') && <DocumentStatusHelp />}
              </Items>
            </aside>
          </PageContentLayout>
        </Items>
      </Content>
    )
  }
}

export default connect(
  (state, props) => ({
    token: state.auth.token,
    identity: state.identities.instances[props.match.params.id],
    deletingIdentities: state.identities.deletingIdentities,
    patchIsLoading: state.identities.patchIsLoading,
    patchError: state.identities.patchError,
    patchingFields: state.identities.patchingFields,
    erroredFields: state.identities.erroredFields
  }),
  { getIdentityWithNestedData, patchIdentity, deleteIdentity, patchDocument }
)(VerificationItem)
