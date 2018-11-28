import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal } from 'src/components/modal'
import Button from 'src/components/button'
import Panel from 'src/components/panel'
import { SyntaxHighlighter } from 'src/components/syntax-highlighter'
import VerificationDetails from 'src/components/verification-details'
import WebbhooksIcon from './webhooks-icon.svg'
import CSS from './styles.scss'

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
        <Button onClick={() => this.setState({step: 1})}>
          <WebbhooksIcon />
          <FormattedMessage id="verifirationModal.webhookResponse" />
        </Button>
        <Button onClick={this.props.onClose} buttonStyle="primary">
          <FormattedMessage id="verifirationModal.done" />
        </Button>
      </React.Fragment>,
      <React.Fragment>
        <Button onClick={() => this.setState({step: 0})}>
          <FormattedMessage id="verifirationModal.back" />
        </Button>
        <span className="modal--footer-spacer" />
        <Button onClick={this.props.onClose} buttonStyle="primary">
          <FormattedMessage id="verifirationModal.done" />
        </Button>
      </React.Fragment>
    ]
    return (
      <Modal onClose={this.props.onClose} className={CSS.modalWindow}>
        <header>
          <FormattedMessage id="verifirationModal.header" />{': '}
          <strong>
            {this.props.fullName}
          </strong>
        </header>
        <main>
          {contentSteps[this.state.step]}
        </main>
        <footer>
          {buttonSteps[this.state.step]}
        </footer>
      </Modal>
    )
  }
}
