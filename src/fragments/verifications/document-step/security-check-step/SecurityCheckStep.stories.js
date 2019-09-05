import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import SecurityCheckStep from '.';

const stories = storiesOf(
  'fragments/verifications/DocumentStep/SecurityCheckStep',
  module,
);
stories.addDecorator(withKnobs);

const ids = [
  'template-matching',
  'alteration-detection',
  'watchlists',
  'facematch',
];

stories.add('Default', () => (
  <SecurityCheckStep
    error={boolean('error', false)}
    id={select('id', ids, 'template-matching')}
  />
));
