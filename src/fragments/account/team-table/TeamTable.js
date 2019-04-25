import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import DataTable from 'src/components/data-table'
import DeleteModal from './DeleteModal'
import DeleteSuccessModal from './DeleteSuccessModal'
import { ReactComponent as TrashBox } from './trashbox.svg'
import CSS from './TeamTable.scss'
import SelectField from 'src/components/select-field'
import { createOverlay, closeOverlay } from 'src/components/overlay'
import Spinner from 'src/components/spinner'

class TeamTable extends React.Component {
  roleOptions = [
    {
      label: this.props.intl.formatMessage({
        id: 'teamTable.roles.agent'
      }),
      value: 2
    },
    {
      label: this.props.intl.formatMessage({
        id: 'teamTable.roles.admin'
      }),
      value: 1
    }
  ]

  columns = [
    {
      size: 3,
      label: <FormattedMessage id="teamTable.name" />,
      content: ({ name }) => <div>{name}</div>
    },
    {
      size: 4,
      label: <FormattedMessage id="teamTable.email" />,
      content: ({ email }) => <div>{email}</div>
    },
    {
      size: 3,
      label: <FormattedMessage id="teamTable.role" />,
      content: user => (
        <div className={CSS.roleSelectWrapper}>
          <SelectField
            className={CSS.roleSelect}
            options={this.roleOptions}
            value={this.roleOptions.find(option => option.value === user.role)}
            onChange={({ value }) => {
              this.props.onRoleChange(user.id, value)
            }}
          />
          {this.props.isPatchingArray.includes(user.id) && <Spinner />}
        </div>
      )
    },
    {
      size: 1,
      content: user => (
        <TrashBox
          className={CSS.deleteButton}
          onClick={() => {
            this.setState({ deletingUser: user })
            this.openDeleteModal(user)
          }}
        />
      )
    }
  ]

  constructor(props) {
    super(props)
    this.state = {
      deletingUser: {}
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isDeleting !== this.props.isDeleting) {
      this.openDeleteModal(this.state.deletingUser)
    }
  }

  openDeleteSuccessModal = () => {
    createOverlay(
      <DeleteSuccessModal
        onClose={closeOverlay}
        className={CSS.deleteSuccessModal}
      />
    )
  }

  openDeleteModal = user => {
    createOverlay(
      <DeleteModal
        onClose={closeOverlay}
        onSubmit={this.onDeleteSubmit}
        className={CSS.deleteModal}
        isDeleting={this.props.isDeleting}
        user={user}
      />
    )
  }

  onDeleteSubmit = id => {
    this.props.onDeleteSubmit(id).then(() => this.openDeleteSuccessModal())
  }

  render() {
    return (
      <DataTable
        className={CSS.table}
        rows={this.props.collaborators}
        columns={this.columns}
        emptyBodyLabel={<FormattedMessage id="teamTable.no-data" />}
        isLoading={this.props.isLoading}
      />
    )
  }
}

export default injectIntl(TeamTable)
