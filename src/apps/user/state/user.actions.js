import { createTypesSequence } from 'state/store.utils';
import { UserActionGroups } from 'apps/user/state/user.store';

export const types = {
  ...createTypesSequence(UserActionGroups.User),
};

export const userLoadSuccess = (payload) => (dispatch) => {
  dispatch({ type: types.USER_SUCCESS, payload });
};
