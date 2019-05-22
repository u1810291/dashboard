import React from 'react'
import { storiesOf } from '@storybook/react'
import LaunchIntegrate from '.'

const stories = storiesOf('fragments/launch/LaunchIntegrate', module)

stories.add('Default', () => (<LaunchIntegrate message="hello" />))
