import { Loadable } from 'models/Loadable.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';
import { IdentityProfileResponse } from 'apps/IdentityProfile';

export const IDENTITY_PROFILE_STORE_KEY = 'identityProfile';

export enum IdentityProfileActionGroups {
  IdentityProfile = 'IDENTITY_PROFILE',
}

export enum IdentityProfileSliceTypes {
  IdentityProfile = 'identityProfile',
}

export interface IdentityProfileOldStore {
  [IdentityProfileSliceTypes.IdentityProfile]: Loadable<IdentityProfileResponse>;
}

export const IdentityProfileActionTypes: TypesSequence = {
  ...createTypesSequence(IdentityProfileActionGroups.IdentityProfile),
  IDENTITY_PROFILE_REMOVE: 'IDENTITY_PROFILE_REMOVE',
};
