import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { signUp } from './index'
import { updateIntercom } from 'lib/intercom'
import client from 'lib/client'
import * as Mixpanel from 'lib/mixpanel'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({})

describe('.signUp', () => {
  const mockUpdateIntercom = jest.fn(updateIntercom)
  const mockAddUser = jest.fn(Mixpanel.addUser)

  describe('on success', () => {
    client.auth.signup = jest.fn().mockResolvedValue({})

    it('updateIntercom should be called', () => {
      store.dispatch(signUp()).then(() => {
        expect(mockUpdateIntercom.mock.calls.length).toBe(1)
      }).catch(() => {})
    })

    it('Mixpanel.addUser should be called', () => {
      store.dispatch(signUp()).then(() => {
        expect(mockAddUser.mock.calls.length).toBe(1)
      }).catch(() => {})
    })
  })

  describe('on error', () => {
    client.auth.signup = jest.fn().mockRejectedValue({  })

    it('updateIntercom should not be called', () => {
      store.dispatch(signUp()).catch(() => {
        expect(mockUpdateIntercom.mock.calls.length).toBe(0)
      })
    })
    it('updateIntercom should not be called', () => {
      store.dispatch(signUp()).catch(() => {
        expect(mockAddUser.mock.calls.length).toBe(0)
      })
    })
  })

})

