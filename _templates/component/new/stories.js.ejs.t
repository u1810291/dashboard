---
to: src/<%= name %>/<%= componentName %>.stories.js
---
import React from 'react'
import { storiesOf } from '@storybook/react'
import <%= componentName %> from '.'

const stories = storiesOf('<%= componentPath %>/<%= componentName %>', module)

stories.add('Default', () => (<<%= componentName %> message="hello" />))
