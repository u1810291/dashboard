import React from 'react'
import { storiesOf } from '@storybook/react'
import LaunchCustomize from '.'

const stories = storiesOf('fragments/launch/LaunchCustomize', module)

stories.add('Default', () => (<LaunchCustomize message="hello" />))
