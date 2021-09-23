import { selectModelValue } from 'lib/loadable.selectors';
import { createSelector } from 'reselect';
import { USER_STORE_KEY } from './user.store';

export const selectUserModel = (state) => state[USER_STORE_KEY];

export const selectUserFullName = createSelector(
  selectUserModel,
  selectModelValue((user) => user && user.fullName),
);

export const selectUserFirstName = createSelector(
  selectUserModel,
  selectModelValue((user) => user && user.firstName),
);

export const selectUserLastName = createSelector(
  selectUserModel,
  selectModelValue((user) => user && user.lastName),
);

export const selectUserType = createSelector(
  selectUserModel,
  selectModelValue((user) => user && user.userType),
);

export const selectUserEmail = createSelector(
  selectUserModel,
  selectModelValue((user) => user && user.email),
);

export const selectUserId = createSelector(
  selectUserModel,
  selectModelValue((user) => user && user.id),
);

export const selectUserRegistrationDate = createSelector(
  selectUserModel,
  selectModelValue((user) => user && user.dateCreated),
);

export const selectUserIntercomHash = createSelector(
  selectUserModel,
  selectModelValue((user) => user?.intercomHash),
);
