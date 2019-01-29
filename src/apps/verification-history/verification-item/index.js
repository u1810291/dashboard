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
import WebbhooksIcon from './webhooks-icon.svg'
//import DownloadIcon from './download-icon.svg'
import DeleteIcon from './delete-icon.svg'
import Button from 'src/components/button'
import Panel from 'src/components/panel'
import SpinnerPage from 'src/components/spinner-page'
import {
  getIdentityWithNestedData,
  patchIdentity,
  deleteIdentity,
  patchDocument
} from 'src/state/identities'
import { createOverlay, closeOverlay } from 'src/components/overlay'
import VerificationWebhookModal from 'src/fragments/verifications/verification-webhook-modal'
import confirm from 'src/components/confirm'
import StatusLabel from 'src/fragments/status-label'
import classNames from 'classnames'
import CSS from './VerificationItem.scss'

const CHECK_INTERVAL = 5000

export default
@connect(
  (state, props) => ({
    token: state.auth.token,
    identity: state.identities.instances[props.match.params.id]
  }),
  { getIdentityWithNestedData, patchIdentity, deleteIdentity, patchDocument }
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

  deleteIdentity = () => {
    const { id } = this.props.match.params
    confirm(<FormattedMessage  id="verificationModal.delete.confirm"/>)
      .then(() => {
        this.props.deleteIdentity(this.props.token, id)
          .then(this.props.history.push('/verifications'))
      })
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
      <div className={classNames('container', CSS.container)}>
        <div className="row">
          <div className="X12 L8 XL7 L--offset1 X--order1 L--order0">
            <Content className={CSS.detailsPanel}>
              <h1>
                <Link to="/verifications">
                  <Button className="text-active mgi-section-separated">
                      <FormattedMessage id="identities.details.backToList" />
                  </Button>
                </Link>
              </h1>
              <section className="mgi-section-separated">
                <VerificationDetails
                  fullName={identity.fullName}
                  {...extractIdentityData(identity)}
                  signURL={url => authorizedUrl(url, token)}
                  onFieldChange={this.onFieldChange}
                  status={identity.status}
                  onStatusChange={this.onStatusChange}
                />
              </section>
            </Content>
          </div>
          <div className="X12 L3 X--order0 L--order1">
            <section className={CSS.rightPanel}>
              <Button className={CSS.rightButton} onClick={this.openWebhookModal}>
                <WebbhooksIcon />
                <FormattedMessage id="verificationModal.webhookResponse" />
              </Button>
              {/*<Button className={CSS.rightButton}>*/}
                {/*<DownloadIcon />*/}
                {/*<FormattedMessage id="verificationModal.downloadData" />*/}
              {/*</Button>*/}
              <Button className={CSS.rightButton} onClick={this.deleteIdentity}>
                <DeleteIcon />
                <FormattedMessage id="verificationModal.delete" />
              </Button>
            </section>
            <div className={CSS.statusesHelpPanel}>
              <Panel>
                <Panel.Body>
                  <fieldset className="mgi-fieldset no-left-margin">
                    <legend>
                      <StatusLabel status="inProgress" coloredText={true}/>
                    </legend>
                    <FormattedMessage id="statuses.inProgress.info" />
                  </fieldset>
                  <fieldset className="mgi-fieldset no-left-margin">
                    <legend>
                      <StatusLabel status="verified" coloredText={true}/>
                    </legend>
                    <FormattedMessage id="statuses.verified.info" />
                  </fieldset>
                  <fieldset className="mgi-fieldset no-left-margin">
                    <legend>
                      <StatusLabel status="manual" coloredText={true}/>
                    </legend>
                    <FormattedMessage id="statuses.manual.info" />
                  </fieldset>
                  <fieldset className="mgi-fieldset no-left-margin">
                    <legend>
                      <StatusLabel status="unverified" coloredText={true}/>
                    </legend>
                    <FormattedMessage id="statuses.unverified.info" />
                  </fieldset>
                </Panel.Body>
              </Panel>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
