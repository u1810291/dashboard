import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal } from 'components/modal'
import Button from 'components/button'
import Spinner from 'components/spinner'

export default class DeleteModal extends React.Component {
  render() {
    const {
      className,
      user,
      onSubmit,
      isDeleting,
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
              userName: <strong>{user.name || ''}</strong>,
            }} />
        </main>
        <footer className="modal--footer-center">
          <Button type="submit" buttonStyle="danger" onClick={() => onSubmit(user.id)}>
            <FormattedMessage id="teamTable.deleteModal.delete" />
          </Button>
          {isDeleting && <Spinner size="large" />}
        </footer>
      </Modal>
    )
  }
}
