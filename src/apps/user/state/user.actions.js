import { createTypesSequence } from 'state/utils';
import { UserActionGroups } from 'apps/user/state/user.model';

export const types = {
  ...createTypesSequence(UserActionGroups.User),
};

export const userLoadSuccess = (payload) => (dispatch) => {
  dispatch({ type: types.USER_SUCCESS, payload });
};
