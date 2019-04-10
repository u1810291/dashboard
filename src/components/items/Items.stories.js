import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
  radios
} from '@storybook/addon-knobs'
import Items, { aligns, gaps, justifies, flows } from './Items'

const stories = storiesOf('components/Items', module)
stories.addDecorator(withKnobs)

stories.add('Default', () => (
  <Items
    inline={boolean('inline', false)}
    gap={number('gap', 2, {
      range: true,
      min: gaps[0],
      max: gaps[gaps.length - 1],
      step: 1
    })}
    align={select('align', aligns, 'start')}
    justifyContent={select('justifyContent', justifies, 'normal')}
    templateColumns={text('templateColumns', 'none')}
    templateRows={text('templateRows', 'none')}
    flow={radios('flow', flows, 'column')}
  >
    <div
      style={{ minWidth: '100px', minHeight: '80px', background: 'orange' }}
    />
    <div style={{ minWidth: '40px', minHeight: '160px', background: 'blue' }} />
    <div
      style={{ minWidth: '100px', minHeight: '80px', background: 'orange' }}
    />
    <div style={{ minWidth: '40px', minHeight: '160px', background: 'blue' }} />
  </Items>
))
