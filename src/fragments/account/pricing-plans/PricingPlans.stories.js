import React from 'react'
import { storiesOf } from '@storybook/react'
import PricingPlans from '.'

const stories = storiesOf('fragments/account/PricingPlans', module)

stories.add('Default', () => (<PricingPlans message="hello" />))
