import React from 'react'
import { storiesOf } from '@storybook/react'
import openOverlay from '.'
import { Container } from 'src/components/overlay'

const stories = storiesOf('components/YoutubeOverlay', module)

stories.add('Default', () => (
  <React.Fragment>
    <Container />{' '}
    <button onClick={() => openOverlay({ id: 'Z06gUeqUpeo' })}>
      Sample Overlay
    </button>
  </React.Fragment>
))
