import { get } from 'lodash';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Paper, Box, TextField, Button } from '@material-ui/core';
import { useStyles } from './ChangePasswordModal.styles';

export function ChangePasswordModal({ onSubmit }) {
  const intl = useIntl();
  const classes = useStyles();
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
          message: 'Password required',
        },
      });
    } else
    if (formData.password.length < 8) {
      setFormState({
        password: {
          isError: true,
          message: 'Password needs to be 8 characters long and at least one number',
        },
      });
    } else
    if (formData.password !== formData.repeatPassword) {
      setFormState({
        repeatPassword: {
          isError: true,
          message: 'Password doesn\'t match',
        },
      });
    } else
    if (!/[0-9]+/.test(formData.password)) {
      setFormState({
        password: {
          isError: true,
          message: 'Password needs to be 8 characters long and at least one number',
        },
      });
    } else {
      onSubmit(formData, { setFormState });
    }
  }

  return (
    <Paper elevation={0} className={classes.container}>
      <Box fontSize={22} fontWeight={700} mb={1}>
        { intl.formatMessage({ id: 'apps.settings.personalSettings.change' }) }
      </Box>
      <Box fontSize={16} mb={3}>
        { intl.formatMessage({ id: 'apps.settings.personalSettings.youCanChange' }) }
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          id="old-password"
          name="oldPassword"
          type="password"
          variant="outlined"
          label={intl.formatMessage({ id: 'personalSettings.labels.oldPassword' })}
          margin="dense"
          error={get(formState, 'oldPassword.isError')}
          helperText={get(formState, 'oldPassword.message')}
          fullWidth
          onChange={handleState}
          className={classes.oldPassword}
        />
        <TextField
          id="password"
          name="password"
          type="password"
          variant="outlined"
          label={intl.formatMessage({ id: 'personalSettings.labels.password' })}
          margin="dense"
          error={get(formState, 'password.isError')}
          helperText={get(formState, 'password.message')}
          fullWidth
          onChange={handleState}
        />
        <TextField
          id="password-repeat"
          name="repeatPassword"
          type="password"
          variant="outlined"
          label={intl.formatMessage({ id: 'personalSettings.labels.repeatPassword' })}
          margin="dense"
          error={get(formState, 'repeatPassword.isError')}
          helperText={get(formState, 'repeatPassword.message')}
          fullWidth
          onChange={handleState}
          className={classes.repeatPassword}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disableElevation
          fullWidth
        >
          {intl.formatMessage({ id: 'apps.settings.personalSettings.change' })}
        </Button>
      </form>
    </Paper>
  );
}
