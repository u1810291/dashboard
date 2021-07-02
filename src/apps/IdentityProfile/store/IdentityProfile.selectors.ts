import { selectModelValue } from 'lib/loadable.selectors';
import { createSelector } from 'reselect';
import { Loadable } from 'models/Loadable.model';
import { IdentityProfileResponse } from '../models/IdentityProfile.model';
import { IDENTITY_PROFILE_STORE_KEY, IdentityProfileSliceTypes, IdentityProfileStore } from './IdentityProfile.store';

export const identityProfileStore = (state): IdentityProfileStore => state[IDENTITY_PROFILE_STORE_KEY];

export const selectIdentityProfileModel = createSelector<any, any, Loadable<IdentityProfileResponse>>(
  identityProfileStore,
  (store) => store[IdentityProfileSliceTypes.IdentityProfile],
);

export const selectIdentityProfile = createSelector<any, any, IdentityProfileResponse>(
  selectIdentityProfileModel,
  selectModelValue(),
);

export const selectIdentityProfileId = createSelector(
  selectIdentityProfile,
  (profile) => profile?._id,
);
