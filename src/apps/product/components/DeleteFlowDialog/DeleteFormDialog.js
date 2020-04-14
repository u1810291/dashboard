import React from 'react';
import { useIntl } from 'react-intl';
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

export function DeleteFlowDialog({
  openDialog,
  closeDialogHandler,
  submitDialogForm,
  error,
  helperText,
  ...props
}) {
  const intl = useIntl();
  const classes = useStyles();

  function deleteDialogHandler() {
    submitDialogForm();
  }

  return (
    <Dialog open={openDialog} onClose={closeDialogHandler} {...props}>
      <DialogTitle id="form-dialog-title" disableTypography className={classes.dialogTitle}>
        <Typography variant="h3">
          {intl.formatMessage({ id: 'VerificationFlow.menu.deleteDialog.header' })}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {intl.formatMessage({ id: 'VerificationFlow.menu.deleteDialog.text' })}
        </DialogContentText>
        <Box>{intl.formatMessage({ id: 'VerificationFlow.menu.deleteDialog.subText' })}</Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialogHandler}>{intl.formatMessage({ id: 'cancel' })}</Button>
        <Button onClick={deleteDialogHandler}>{intl.formatMessage({ id: 'delete' })}</Button>
      </DialogActions>
    </Dialog>
  );
}
