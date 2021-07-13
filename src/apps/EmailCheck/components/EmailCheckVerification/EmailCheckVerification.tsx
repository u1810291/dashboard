import React from 'react';
import { Box } from '@material-ui/core';
import { EmailValidationStep, EmailRiskStep } from 'models/EmailCheck.model';
import { EmailValidation } from '../EmailValidation/EmailValidation';
import { EmailRisk } from '../EmailRisk/EmailRisk';

export interface EmailCheckVerificationData {
  emailValidationStep: EmailValidationStep;
  emailRiskStep: EmailRiskStep;
}

export function EmailCheckVerification({ data: { emailValidationStep, emailRiskStep } }: {
  data: EmailCheckVerificationData;
}) {
  return (
    <Box display="flex">
      <Box m={1} flexBasis="100%">
        <EmailValidation step={emailValidationStep} />
      </Box>
      <Box m={1} mt={1} flexBasis="100%">
        <EmailRisk step={emailRiskStep} />
      </Box>
    </Box>
  );
}
