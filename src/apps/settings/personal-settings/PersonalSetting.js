import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Card, closeOverlay, createOverlay } from 'components';
import { passwordReset } from 'state/auth'

import SettingsLayout from './../SettingsLayout'
import ChangePasswordModal from './modal/ChangePasswordModal';

import CSS from './PersonalSettings.module.scss'

function openChangePasswordModal() {
  createOverlay(<ChangePasswordModal onSubmit={handleSubmit} />)
}

function handleSubmit (values, { props, setSubmitting, setStatus }) {
  setStatus({});

  props.passwordReset({ values, token: props.token })
    .then(data => {
      setSubmitting(false);
      setStatus(true);
      closeOverlay();
    })
    .catch(error => {
      setSubmitting(false);
      setStatus({ password: error.response.data.message })
    });

  return false;
}

function PersonalSettings({ user  }) {
  return (
    <SettingsLayout aside={false}>
      <Card flow="row" padding={2} className={CSS.personalSettings}>
        <div className={CSS.title}>
          <h3>
            <FormattedMessage id="apps.settings.personalSettings.title"/>
          </h3>
        </div>
        <div className={CSS.dataContent}>
          <div className={CSS.data}>
            <h3>
              <FormattedMessage id="apps.settings.personalSettings.email"/>
            </h3>
            {user.email}
          </div>
          <div className={CSS.data}>
            <h3>
              <FormattedMessage id="apps.settings.personalSettings.password"/>
            </h3>
            <FormattedMessage id="apps.settings.personalSettings.defaultPassword"/>
            <div className={CSS.change} onClick={() => openChangePasswordModal()}>
              <FormattedMessage id="apps.settings.personalSettings.change" />
            </div>
          </div>
        </div>
      </Card>
    </SettingsLayout>
  );
}

export default connect(
  (state, props) => ({
    token: state.auth.token,
    user: state.auth.user,
  }),
  { passwordReset }
)(PersonalSettings);
