import { updatePasswordExpirationPolicy } from 'apps/settings/api/Settings.client';
import { types as merchantActionTypes } from 'state/merchant/merchant.actions';

export const updatePasswordExpiration = (passwordExpirationPolicyValue) => async (dispatch) => {
  try {
    const data = await updatePasswordExpirationPolicy(passwordExpirationPolicyValue);
    // @ts-ignore
    dispatch({ type: merchantActionTypes.MERCHANT_SUCCESS, payload: data.data });
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
