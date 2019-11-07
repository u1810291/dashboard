import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { Card, closeOverlay, createOverlay } from 'components';
import { passwordChange } from 'state/auth/auth.actions';

import ChangePasswordModal from './modal/ChangePasswordModal';
import SettingsLayout from '../SettingsLayout';

import CSS from './PersonalSettings.module.scss';

// eslint-disable-next-line no-shadow
function PersonalSettings({ user, passwordChange, token }) {
  function handleSubmit(values, { setSubmitting, setStatus }) {
    const { password, oldPassword } = values;

    setStatus({});
    passwordChange({ password, oldPassword }, token)
      .then(() => {
        setSubmitting(false);
        setStatus(true);
        closeOverlay();
      })
      .catch((error) => {
        setSubmitting(false);
        setStatus({ oldPassword: error.response.data.message });
      });

    return false;
  }

  function openChangePasswordModal() {
    createOverlay(<ChangePasswordModal onSubmit={handleSubmit} />);
  }

  return (
    <SettingsLayout aside={false}>
      <Card flow="row" padding={2} className={CSS.personalSettings}>
        <div className={CSS.title}>
          <h3>
            <FormattedMessage id="apps.settings.personalSettings.title" />
          </h3>
        </div>
        <div className={CSS.dataContent}>
          <div className={CSS.data}>
            <h3>
              <FormattedMessage id="apps.settings.personalSettings.email" />
            </h3>
            {user.email}
          </div>
          <div className={CSS.data}>
            <h3>
              <FormattedMessage id="apps.settings.personalSettings.password" />
            </h3>
            <FormattedMessage id="apps.settings.personalSettings.defaultPassword" />
            <div
              className={CSS.change}
              onClick={() => openChangePasswordModal()}
              onKeyUp={() => {}}
              role="button"
              tabIndex="0"
            >
              <FormattedMessage id="apps.settings.personalSettings.change" />
            </div>
          </div>
        </div>
      </Card>
    </SettingsLayout>
  );
}

PersonalSettings.propTypes = {
  passwordChange: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.shape().isRequired,
};

export default connect(
  (state) => ({
    token: state.auth.token,
    user: state.auth.user,
  }),
  { passwordChange },
)(PersonalSettings);
