import { notification } from 'apps/ui';
import { ErrorMessages } from 'models/Error.model';
import { identityRemove } from 'state/identities/identities.actions';
import * as client from '../client/IdentityProfile.client';
import { IdentityProfileActionTypes } from './IdentityProfile.store';

export const identityProfileLoad = (identityId: string, asMerchantId: string) => async (dispatch) => {
  dispatch({ type: IdentityProfileActionTypes.IDENTITY_PROFILE_REQUEST });
  try {
    const { data } = await client.getIdentityProfile(identityId, { ...(asMerchantId && { asMerchantId }) });
    dispatch({ type: IdentityProfileActionTypes.IDENTITY_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: IdentityProfileActionTypes.IDENTITY_PROFILE_FAILURE, error });
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const identityProfileClear = () => async (dispatch) => {
  dispatch({ type: IdentityProfileActionTypes.IDENTITY_PROFILE_CLEAR, payload: {} });
};

// TODO @dkchv: !!! not finished
export const identityProfileRemove = (id: string) => async (dispatch) => {
  await client.identityProfileRemove(id);
  // TODO @dkchv: used old implementation to remove from lists
  dispatch(identityRemove(id));
};
