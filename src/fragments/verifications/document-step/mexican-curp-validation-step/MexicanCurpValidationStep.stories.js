import React from 'react';
import { storiesOf } from '@storybook/react';
import MexicanCurpValidationStep from '.';

const stories = storiesOf(
  'fragments/verifications/DocumentStep/MexicanCurpValidationStep',
  module,
);

const data = {
  fullName: { value: 'RASTYAGAEV VADIM ' },
  documentNumber: { value: '278691410' },
  dateOfBirth: { value: '31|12|1984' },
  emissionDate: { value: '18-09-2015' },
};

stories.add('Success', () => (
  <MexicanCurpValidationStep step={{ data, status: 200 }} />
));
stories.add('In Progress', () => (
  <MexicanCurpValidationStep step={{ data, status: 100 }} />
));
stories.add('Error', () => (
  <MexicanCurpValidationStep
    step={{ data, status: 200, error: { message: 'Error Message' } }}
  />
));
