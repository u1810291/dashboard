import React from 'react'
import { storiesOf } from '@storybook/react'
import Sections from '.'

const style = { height: '50px', borderRadius: '5px' }

const stories = storiesOf('components/stacks/Sections', module)

stories.add('Default', () => (
  <Sections>
    <div style={{ ...style, background: 'pink' }} />
    <div style={{ ...style, background: 'crimson' }} />
    <div style={{ ...style, background: 'red' }} />
  </Sections>
))

stories.add('With horizontal line in between', () => (
  <Sections>
    <div style={{ ...style, background: 'pink' }} />
    <hr />
    <div style={{ ...style, background: 'crimson' }} />
    <hr />
    <div style={{ ...style, background: 'red' }} />
  </Sections>
))

stories.add('extraGap', () => (
  <Sections extraGap>
    <div style={{ ...style, background: 'pink' }} />
    <div style={{ ...style, background: 'crimson' }} />
    <div style={{ ...style, background: 'red' }} />
  </Sections>
))

stories.add('smallGap', () => (
  <Sections smallGap>
    <div style={{ ...style, background: 'pink' }} />
    <div style={{ ...style, background: 'crimson' }} />
    <div style={{ ...style, background: 'red' }} />
  </Sections>
))

stories.add('With custom className', () => (
  <Sections className="background-pink">
    <div style={{ ...style, background: 'black' }} />
    <div style={{ ...style, background: 'gray' }} />
    <div style={{ ...style, background: 'silver' }} />
  </Sections>
))
