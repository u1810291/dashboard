import { notification } from 'apps/ui';
import * as client from 'apps/Verification/client/Verification.client';
import * as api from 'lib/client/identities';
import { ErrorMessages, isInReviewModeError } from 'models/Error.model';
import { Dispatch } from 'redux';
import { VerificationActionTypes } from 'apps/Verification/state/Verification.store';
import { selectVerification } from 'apps/Verification';
import { selectIdentityCollection } from 'state/identities/identities.selectors';
import { types as IdentityTypes } from '../identities/identities.actions';

export const newVerificationDocumentUpdate = (verificationId: string, documentType, fields) => async (dispatch: Dispatch, getState) => {
  dispatch({ type: VerificationActionTypes.VERIFICATION_UPDATING });
  try {
    await api.patchVerificationDocument(verificationId, documentType, fields);
    const verification = selectVerification(getState());
    const documents = verification?.documents || [];
    const documentIndex = documents.findIndex((item) => item.type === documentType);
    const newDocuments = [...documents];
    newDocuments[documentIndex].fields = { ...newDocuments[documentIndex].fields, ...fields };

    const newVerification = {
      ...verification,
      documents: newDocuments,
    };

    dispatch({
      type: VerificationActionTypes.VERIFICATION_SUCCESS,
      payload: newVerification,
    });
  } catch (error) {
    dispatch({
      type: VerificationActionTypes.VERIFICATION_FAILURE,
      error,
    });
    if (isInReviewModeError(error)) {
      notification.error(ErrorMessages.IN_REVIEW_MODE_ERROR, { autoClose: false });
    } else {
      notification.error(ErrorMessages.ERROR_COMMON);
    }
    throw error;
  }
};

export const verificationRemove = (verificationId: string) => async (dispatch: Dispatch, getState) => {
  try {
    await client.deleteVerification(verificationId);
    const state = selectIdentityCollection(getState());
    const verifications = state.value.filter(({ _id }) => _id !== verificationId);
    dispatch({ type: IdentityTypes.IDENTITY_LIST_SUCCESS, payload: verifications, isReset: true });
  } catch (error) {
    dispatch({ type: IdentityTypes.IDENTITY_LIST_FAILURE, error });
    console.error('identity remove error', error);
    throw error;
  }
};
