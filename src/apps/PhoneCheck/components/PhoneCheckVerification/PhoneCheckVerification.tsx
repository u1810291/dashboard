import React from 'react';
import { Box } from '@material-ui/core';
import { PhoneValidationStep, PhoneRiskStep } from 'models/PhoneCheck.model';
import { PhoneValidation } from '../PhoneValidation/PhoneValidation';
import { PhoneRisk } from '../PhoneRisk/PhoneRisk';

export interface PhoneCheckVerificationData {
  phoneRiskStep: PhoneRiskStep;
  phoneValidationStep: PhoneValidationStep;
}

export function PhoneCheckVerification({ data: { phoneValidationStep, phoneRiskStep } }: {
  data: PhoneCheckVerificationData;
}) {
  return (
    <Box display="flex">
      <Box m={1} flexBasis="100%">
        <PhoneValidation step={phoneValidationStep} />
      </Box>
      <Box m={1} flexBasis="100%">
        <PhoneRisk step={phoneRiskStep} />
      </Box>
    </Box>
  );
}
