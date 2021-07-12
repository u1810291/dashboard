import { productManagerService, selectProductRegistered } from 'apps/Product';
import { notification } from 'apps/ui';
import { ERROR_COMMON, IN_REVIEW_MODE_ERROR, isInReviewModeError } from 'models/Error.model';
import { IdentityStatuses } from 'models/Status.model';
import { PassedVerificationsResponse, VerificationResponse } from 'models/Verification.model';
import { Dispatch } from 'redux';
import { types } from 'state/identities/identities.actions';
import { selectIdentityModel } from 'state/identities/identities.selectors';
import * as client from '../client/Verification.client';
import { VerificationActionTypes } from './Verification.store';

export const verificationListLoad = (identityId: string, asMerchantId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: VerificationActionTypes.VERIFICATIONS_PASSED_REQUEST });
  try {
    const { data }: { data: PassedVerificationsResponse[] } = await client.getVerificationList(identityId, { ...(asMerchantId && { asMerchantId }) });
    dispatch({ type: VerificationActionTypes.VERIFICATIONS_PASSED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: VerificationActionTypes.VERIFICATIONS_PASSED_FAILURE, error });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const verificationListClear = () => async (dispatch: Dispatch) => {
  dispatch({ type: VerificationActionTypes.VERIFICATIONS_PASSED_CLEAR, payload: [] });
};

// TODO @dkchv: !!! duplicated, move abstrat version to product actions
export const verificationProductListInit = (verification: VerificationResponse) => (dispatch, getState) => {
  const registered = selectProductRegistered(getState());
  const activated = registered.filter((item) => {
    const product = productManagerService.getProduct(item);
    if (!product) {
      return false;
    }
    return product.isInVerification(verification);
  });
  const sorted = productManagerService.sortProductTypes(activated);
  dispatch({ type: VerificationActionTypes.VERIFICATION_PRODUCT_LIST_UPDATE, payload: sorted });
};

export const verificationLoad = (verificationId: string, asMerchantId: string) => async (dispatch) => {
  dispatch({ type: VerificationActionTypes.VERIFICATION_REQUEST });
  try {
    const { data }: { data: VerificationResponse } = await client.getVerification(verificationId, { ...(asMerchantId && { asMerchantId }) });
    dispatch(verificationProductListInit(data));
    dispatch({ type: VerificationActionTypes.VERIFICATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: VerificationActionTypes.VERIFICATION_FAILURE, error });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const verificationClear = () => async (dispatch: Dispatch) => {
  dispatch({ type: VerificationActionTypes.VERIFICATION_PRODUCT_LIST_UPDATE, payload: [] });
  dispatch({ type: VerificationActionTypes.VERIFICATION_CLEAR, payload: {} });
};

export const verificationStatusUpdate = (verificationId: string, status: IdentityStatuses) => async (dispatch: Dispatch, getState) => {
  dispatch({ type: types.IDENTITY_UPDATING });
  try {
    // we ignore response here cause returned identity without embed data
    await client.verificationStatusUpdate(verificationId, status);
    const identityModel = selectIdentityModel(getState());

    const updatedIdentity = {
      ...identityModel.value,
      status,
    };
    dispatch({ type: types.IDENTITY_SUCCESS, payload: updatedIdentity });
  } catch (error) {
    dispatch({ type: types.IDENTITY_FAILURE, error });
    if (isInReviewModeError(error)) {
      notification.error(IN_REVIEW_MODE_ERROR, { autoClose: false });
    } else {
      notification.error(ERROR_COMMON);
    }

    throw error;
  }
};
