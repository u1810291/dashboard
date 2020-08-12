import { createSelector } from 'reselect';
import { AUTH_STORE_KEY } from './auth.store';

const selectAuthStore = (state) => state[AUTH_STORE_KEY];

export const selectAuthToken = createSelector(
  selectAuthStore,
  (auth) => auth.token,
);
