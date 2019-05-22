import React from 'react'
import renderer from 'react-test-renderer'
import SentryLogger from '.'

jest.mock('@sentry/browser')

// eslint-disable-next-line react/require-render-return
class TestErrorComponent extends React.Component {
  render() {
    // eslint-disable-next-line no-throw-literal
    throw 'test error'
    // eslint-disable-next-line no-unreachable
    return null
  }
}

describe('When no JS errors are caught in a child component', () => {
  it('renders children', () => {
    const component = renderer.create(
      <SentryLogger>
        <span>Component with no errors</span>
      </SentryLogger>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('When a JS error is caught in a child component', () => {
  let spy = jest.spyOn(SentryLogger.prototype, 'componentDidCatch')
  let component

  beforeAll(() => {
    global.console.error = jest.fn(() => {})
    component = renderer
      .create(
        <SentryLogger>
          <TestErrorComponent />
        </SentryLogger>
      )
      .toJSON()
  })

  afterAll(() => {
    global.console.error.removeMock()
  })

  test('reports errors for child componnents', () => {
    expect(spy).toHaveBeenCalled()
  })

  test('renders the report feedback link', () => {
    expect(component).toMatchSnapshot()
  })
})
