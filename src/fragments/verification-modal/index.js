import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal } from 'src/components/modal'
import Button from 'src/components/button'
import Panel from 'src/components/panel'
import SpinnerPage from 'src/components/spinner-page'
import { SyntaxHighlighter } from 'src/components/syntax-highlighter'
import VerificationDetails from 'src/fragments/verification-details'
import StatusSelect from 'src/fragments/status-select'
import VerificationFullNameLabel from 'src/fragments/verification-full-name-label'
import WebbhooksIcon from './webhooks-icon.svg'
import CSS from './verification-modal.scss'

export default class VerificationModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0
    }
  }

  render() {
    const contentSteps = [
      <VerificationDetails
        photos={this.props.photos}
        documents={this.props.documents}
        signURL={this.props.signURL}
        onFieldChange={this.props.onFieldChange}
      />,
      <Panel caption="Webhooks">
        <Panel.Body padded={false}>
          <SyntaxHighlighter
            dark={false}
            copyToClipboard
            code={this.props.webhook}
            language="javascript"
          />
        </Panel.Body>
      </Panel>
    ]

    const buttonSteps = [
      <React.Fragment>
        <span className="modal--footer-spacer" />
        <Button onClick={() => this.setState({ step: 1 })}>
          <WebbhooksIcon />
          <FormattedMessage id="verificationModal.webhookResponse" />
        </Button>
        <Button onClick={this.props.onClose} buttonStyle="primary">
          <FormattedMessage id="verificationModal.done" />
        </Button>
      </React.Fragment>,
      <React.Fragment>
        <Button onClick={() => this.setState({ step: 0 })}>
          <FormattedMessage id="verificationModal.back" />
        </Button>
        <span className="modal--footer-spacer" />
        <Button onClick={this.props.onClose} buttonStyle="primary">
          <FormattedMessage id="verificationModal.done" />
        </Button>
      </React.Fragment>
    ]
    return (
      <Modal onClose={this.props.onClose} className={CSS.modalWindow}>
        <header className={CSS.header}>
          <VerificationFullNameLabel>{this.props.fullName}</VerificationFullNameLabel>
          <StatusSelect
            status={this.props.status}
            onSelect={(status) => this.props.onStatusChange(this.props.id, status)} />
        </header>
        {this.props.isLoading ? (
          <SpinnerPage />
        ) : (
          <React.Fragment>
            <main>{contentSteps[this.state.step]}</main>

            <footer>{buttonSteps[this.state.step]}</footer>
          </React.Fragment>
        )}
      </Modal>
    )
  }
}
