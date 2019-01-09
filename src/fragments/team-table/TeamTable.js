import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import DataTable from 'src/components/data-table'
import Button from 'src/components/button'
import TeamInviteModal from 'src/fragments/team-invite-modal'
import DeleteModal from './DeleteModal';
import DeleteSuccessModal from './DeleteSuccessModal'
import InviteSuccessModal from '../team-invite-modal/InviteSuccessModal'
import TextEditable from 'src/components/text-editable'
import TrashBox from './trashbox.svg'
import CSS from './TeamTable.scss'
import SelectField from 'src/components/select-field'


export default
@injectIntl
class TeamTable extends React.Component {
  roleOptions = [
    {
      label: this.props.intl.formatMessage({
        id: 'teamTable.roles.agent'
      }),
      value: 'agent'
    },
    {
      label: this.props.intl.formatMessage({
        id: 'teamTable.roles.admin'
      }),
      value: 'admin'
    }
  ]
  columns = [
    {
      size: 3,
      label: <FormattedMessage id="teamTable.name" />,
      content: ({ name }) => (
        <div>{name}</div>
      )
    },
    {
      size: 4,
      label: <FormattedMessage id="teamTable.email" />,
      content: ({ email }) => (
        <div>{email}</div>
      )
    },
    {
      size: 3,
      label: <FormattedMessage id="teamTable.role" />,
      content: (user) => (
        <SelectField
          className={CSS.roleSelect}
          options={this.roleOptions}
          value={this.roleOptions.find((option) => option.value === user.role)}
          onChange={(value) => this.props.onRoleChange(user.name, value)}
        />
      )
    },
    {
      size: 1,
      content: (user) => (
        <TrashBox
          className={CSS.deleteButton}
          onClick={() => this.openDeleteModal(user)}
        />
      )
    },
  ]

  constructor(props) {
    super(props)
    this.state = {
      inviteModalIsOpen: false,
      deleteModal: null,
      deleteSuccessModalIsOpen: false,
      inviteSuccessModalIsOpen: false
    }
  }

  openDeleteSuccessModal = () => {
    this.setState({ deleteSuccessModalIsOpen: true })
  }

  closeDeleteSuccessModal = () => {
    this.setState({ deleteSuccessModalIsOpen: false })
  }

  openDeleteModal = (user) => {
    this.setState({
      deleteModal: {
        userName: user.name,
        teamName: this.props.teamName
      }
    })
  }

  closeDeleteModal = () => {
    this.setState({ deleteModal: null })
  }

  onDeleteSubmit = () => {
    this.props.onDeleteSubmit(this.state.deleteModal.userName)
    this.closeDeleteModal()
    this.openDeleteSuccessModal()
  }

  onTeamNameChange = (teamName) => {
    this.props.onTeamNameChange(teamName)
  }

  openInviteModal = () => {
    this.setState({ inviteModalIsOpen: true })
  }

  closeInviteModal = () => {
    this.setState({ inviteModalIsOpen: false })
  }

  onInviteSubmit = (data) => {
    this.props.onInviteSubmit(data)
    this.setState({ inviteModalIsOpen: false })
    this.openInviteSuccessModal()

  }

  openInviteSuccessModal = () => {
    this.setState({ inviteSuccessModalIsOpen: true })
  }

  closeInviteSuccessModal = () => {
    this.setState({ inviteSuccessModalIsOpen: false })
  }

  render() {
    return (
      <div>
        <TextEditable
          text={this.props.teamName}
          onSubmit={this.onTeamNameChange}
          className={CSS.teamName}
        />
        <DataTable
          className={CSS.table}
          rows={this.props.rows}
          columns={this.columns}
          emptyBodyLabel={<FormattedMessage id="teamTable.no-data" />}
        />
        <Button buttonStyle="primary" onClick={this.openInviteModal}>
          <FormattedMessage id="teamTable.invite" />
        </Button>
        {
          this.state.inviteModalIsOpen &&
          <TeamInviteModal
            onClose={this.closeInviteModal}
            onSubmit={this.onInviteSubmit}
          />
        }
        {
          this.state.inviteSuccessModalIsOpen &&
          <InviteSuccessModal
            onClose={this.closeInviteSuccessModal}
          />
        }
        {
          this.state.deleteModal &&
          <DeleteModal
            onClose={this.closeDeleteModal}
            onSubmit={this.onDeleteSubmit}
            className={CSS.deleteModal}
            {...this.state.deleteModal}
          />
        }
        {
          this.state.deleteSuccessModalIsOpen &&
          <DeleteSuccessModal
            onClose={this.closeDeleteSuccessModal}
            className={CSS.deleteSuccessModal}
          />
        }
      </div>
    )
  }
}
