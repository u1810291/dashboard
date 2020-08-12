import { selectModelValue } from 'lib/loadable.selectors';
import { createSelector } from 'reselect';
import { USER_STORE_KEY } from './user.store';

export const selectUserModel = (state) => state[USER_STORE_KEY];

export const selectUserEmail = createSelector(
  selectUserModel,
  selectModelValue((user) => user && user.email),
);

export const selectUserId = createSelector(
  selectUserModel,
  selectModelValue((user) => user && user.id),
);
