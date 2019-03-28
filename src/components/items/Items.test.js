import React from 'react'
import { shallow } from 'enzyme'
import Items from '.'

describe('Items', () => {
  test('default', () => {
    const component = shallow(
      <Items>
        <div />
        <div />
        <div />
      </Items>
    )
    expect(component).toMatchSnapshot()
  })

  test('inline', () => {
    const component = shallow(
      <Items inline>
        <div />
        <div />
        <div />
      </Items>
    )
    expect(component).toMatchSnapshot()
  })

  test('align top', () => {
    const component = shallow(
      <Items align="top">
        <div />
        <div />
        <div />
      </Items>
    )
    expect(component).toMatchSnapshot()
  })

  test('align bottom', () => {
    const component = shallow(
      <Items align="bottom">
        <div />
        <div />
        <div />
      </Items>
    )
    expect(component).toMatchSnapshot()
  })

  test('align center', () => {
    const component = shallow(
      <Items align="center">
        <div />
        <div />
        <div />
      </Items>
    )
    expect(component).toMatchSnapshot()
  })

  test('align stretch', () => {
    const component = shallow(
      <Items align="stretch">
        <div />
        <div />
        <div />
      </Items>
    )
    expect(component).toMatchSnapshot()
  })

  test('template', () => {
    const component = shallow(
      <Items template="3fr 1fr 3fr">
        <div />
        <div />
        <div />
      </Items>
    )
    expect(component).toMatchSnapshot()
  })
})
