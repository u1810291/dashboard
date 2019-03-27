---
to: src/<%= name %>/<%= componentName %>.test.js
---
import React from 'react'
import { shallow } from 'enzyme'
import <%= componentName %> from '.'

describe('<%= componentName %>', () => {
  test('component render', () => {
    const component = shallow(<<%= componentName %> message="hello" />)
    expect(component).toMatchSnapshot()
  })
})
