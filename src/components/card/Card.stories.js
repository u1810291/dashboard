import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, select } from '@storybook/addon-knobs'
import Card from '.'

const backgrounds = ['white', 'pink', 'darkpink', 'active']
const borders = ['transparent', 'active']

const stories = storiesOf('components/Card', module)
stories.addDecorator(withKnobs)

stories.add('Default', () => (
  <Card
    background={select('background', backgrounds, 'white')}
    border={select('border', borders, 'transparent')}
    shadow={number('shadow', 1, {
      range: true,
      min: 0,
      max: 4,
      step: 1
    })}
    padding={number('padding', 2, {
      range: true,
      min: 0,
      max: 4,
      step: 1
    })}
  >
    Panel content
  </Card>
))

const aside = (
  <aside className="background-pink" style={{ width: '80px' }}>
    <h2>ASIDE</h2>
  </aside>
)
stories.add('Left aside element', () => (
  <Card background="active" aside={aside}>
    <h3>
      Some title
      <p>Panel content</p>
    </h3>
  </Card>
))
