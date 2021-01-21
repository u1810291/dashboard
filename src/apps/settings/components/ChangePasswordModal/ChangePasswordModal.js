import { Box, Button, InputLabel, TextField } from '@material-ui/core';
import { useOverlay, Modal } from 'apps/overlay';
import Img from 'assets/modal-change-pass.svg';
import { get } from 'lodash';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { QATags } from '../../../../models/QA.model';

export function ChangePasswordModal({ onSubmit }) {
  const intl = useIntl();
  const [, closeOverlay] = useOverlay();
  const [formData, setFormData] = useState({
    oldPassword: '',
    password: '',
    repeatPassword: '',
  });

  const [formState, setFormState] = useState({});

  function handleState(evt) {
    formData[evt.target.name] = evt.target.value;
    setFormData(formData);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (formData.oldPassword.length === 0) {
      setFormState({
        oldPassword: {
          isError: true,
          message: intl.formatMessage({ id: 'Settings.changePasswordModal.noEmpty' }),
        },
      });
    } else
    if (formData.password !== formData.repeatPassword) {
      setFormState({
        repeatPassword: {
          isError: true,
          message: intl.formatMessage({ id: 'Settings.changePasswordModal.passwordsDontMatch' }),
        },
      });
    } else
    if ((!/[0-9]+/.test(formData.password)) || (formData.password.length < 8)) {
      setFormState({
        password: {
          isError: true,
          message: intl.formatMessage({ id: 'Settings.changePasswordModal.passwordRequirements' }),
        },
      });
    } else {
      onSubmit(formData, { setFormState });
    }
  }

  return (
    <Modal
      imgSrc={Img}
      title={intl.formatMessage({ id: 'Settings.companySettings.changePassword' })}
      subtitle={intl.formatMessage({ id: 'Settings.companySettings.subtitle' })}
    >
      <form onSubmit={handleSubmit}>
        <Box mb={4}>
          <InputLabel>
            {intl.formatMessage({ id: 'personalSettings.labels.oldPassword' })}
          </InputLabel>
          <TextField
            inputProps={{ 'data-qa': QATags.Auth.ChangePassword.CurrentPasswordInput }}
            id="old-password"
            name="oldPassword"
            type="password"
            variant="outlined"
            margin="dense"
            error={get(formState, 'oldPassword.isError')}
            helperText={get(formState, 'oldPassword.message')}
            fullWidth
            onChange={handleState}
          />
        </Box>
        <Box mb={2}>
          <InputLabel>
            {intl.formatMessage({ id: 'personalSettings.labels.password' })}
          </InputLabel>
          <TextField
            inputProps={{ 'data-qa': QATags.Auth.ChangePassword.NewPasswordInput }}
            id="password"
            name="password"
            type="password"
            variant="outlined"
            margin="dense"
            error={get(formState, 'password.isError')}
            helperText={get(formState, 'password.message')}
            fullWidth
            onChange={handleState}
          />
        </Box>
        <Box mb={4}>
          <InputLabel>
            {intl.formatMessage({ id: 'personalSettings.labels.repeatPassword' })}
          </InputLabel>
          <TextField
            inputProps={{ 'data-qa': QATags.Auth.ChangePassword.RepeatPasswordInput }}
            id="password-repeat"
            name="repeatPassword"
            type="password"
            variant="outlined"
            margin="dense"
            error={get(formState, 'repeatPassword.isError')}
            helperText={get(formState, 'repeatPassword.message')}
            fullWidth
            onChange={handleState}
          />
        </Box>
        <Button
          data-qa={QATags.Auth.ChangePassword.SubmitButton}
          inputProps={{ 'data-qa': QATags.Auth.ChangePassword.RepeatPasswordInput }}
          type="submit"
          color="primary"
          variant="contained"
          disableElevation
          fullWidth
        >
          {intl.formatMessage({ id: 'Settings.changePasswordModal.send' })}
        </Button>
        <Button
          data-qa={QATags.Auth.ChangePassword.CancelButton}
          variant="contained"
          disableElevation
          fullWidth
          onClick={closeOverlay}
        >
          {intl.formatMessage({ id: 'cancel' })}
        </Button>
      </form>
    </Modal>
  );
}
