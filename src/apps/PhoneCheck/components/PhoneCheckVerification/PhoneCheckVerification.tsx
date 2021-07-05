import React from 'react';
import { CheckBarExpandable } from 'apps/ui';
import { PhoneValidation } from 'apps/PhoneValidation/components/PhoneValidation/PhoneValidation';

export interface PhoneCheckDataModel {
  countryCode?: string;
  phoneNumber?: string;
  isPhoneVerified?: boolean;
  dialingCode?: string;
}

export interface PhoneCheckStep {
  data?: PhoneCheckDataModel;
  error?: any;
}

export function PhoneCheckVerification({ data: step }: {
  data: PhoneCheckStep;
}) {
  return (
    <CheckBarExpandable step={step}>
      <PhoneValidation step={step} />
    </CheckBarExpandable>
  );
}
