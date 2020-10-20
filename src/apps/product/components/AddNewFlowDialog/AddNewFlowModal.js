import { Box, Button, InputLabel, TextField } from '@material-ui/core';
import { useOverlay } from 'apps/overlay';
import { validationHandler } from 'lib/validations';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import Img from '../../../../assets/modal-add-flow.png';
import Modal from '../../../../components/modal/Modal';
import { useStyles } from './AddNewFlowModal.styles';

export function AddNewFlowModal({ submitNewFlow }) {
  const intl = useIntl();
  const classes = useStyles();
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [, closeOverlay] = useOverlay();

  const handleSubmit = useCallback(async (text) => {
    try {
      await submitNewFlow(text);
      closeOverlay();
    } catch (e) {
      validationHandler(e, intl, setError);
    }
  }, [intl, submitNewFlow, closeOverlay]);

  const handleOnChange = useCallback((e) => {
    setInput(e.target.value);
  }, [setInput]);

  const handleSubmitDialog = useCallback(() => {
    handleSubmit(input);
  }, [handleSubmit, input]);

  const handleOnKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSubmit(input);
    }
  }, [handleSubmit, input]);

  return (
    <Modal
      imgSrc={Img}
      title={intl.formatMessage({ id: 'VerificationFlow.menu.addDialog.title' })}
      subtitle={intl.formatMessage({ id: 'VerificationFlow.menu.addDialog.subtitle' })}
      className={classes.addFlow}
    >
      <Box mb={2}>
        <InputLabel>
          {intl.formatMessage({ id: 'VerificationFlow.menu.addDialog.label' })}
        </InputLabel>
        <TextField
          autoFocus
          fullWidth
          variant="outlined"
          margin="dense"
          error={!!error}
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChange}
          helperText={error}
        />
      </Box>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        disableElevation
        fullWidth
        onClick={handleSubmitDialog}
      >
        {intl.formatMessage({ id: 'VerificationFlow.menu.addDialog.btn.create' })}
      </Button>
      <Button
        variant="contained"
        disableElevation
        fullWidth
        onClick={closeOverlay}
      >
        {intl.formatMessage({ id: 'cancel' })}
      </Button>
    </Modal>
  );
}
