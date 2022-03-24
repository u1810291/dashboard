import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { IdentityProfileActionGroups, IdentityProfileSliceTypes, IdentityProfileOldStore } from './IdentityProfileOld.store';

const initialState: IdentityProfileOldStore = {
  [IdentityProfileSliceTypes.IdentityProfile]: LoadableAdapter.createState(null),
};

export const identityProfileReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(IdentityProfileActionGroups.IdentityProfile, IdentityProfileSliceTypes.IdentityProfile),
});
