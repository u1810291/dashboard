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

const title = 'Create new flow';
const cancel = 'Cancel';
const submit = 'Submit';
const content = 'Enter the name of your verification flow';

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
    <Dialog open={openDialog} onClose={closeDialogHandler} {...props}>
      <DialogTitle id="form-dialog-title" disableTypography className={classes.dialogTitle}>
        <Typography variant="h3">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
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
        <Button onClick={closeDialogHandler}>{cancel}</Button>
        <Button onClick={submitDialogHandler}>{submit}</Button>
      </DialogActions>
    </Dialog>
  );
}
