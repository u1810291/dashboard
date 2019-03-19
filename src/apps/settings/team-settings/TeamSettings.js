import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import TeamTable from 'src/fragments/account/team-table'
import {
  getCollaborators,
  deleteCollaborators,
  postCollaborators,
  patchCollaborators
} from 'src/state/collaborators'
import Button from 'src/components/button'
import { closeOverlay, createOverlay } from 'src/components/overlay'
import TeamInviteModal from 'src/fragments/account/team-invite-modal/TeamInviteModal'
import InviteSuccessModal from 'src/fragments/account/team-invite-modal/InviteSuccessModal'
import CSS from './TeamSettings.css'
import Panel from 'src/components/panel'
import InviteIcon from '../invite.svg'

const mapCollaborators = collaborator => ({
  role: collaborator.role,
  name: collaborator.user.firstName + ' ' + collaborator.user.lastName,
  id: collaborator.user.id,
  email: collaborator.user.email
})

export default
@connect(
  ({ auth: { token }, collaborators, merchant }) => ({
    rows: [],
    collaborators: collaborators.collaborators && collaborators.collaborators.map(mapCollaborators),
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
)
class TeamSettings extends React.Component {
  componentDidMount() {
    if (this.props.merchantId) {
      console.log(this.props.token)
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
    return this.props.deleteCollaborators(this.props.token, this.props.merchantId, id)
  }

  onRoleChange = (id, role) => {
    this.props.patchCollaborators(this.props.token, this.props.merchantId, id, { role })
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
      <div className={CSS.container}>
        <div className={CSS.mainBlock}>
          <h2>
            <FormattedMessage id="settings.teamSettings.title" />
          </h2>
          <Panel>
            <TeamTable
              onRoleChange={this.onRoleChange}
              onDeleteSubmit={this.onDeleteSubmit}
              {...this.props}
            />
          </Panel>
        </div>
        <div className={CSS.rightBlock}>
          <Button buttonStyle="primary" onClick={this.openInviteModal}>
            <InviteIcon />
            <FormattedMessage id="settings.teamSettings.inviteTeammate" />
          </Button>
        </div>
      </div>
    )
  }
}
