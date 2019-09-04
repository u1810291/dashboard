import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import DataTable from 'components/data-table';
import SelectField from 'components/select-field';
import { createOverlay, closeOverlay } from 'components/overlay';
import Spinner from 'components/spinner';
import DeleteModal from './DeleteModal';
import DeleteSuccessModal from './DeleteSuccessModal';
import { ReactComponent as TrashBox } from './trashbox.svg';
import CSS from './TeamTable.module.scss';

class TeamTable extends React.Component {
  static propTypes = {
    collaborators: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    isDeleting: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isPatchingArray: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    onDeleteSubmit: PropTypes.func.isRequired,
    onRoleChange: PropTypes.func.isRequired,
  }

  roleOptions = [
    {
      label: this.props.intl.formatMessage({
        id: 'teamTable.roles.agent',
      }),
      value: 2,
    },
    {
      label: this.props.intl.formatMessage({
        id: 'teamTable.roles.admin',
      }),
      value: 1,
    },
  ]

  columns = [
    {
      size: 3,
      label: <FormattedMessage id="teamTable.name" />,
      content: ({ name }) => <div>{name}</div>,
    },
    {
      size: 4,
      label: <FormattedMessage id="teamTable.email" />,
      content: ({ email }) => <div>{email}</div>,
    },
    {
      size: 3,
      label: <FormattedMessage id="teamTable.role" />,
      content: (user) => (
        <div className={CSS.roleSelectWrapper}>
          <SelectField
            className={CSS.roleSelect}
            options={this.roleOptions}
            value={this.roleOptions.find((option) => option.value === user.role)}
            onChange={({ value }) => {
              this.props.onRoleChange(user.id, value);
            }}
          />
          {this.props.isPatchingArray.includes(user.id) && <Spinner />}
        </div>
      ),
    },
    {
      size: 1,
      content: (user) => (
        <TrashBox
          className={CSS.deleteButton}
          onClick={() => {
            this.setState({ deletingUser: user });
            this.openDeleteModal(user);
          }}
        />
      ),
    },
  ]

  constructor(props) {
    super(props);
    this.state = {
      deletingUser: {},
    };
  }

  componentDidUpdate(prevProps) {
    const { props: { isDeleting }, state: { deletingUser } } = this;
    if (prevProps.isDeleting !== isDeleting) {
      this.openDeleteModal(deletingUser);
    }
  }

  openDeleteSuccessModal = () => {
    createOverlay(
      <DeleteSuccessModal
        onClose={closeOverlay}
        className={CSS.deleteSuccessModal}
      />,
    );
  }

  openDeleteModal = (user) => {
    createOverlay(
      <DeleteModal
        onClose={closeOverlay}
        onSubmit={this.onDeleteSubmit}
        className={CSS.deleteModal}
        isDeleting={this.props.isDeleting}
        user={user}
      />,
    );
  }

  onDeleteSubmit = (id) => {
    this.props.onDeleteSubmit(id).then(() => this.openDeleteSuccessModal());
  }

  render() {
    const { collaborators, isLoading } = this.props;
    return (
      <DataTable
        className={CSS.table}
        rows={collaborators}
        columns={this.columns}
        emptyBodyLabel={<FormattedMessage id="teamTable.no-data" />}
        isLoading={isLoading}
      />
    );
  }
}

export default injectIntl(TeamTable);
