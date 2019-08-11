import React from 'react'
import { storiesOf } from '@storybook/react'
import { Elements } from 'react-stripe-elements'
import PlanCancelModal from '.'

const stories = storiesOf('fragments/account/PlanCancelModal', module)

stories.add('Default', () => (
  <Elements>
    <PlanCancelModal
      plan={{
        _id: '1',
        planId: 'starter',
        amount: '120',
        planPrice: '187',
        extraPrice: '1.9'
      }}
    />
  </Elements>
))
