import { AUTH_STORE_KEY } from 'apps/auth/state/auth.model';
import { createSelector } from 'reselect';

const selectAuthStore = (state) => state[AUTH_STORE_KEY];

export const selectAuthToken = createSelector(
  selectAuthStore,
  (auth) => auth.token,
);
