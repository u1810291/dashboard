import React from 'react';
import { connect, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { Card, closeOverlay, createOverlay } from 'components';
import { passwordChange } from 'state/auth/auth.actions';
import { selectAuthUser } from 'state/auth/auth.selectors';

import ChangePasswordModal from './modal/ChangePasswordModal';
import SettingsLayout from '../SettingsLayout';

import CSS from './PersonalSettings.module.scss';

// eslint-disable-next-line no-shadow
function PersonalSettings({ passwordChange }) {
  const user = useSelector(selectAuthUser);

  function handleSubmit(values, { setSubmitting, setStatus }) {
    const { password, oldPassword } = values;

    setStatus({});
    passwordChange({ password, oldPassword })
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

export default connect(null, { passwordChange })(PersonalSettings);
