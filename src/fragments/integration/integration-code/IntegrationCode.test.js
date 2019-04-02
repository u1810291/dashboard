import React from 'react'
import { shallow } from 'enzyme'
import IntegrationCode from '.'

describe('IntegrationCode', () => {
  test('component render', () => {
    const component = shallow(<IntegrationCode integrationCode="hello" />)
    expect(component).toMatchSnapshot()
  })
})
