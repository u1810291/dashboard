import React from 'react'
import { storiesOf } from '@storybook/react'
import LaunchPricing from '.'

const stories = storiesOf('fragments/launch/LaunchPricing', module)

stories.add('Default', () => (<LaunchPricing message="hello" />))
