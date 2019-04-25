import React from 'react'
import { storiesOf } from '@storybook/react'
import LivenessStep from '.'

const stories = storiesOf('fragments/verifications/LivenessStep', module)

const success = {
  data: {
    videoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/e/eb/Wood_cleaving_-_2016.webm/Wood_cleaving_-_2016.webm.480p.vp9.webm'
  },
  status: 200
}

const inProgress = {
  status: 100
}

const skipped = {
  status: 0
}

const error = {
  data: {
    videoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/e/eb/Wood_cleaving_-_2016.webm/Wood_cleaving_-_2016.webm.480p.vp9.webm'
  },
  status: 200,
  error: { message: 'Test error message' }
}

stories.add('Success', () => <LivenessStep step={success} />)
stories.add('In Progress', () => <LivenessStep step={inProgress} />)
stories.add('Error', () => <LivenessStep step={error} />)
stories.add('Skipped', () => <LivenessStep step={skipped} />)
