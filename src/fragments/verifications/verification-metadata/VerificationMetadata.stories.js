import React from 'react';
import { storiesOf } from '@storybook/react';
import VerificationMetadata from '.';

const stories = storiesOf(
  'fragments/verifications/VerificationMetadata',
  module,
);

const metadata = {
  userId: 1415,
  userName: 'Vadim Rastyagaev',
  email: 'rastyagaev@gmail.com',
};

stories.add('Default', () => <VerificationMetadata metadata={metadata} />);
