import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/utils';
import { UserActionGroups } from './user.store';

const initialState = LoadableAdapter.createState({
  // id: string
  // firstName: string
  // lastName: string
  // fullName: string
  // locale: en_US | *
  // status: inactive | *
  // userType: merchant | *
  // dateCreated: Date
  email: null,
});

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(UserActionGroups.User),
});
