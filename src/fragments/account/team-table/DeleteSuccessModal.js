import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal } from 'components/modal'
import Button from 'components/button'
import { ReactComponent as DeleteSuccessIcon } from './deleteSuccess.svg'

export default class DeleteSuccessModal extends React.Component {
  render() {
    const { className, ...modalProps } = this.props
    return (
      <Modal {...modalProps} className={className}>
        <main className={''}>
          <DeleteSuccessIcon />
          <FormattedMessage id="teamTable.deleteSuccessModal.description" />
        </main>
        <footer className="modal--footer-center">
          <Button
            type="submit"
            buttonStyle="primary"
            onClick={this.props.onClose}
          >
            <FormattedMessage id="teamTable.deleteSuccessModal.done" />
          </Button>
        </footer>
      </Modal>
    )
  }
}
