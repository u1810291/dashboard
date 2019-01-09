import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal } from 'src/components/modal/index'
import Button from 'src/components/button/index'
import InviteSuccessIcon from './inviteSuccess.svg'
import classNames from 'classnames'
import CSS from './TeamInviteModal.scss'

export default class InviteSuccessModal extends React.Component {
  render() {
    const {
      className,
      ...modalProps
    } = this.props
    return (
      <Modal {...modalProps} className={classNames(CSS.inviteSuccessModal, className)}>
        <main>
          <InviteSuccessIcon />
          <FormattedMessage
            id="teamTable.inviteSuccessModal.description"
          />
        </main>
        <footer className="modal--footer-center">
          <Button type="submit" buttonStyle="primary" onClick={this.props.onClose}>
            <FormattedMessage id="teamTable.inviteSuccessModal.done" />
          </Button>
        </footer>
      </Modal>
    )
  }
}
