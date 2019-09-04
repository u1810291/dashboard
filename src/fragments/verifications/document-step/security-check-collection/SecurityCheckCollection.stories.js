import React from 'react';
import { storiesOf } from '@storybook/react';
import SecurityCheckCollection from '.';

const stories = storiesOf(
  'fragments/verifications/DocumentStep/SecurityCheckCollection',
  module,
);

const success = [
  {
    id: 'template-matching',
    status: 200,
  },
  {
    id: 'alteration-detection',
    status: 200,
  },
];

const error = [
  {
    id: 'watchlists',
    status: 200,
    error: { message: 'Error message' },
  },
];

const inProgress = [
  {
    id: 'facematch',
    status: 100,
  },
];

stories.add('Done', () => (
  <SecurityCheckCollection steps={[...success, ...error]} />
));

stories.add('In Progress', () => (
  <SecurityCheckCollection steps={[...success, ...error, ...inProgress]} />
));
