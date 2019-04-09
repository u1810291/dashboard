import React from 'react'
import { storiesOf } from '@storybook/react'
import Panel from '.'

const stories = storiesOf('components/Panel', module)

stories.add('Default', () => {
  const aside = (
    <aside className="background-softpink" style={{ width: '25px' }}>
      S T U B
    </aside>
  )
  return (
    <Panel.Body aside={aside}>
      <p style={{ fontSize: '48px', color: 'crimson' }}>Panel content</p>
    </Panel.Body>
  )
})
