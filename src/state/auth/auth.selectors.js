import { createSelector } from 'reselect';


const selectAuthStore = (state) => state.auth;

export const selectAuthToken = createSelector(
  selectAuthStore,
  (auth) => auth.token,
);

export const selectAuthUser = createSelector(
  selectAuthStore,
  (auth) => auth.user,
);

export const selectUserEmail = createSelector(
  selectAuthUser,
  (user) => user.email,
);

export const selectUserId = createSelector(
  selectAuthUser,
  (user) => user.id,
);
