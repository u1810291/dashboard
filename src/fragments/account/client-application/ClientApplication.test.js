import React from 'react'
import { shallow } from 'enzyme'
import ClientApplication from '.'

describe('ClientApplication', () => {
  const application = {
    clientId: '5c5c929014cb881f5730271e',
    clientSecret: '80ZR35QMCRUFD9XC9AQ377WEMBKCY4X0'
  }
  const webhooks = [
    {
      id: '1',
      url: 'https://mati-callbacks-demo.firebaseio.com/webhooks.json'
    },
    {
      id: '2',
      url: 'https://en860xcg7be8q.x.pipedream.net/'
    }
  ]

  test('no webhooks', () => {
    const component = shallow(<ClientApplication application={application} webhooks={[]} />)
    expect(component).toMatchSnapshot()
  })

  test('one webhook', () => {
    const component = shallow(
      <ClientApplication application={application} webhooks={webhooks.slice(0, 1)} />
    )
    expect(component).toMatchSnapshot()
  })

  test('two webhooks', () => {
    const component = shallow(
      <ClientApplication application={application} webhooks={webhooks.slice(0, 1)} />
    )
    expect(component).toMatchSnapshot()
  })
})
