import { useIntl } from 'react-intl';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import { useStyles } from './AddNewFlowDialog.styles';

export function AddNewFlowDialog({
  openDialog,
  closeDialogHandler,
  submitDialogForm,
  error,
  helperText,
  ...props
}) {
  const classes = useStyles();
  const [text, setText] = useState('');
  const intl = useIntl();

  function onChangeHandler(e) {
    setText(e.target.value);
  }

  function submitDialogHandler() {
    submitDialogForm(text);
  }

  function onKeyDownHandler(e) {
    if (e.key === 'Enter') {
      submitDialogForm(text);
    }
  }

  return (
    <Dialog open={openDialog} onClose={closeDialogHandler} className={classes.container} {...props}>
      <DialogTitle id="form-dialog-title" disableTypography className={classes.title}>
        <Typography variant="h3">{intl.formatMessage({ id: 'VerificationFlow.menu.addDialog.title' })}</Typography>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText>
          {intl.formatMessage({ id: 'VerificationFlow.menu.addDialog.content' })}
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          error={error}
          onKeyDown={onKeyDownHandler}
          onChange={onChangeHandler}
          helperText={helperText}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialogHandler}>{intl.formatMessage({ id: 'cancel' })}</Button>
        <Button onClick={submitDialogHandler}>{intl.formatMessage({ id: 'submit' })}</Button>
      </DialogActions>
    </Dialog>
  );
}
