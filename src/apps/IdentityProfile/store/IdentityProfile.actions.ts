import { notification } from 'apps/ui';
import { ERROR_COMMON } from 'models/Error.model';
import { identityRemove } from '../../../state/identities/identities.actions';
import * as client from '../client/IndentityProfile.client';
import { IdentityProfileResponse } from '../models/IdentityProfile.model';
import { IdentityProfileActionTypes } from './IdentityProfile.store';

export const identityProfileLoad = (identityId) => async (dispatch) => {
  dispatch({ type: IdentityProfileActionTypes.IDENTITY_PROFILE_REQUEST });
  try {
    const { data }: { data: IdentityProfileResponse } = await client.getIdentityProfile(identityId);
    dispatch({ type: IdentityProfileActionTypes.IDENTITY_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: IdentityProfileActionTypes.IDENTITY_PROFILE_FAILURE, error });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

// TODO @dkchv: !!! not finished
export const identityProfileRemove = (id: string) => async (dispatch) => {
  await client.identityProfileRemove(id);
  // TODO @dkchv: used old implementation to remove from lists
  dispatch(identityRemove(id));
};
