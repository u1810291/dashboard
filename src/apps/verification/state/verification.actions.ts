import { get } from 'lodash';
import { notification } from 'apps/ui';
import { ERROR_COMMON, IN_REVIEW_MODE_ERROR, isInReviewModeError } from 'models/Error.model';
import * as api from 'lib/client/identities';
import { Dispatch } from 'redux';
import { selectIdentityModel } from '../../../state/identities/identities.selectors';
import { types } from '../../../state/identities/identities.actions';

export const verificationsCollectionLoad = (identityId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: types.VERIFICATIONS_COLLECTION_REQUEST });
  try {
    const { data } = await api.getVerifications(identityId);
    dispatch({
      type: types.VERIFICATIONS_COLLECTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.VERIFICATIONS_COLLECTION_FAILURE,
      error,
    });
    notification.error(ERROR_COMMON);
    throw error;
  }
};
export const verificationLoad = (identityId: string, verificationId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: types.VERIFICATION_REQUEST });
  try {
    const { data } = await api.getOneVerification(identityId, verificationId);
    dispatch({
      type: types.VERIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.VERIFICATION_FAILURE,
      error,
    });
    notification.error(ERROR_COMMON);
    throw error;
  }
};
export const verificationStatusUpdate = (verificationId: string, data) => async (dispatch: Dispatch, getState) => {
  dispatch({ type: types.IDENTITY_UPDATING });
  try {
    // we ignore response here cause returned identity without embed data
    await api.putVerificationStatus(verificationId, data);
    const identityModel = selectIdentityModel(getState());

    const updatedIdentity = {
      ...identityModel.value,
      ...data,
    };
    dispatch({
      type: types.IDENTITY_SUCCESS,
      payload: updatedIdentity,
    });
  } catch (error) {
    dispatch({
      type: types.IDENTITY_FAILURE,
      error,
    });
    if (isInReviewModeError(error)) {
      notification.error(IN_REVIEW_MODE_ERROR, { autoClose: false });
    } else {
      notification.error(ERROR_COMMON);
    }

    throw error;
  }
};
export const verificationDocumentUpdate = (verificationId : string, documentType, fields) => async (dispatch: Dispatch, getState) => {
  dispatch({ type: types.IDENTITY_UPDATING });
  try {
    await api.patchVerificationDocument(verificationId, documentType, fields);
    const identityModel = selectIdentityModel(getState());
    const documents = get(identityModel.value, '_embedded.verification.documents', []);
    const documentIndex = documents.findIndex((item) => item.type === documentType);
    const newDocuments = [...documents];
    newDocuments[documentIndex].fields = { ...newDocuments[documentIndex].fields, ...fields };

    const newIdentity = {
      ...identityModel.value,
      _embedded: {
        ...identityModel.value._embedded,
        verification: {
          ...identityModel.value._embedded.verification,
          documents: newDocuments,
        },
      },
    };

    dispatch({
      type: types.IDENTITY_SUCCESS,
      payload: newIdentity,
    });
  } catch (error) {
    dispatch({
      type: types.IDENTITY_FAILURE,
      error,
    });
    if (isInReviewModeError(error)) {
      notification.error(IN_REVIEW_MODE_ERROR, { autoClose: false });
    } else {
      notification.error(ERROR_COMMON);
    }
    throw error;
  }
};
