import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Modal from 'components/modal';
import Button from 'components/button';
import { setI18nContext } from 'components/i18n-context';
import Spinner from 'components/spinner';
import TeamInviteForm from './TeamInviteForm';

class TeamInviteModal extends React.Component {
  static propTypes = {
    isPosting: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  onInviteClick = () => {
    const { refs: { teamInviteForm } } = this;
    teamInviteForm.submitForm();
  }

  handleSubmit = (data) => this.props.onSubmit(data)

  render() {
    const { className, isPosting, ...modalProps } = this.props;

    return (
      <Modal
        className={className}
        {...modalProps} // eslint-disable-line react/jsx-props-no-spreading
      >
        <header>
          <FormattedMessage id="teamTable.inviteModal.title" />
        </header>
        <main>
          <TeamInviteForm
            ref="teamInviteForm" // eslint-disable-line react/no-string-refs
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
    );
  }
}

export default setI18nContext('teamTable.form')(TeamInviteModal);
