import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useOverlay, Modal } from 'apps/overlay';
import { validationHandler } from 'lib/validations';
import React, { useCallback, useState } from 'react';
import { useFormatMessage } from 'apps/intl';
import { merchantUpdateOnboardingSteps, selectMerchantOnboarding } from 'state/merchant';
import { StepsOptions, CreateMetamapCompleted } from 'apps/Analytics';
import { useIntl } from 'react-intl';
import { QATags } from 'models/QA.model';
import Img from 'assets/modal-add-flow.png';
import { useStyles } from './AddNewFlowModal.styles';

export function AddNewFlowModal({ submitNewFlow }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const onboardingProgress: StepsOptions[] = useSelector(selectMerchantOnboarding);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [, closeOverlay] = useOverlay();
  const isMetamapStepCompleted = CreateMetamapCompleted(onboardingProgress);

  const stepsProgressChange = (currentStep: string) => {
    if (!isMetamapStepCompleted) {
      const progressChanges = [...onboardingProgress];
      const itemNumber = progressChanges.findIndex((step) => step.stepId === currentStep);
      progressChanges[itemNumber] = { completed: true, stepId: currentStep };
      dispatch(merchantUpdateOnboardingSteps(progressChanges, currentStep, formatMessage));
    }
  };

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
      title={formatMessage('VerificationFlow.menu.addDialog.title')}
      subtitle={formatMessage('VerificationFlow.menu.addDialog.subtitle')}
      className={classes.addFlow}
    >
      <Box mb={2}>
        <InputLabel>
          {formatMessage('VerificationFlow.menu.addDialog.label')}
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
          inputProps={{ 'data-qa': QATags.Flows.Create.FlowNameInput }}
        />
      </Box>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        disableElevation
        fullWidth
        onClick={() => {
          handleSubmitDialog();
          stepsProgressChange('make-metamap');
        }}
        data-qa={QATags.Flows.Create.CreateButton}
      >
        {formatMessage('VerificationFlow.menu.addDialog.btn.create')}
      </Button>
      <Button
        variant="contained"
        disableElevation
        fullWidth
        onClick={closeOverlay}
        data-qa={QATags.Flows.Create.CancelButton}
      >
        {formatMessage('cancel')}
      </Button>
    </Modal>
  );
}
