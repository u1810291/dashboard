import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import client from 'lib/client';
import * as Mixpanel from 'lib/mixpanel';
import { signUp } from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('.signUp', () => {
  const mockAddUser = jest.fn(Mixpanel.addUser);

  describe('on success', () => {
    client.auth.signup = jest.fn().mockResolvedValue({});

    it('Mixpanel.addUser should be called', () => {
      store.dispatch(signUp()).then(() => {
        expect(mockAddUser.mock.calls.length).toBe(1);
      }).catch(() => {});
    });
  });

  describe('on error', () => {
    client.auth.signup = jest.fn().mockRejectedValue({ });
  });
});
