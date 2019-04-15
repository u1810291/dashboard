import React from 'react'
import { storiesOf } from '@storybook/react'
import FeaturesPoster from '.'

const stories = storiesOf('fragments/info/FeaturesPoster', module)

stories.add('Default', () => (<FeaturesPoster message="hello" />))
