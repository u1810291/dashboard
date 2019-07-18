import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { isEmpty } from 'lodash'
import TeamTable from 'fragments/account/team-table'
import {
  getCollaborators,
  deleteCollaborators,
  postCollaborators,
  patchCollaborators
} from 'state/collaborators'
import Button from 'components/button'
import { closeOverlay, createOverlay } from 'components/overlay'
import TeamInviteModal from 'fragments/account/team-invite-modal/TeamInviteModal'
import InviteSuccessModal from 'fragments/account/team-invite-modal/InviteSuccessModal'
import { ReactComponent as InviteIcon } from '../invite.svg'
import SettingsLayout from '../SettingsLayout'

const mapCollaborators = collab => collab
  .filter(entry => !isEmpty(entry.user))
  .map(entry => ({
    role: entry.role,
    name: `${entry.user.firstName} ${entry.user.lastName}`,
    id: entry.user.id,
    email: entry.user.email
  }));

class TeamSettings extends React.Component {
  componentDidMount() {
    if (this.props.merchantId) {
      this.props.getCollaborators(this.props.token, this.props.merchantId)
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.merchantId && this.props.merchantId) {
      this.props.getCollaborators(this.props.token, this.props.merchantId)
    }
    if (prevProps.isPosting !== this.props.isPosting) {
      this.openInviteModal()
    }
  }

  onDeleteSubmit = id => {
    return this.props.deleteCollaborators(
      this.props.token,
      this.props.merchantId,
      id
    )
  }

  onRoleChange = (id, role) => {
    this.props.patchCollaborators(this.props.token, this.props.merchantId, id, {
      role
    })
  }

  onInviteSubmit = data => {
    const dataToSend = {
      role: parseInt(data.role),
      user: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName
      }
    }
    return this.props
      .postCollaborators(this.props.token, this.props.merchantId, dataToSend)
      .then(() => this.openInviteSuccessModal())
  }

  openInviteModal = () => {
    createOverlay(
      <TeamInviteModal
        onClose={closeOverlay}
        onSubmit={this.onInviteSubmit}
        isPosting={this.props.isPosting}
      />
    )
  }

  openInviteSuccessModal = () => {
    createOverlay(<InviteSuccessModal onClose={closeOverlay} />)
  }

  render() {
    return (
      <SettingsLayout>
        <main>
          <TeamTable
            onRoleChange={this.onRoleChange}
            onDeleteSubmit={this.onDeleteSubmit}
            {...this.props}
          />
        </main>
        <aside>
          <Button buttonStyle="primary" onClick={this.openInviteModal}>
            <InviteIcon />
            <FormattedMessage id="settings.teamSettings.inviteTeammate" />
          </Button>
        </aside>
      </SettingsLayout>
    )
  }
}

export default connect(
  ({ auth: { token }, collaborators, merchant }) => ({
    rows: [],
    collaborators: mapCollaborators(collaborators.collaborators),
    isLoading: collaborators.isLoading,
    isPosting: collaborators.isPosting,
    isDeleting: collaborators.isDeleting,
    isPatchingArray: collaborators.isPatchingArray,
    merchantId: merchant.id,
    token
  }),
  {
    getCollaborators,
    deleteCollaborators,
    postCollaborators,
    patchCollaborators
  }
)(TeamSettings)
