import React from 'react'
import { shallow } from 'enzyme'
import IntegrationSteps from '.'

describe('IntegrationSteps', () => {
  test('blocks render', () => {
    const component = shallow(<IntegrationSteps />)
    expect(component).toMatchSnapshot()
  })
})
