import { notification } from 'apps/ui';
import * as api from 'lib/client/identities';
import { ERROR_COMMON, IN_REVIEW_MODE_ERROR, isInReviewModeError } from 'models/Error.model';
import { Dispatch } from 'redux';
import { VerificationActionTypes } from 'apps/Verification/state/Verification.store';
import { selectVerification } from 'apps/Verification';

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
      notification.error(IN_REVIEW_MODE_ERROR, { autoClose: false });
    } else {
      notification.error(ERROR_COMMON);
    }
    throw error;
  }
};
