import React from 'react';
import { storiesOf } from '@storybook/react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CardModal from '.';

const stories = storiesOf('fragments/account/CardModal', module);

stories.add('Default', () => (
  <StripeProvider apiKey="pk_test_9vO7ESFOZjbkPhYfOCHI543m00SmivQs2f">
    <Elements>
      <CardModal
        planId="starter"
        planPrice="187"
        extraPrice="1.86"
        amount="200"
        name="Vadim Rastyagaev"
        customerId="CUSTOMER_ID"
      />
    </Elements>
  </StripeProvider>
));
