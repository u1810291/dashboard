import React from 'react'
import { shallow } from 'enzyme'
import Section from '.'

describe('Sections', () => {
  test('component render', () => {
    const component = shallow(
      <Section>
        <div />
        <p />
      </Section>
    )
    expect(component).toMatchSnapshot()
  })
})
