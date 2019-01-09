import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal } from 'src/components/modal'
import Button from 'src/components/button'


export default class DeleteModal extends React.Component {
  render() {
    const {
      className,
      userName,
      teamName,
      onSubmit,
      ...modalProps
    } = this.props
    return (
      <Modal {...modalProps} className={className}>
        <header>
          <FormattedMessage id="teamTable.deleteModal.title" />
        </header>
        <main>
          <FormattedMessage
            id="teamTable.deleteModal.description"
            values={{
              userName: <strong>{userName}</strong>,
              teamName: <strong>{teamName}</strong>
            }} />
        </main>
        <footer className="modal--footer-center">
          <Button type="submit" buttonStyle="danger" onClick={onSubmit}>
            <FormattedMessage id="teamTable.deleteModal.delete" />
          </Button>
        </footer>
      </Modal>
    )
  }
}
