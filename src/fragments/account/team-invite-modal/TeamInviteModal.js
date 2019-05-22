import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal } from 'components/modal'
import Button from 'components/button'
import { setI18nContext } from 'components/i18n-context'
import TeamInviteForm from './TeamInviteForm'
import Spinner from 'components/spinner'

class TeamInviteModal extends React.Component {
  onInviteClick = () => {
    const teamInviteForm = this.refs.teamInviteForm
    teamInviteForm.submitForm()
  }

  handleSubmit = data => {
    return this.props.onSubmit(data)
  }

  render() {
    const { className, isPosting, ...modalProps } = this.props

    return (
      <Modal className={className} {...modalProps}>
        <header>
          <FormattedMessage id="teamTable.inviteModal.title" />
        </header>
        <main>
          <TeamInviteForm
            ref="teamInviteForm"
            handleSubmit={this.handleSubmit}
          />
        </main>
        <footer className="modal--footer-center">
          <Button
            type="submit"
            buttonStyle="primary"
            onClick={this.onInviteClick}
          >
            <FormattedMessage id="teamTable.invite" />
          </Button>
          {isPosting && <Spinner size="large" />}
        </footer>
      </Modal>
    )
  }
}

export default setI18nContext('teamTable.form')(TeamInviteModal)
