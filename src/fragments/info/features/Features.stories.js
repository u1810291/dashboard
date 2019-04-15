import React from 'react'
import { storiesOf } from '@storybook/react'
import Features from '.'

const stories = storiesOf('fragments/info/Features', module)

stories.add('Default', () => <Features />)
