import { selectModelValue } from 'lib/loadable.selectors';
import { createSelector } from 'reselect';
import { Loadable } from 'models/Loadable.model';
import { IdentityProfileResponse } from 'apps/IdentityProfile';
import { IDENTITY_PROFILE_STORE_KEY, IdentityProfileSliceTypes, IdentityProfileOldStore } from './IdentityProfileOld.store';

export const identityProfileStore = (state: {IDENTITY_PROFILE_STORE_KEY: IdentityProfileOldStore}): IdentityProfileOldStore => state[IDENTITY_PROFILE_STORE_KEY];

export const selectIdentityProfileModel = createSelector<[typeof identityProfileStore], Loadable<IdentityProfileResponse>>(
  identityProfileStore,
  (store) => store[IdentityProfileSliceTypes.IdentityProfile],
);

export const selectIdentityProfile = createSelector<[typeof selectIdentityProfileModel], IdentityProfileResponse>(
  selectIdentityProfileModel,
  selectModelValue(),
);

export const selectIdentityProfileId = createSelector(
  selectIdentityProfile,
  (profile) => profile?._id,
);
