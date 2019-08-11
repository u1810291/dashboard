import React from 'react'
import { storiesOf } from '@storybook/react'
import WithAsideModal from '.'

const stories = storiesOf('fragments/account/WithAsideModal', module)

stories.add('Default', () => (
  <WithAsideModal>
    <span>Default content</span>
  </WithAsideModal>
))
