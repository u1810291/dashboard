import React from 'react';
import { storiesOf } from '@storybook/react';
import { Elements } from 'react-stripe-elements';
import CardDeclinedModal from '.';

const stories = storiesOf('fragments/account/CardDeclinedModal', module);

stories.add('Default', () => (
  <Elements>
    <CardDeclinedModal
      onChangeMethod={() => {}}
    />
  </Elements>
));
