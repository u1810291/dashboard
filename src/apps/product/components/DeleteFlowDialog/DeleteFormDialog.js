import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import { useStyles } from './DeleteFormDialog.styles';

const title = 'Delete flow';
const cancel = 'Cancel';
const del = 'Delete';
const content1 = 'Are you sure you want to delete this flow?';
const content2 = 'After removal, make sure you\'re not directing your users to this flow anymore. Any attempts to access this flow will automatically redirect users to your default flow';

export function DeleteFlowDialog({
  openDialog,
  closeDialogHandler,
  submitDialogForm,
  error,
  helperText,
  ...props
}) {
  const classes = useStyles();

  function deleteDialogHandler() {
    submitDialogForm();
  }

  return (
    <Dialog open={openDialog} onClose={closeDialogHandler} {...props}>
      <DialogTitle id="form-dialog-title" disableTypography className={classes.dialogTitle}>
        <Typography variant="h3">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content1}
        </DialogContentText>
        <Box>{content2}</Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialogHandler}>{cancel}</Button>
        <Button onClick={deleteDialogHandler}>{del}</Button>
      </DialogActions>
    </Dialog>
  );
}
