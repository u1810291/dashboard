import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import PricingPlans from '.'

const stories = storiesOf('fragments/account/PricingPlans', module)

stories.add('Default', () => (
  <PricingPlans
    planId="regular"
    planPrice="300"
    amount="200"
    onChoosePlan={action('Start plan')}
  />
))

stories.add('Highlight', () => (
  <PricingPlans
    planId="regular"
    planPrice="300"
    amount="200"
    highlight
    onChoosePlan={action('Start plan')}
  />
))
