import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { signUp } from './index'
import { updateIntercom } from 'src/lib/intercom'
import client from 'src/lib/client'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({})

describe('test intercom after signup', () => {
  const mockUpdateIntercom = jest.fn(updateIntercom)

  it('updateIntercom should be called on success', () => {
    client.auth.signup = jest.fn().mockResolvedValue({})

    store.dispatch(signUp()).then(() => {
      expect(mockUpdateIntercom.mock.calls.length).toBe(1)
    }).catch(() => {})
  })

  it('updateIntercom should not be called on error', () => {
    client.auth.signup = jest.fn().mockRejectedValue({  })

    store.dispatch(signUp()).catch(() => {
      expect(mockUpdateIntercom.mock.calls.length).toBe(0)
    })
  })
})

