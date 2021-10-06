import { Box, Button, Paper, TextField } from '@material-ui/core';
import { get } from 'lodash';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useOverlay } from 'apps/overlay';
import { useStyles } from './ChangePasswordModal.styles';

export function ChangeEmailModal({ onSubmit }) {
  const intl = useIntl();
  const classes = useStyles();
  const [, closeOverlay] = useOverlay();
  const [formData, setFormData] = useState({
    newEmail: '',
  });

  const [formState, setFormState] = useState({});

  const handleState = useCallback((evt) => {
    formData[evt.target.name] = evt.target.value;
    setFormData(formData);
  }, [setFormData, formData]);

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();

    if (formData.newEmail.length === 0) {
      setFormState({
        newEmail: {
          isError: true,
          message: intl.formatMessage({ id: 'Settings.changeEmailModal.noEmpty' }),
        },
      });
    } else {
      onSubmit(formData, { setFormState });
    }
  }, [intl, setFormState, formData, onSubmit]);

  return (
    <Paper elevation={0} className={classes.container}>
      <Box fontSize={22} fontWeight={700} mb={1}>
        { intl.formatMessage({ id: 'Settings.changeEmailModal.changeEmail' }) }
      </Box>
      <Box fontSize={16} mb={3}>
        { intl.formatMessage({ id: 'Settings.changeEmailModal.changeEmailModalText' }) }
      </Box>
      { intl.formatMessage({ id: 'Settings.changeEmailModal.newEmail' }) }
      <form onSubmit={handleSubmit}>
        <TextField
          id="new-email"
          name="newEmail"
          type="input"
          margin="dense"
          error={get(formState, 'newEmail.isError')}
          helperText={get(formState, 'newEmail.message')}
          fullWidth
          onChange={handleState}
          className={classes.oldPassword}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disableElevation
          fullWidth
        >
          {intl.formatMessage({ id: 'Settings.changeEmailModal.send' })}
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disableElevation
          fullWidth
          onClick={closeOverlay}
        >
          {intl.formatMessage({ id: 'Settings.changeEmailModal.cancel' })}
        </Button>
      </form>
    </Paper>
  );
}
