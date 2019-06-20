import React from 'react'
import { storiesOf } from '@storybook/react'
import PricingRefundNotice from '.'

const stories = storiesOf('fragments/account/PricingRefundNotice', module)

stories.add('Default', () => <PricingRefundNotice />)
