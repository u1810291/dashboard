import { notification } from 'apps/ui';
import { isObjectEmpty } from 'lib/object';
import { ERROR_COMMON } from 'models/Error.model';
import { getAwaitingReviewCount, getVerification, patchVerificationDocument, putVerificationStatus, requestSkipVerification } from '../api/reviewMode.client';
import { selectReviewVerificationId, selectVerificationModel } from './reviewMode.selectors';
import { types } from './reviewMode.store';

export const verificationLoad = () => async (dispatch, getState) => {
  const verification = selectVerificationModel(getState());
  dispatch({ type: types.REVIEW_VERIFICATION_REQUEST });
  try {
    const { data } = await getVerification();

    if (isObjectEmpty(data) && !isObjectEmpty(verification?.value)) {
      dispatch({ type: types.REVIEW_VERIFICATION_CLEAR });
    } else {
      dispatch({ type: types.REVIEW_VERIFICATION_SUCCESS, payload: data });
    }
    dispatch({ type: types.REVIEW_LOADING_NEXT, payload: false });

    if (notification.isActive(types.REVIEW_VERIFICATION_FAILURE)) {
      notification.dismiss(types.REVIEW_VERIFICATION_FAILURE);
    }
  } catch (error) {
    dispatch({ type: types.REVIEW_VERIFICATION_FAILURE, error });
    notification.error(ERROR_COMMON, { toastId: types.REVIEW_VERIFICATION_FAILURE, autoClose: false });
    throw error;
  }
};

export const verificationSkip = () => async (dispatch, getState) => {
  dispatch({ type: types.REVIEW_LOADING_NEXT, payload: true });
  const id = selectReviewVerificationId(getState());
  try {
    await requestSkipVerification(id);
  } catch (error) {
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const verificationStatusChange = (status) => async (dispatch, getState) => {
  dispatch({ type: types.REVIEW_VERIFICATION_UPDATING });
  dispatch({ type: types.REVIEW_LOADING_NEXT, payload: true });
  const id = selectReviewVerificationId(getState());
  const verification = selectVerificationModel(getState())?.value;
  try {
    await putVerificationStatus(id, { status });
    dispatch({ type: types.REVIEW_VERIFICATION_SUCCESS, payload: { ...verification, isStatusSet: true } });
  } catch (error) {
    dispatch({ type: types.REVIEW_VERIFICATION_FAILURE, error });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const reviewAwaitingCountLoad = () => async (dispatch) => {
  dispatch({ type: types.REVIEW_AWAITING_COUNT_REQUEST });
  try {
    const { data } = await getAwaitingReviewCount();
    dispatch({ type: types.REVIEW_AWAITING_COUNT_SUCCESS, payload: data?.countAwaitingVerifications || 0 });
  } catch (error) {
    dispatch({ type: types.REVIEW_AWAITING_COUNT_FAILURE, error });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const reviewDocumentUpdate = (id, documentType, fields) => async (dispatch, getState) => {
  dispatch({ type: types.REVIEW_VERIFICATION_UPDATING });
  try {
    await patchVerificationDocument(id, documentType, { fields });
    const verificationModel = selectVerificationModel(getState());
    const documents = verificationModel?.value?.documents || [];
    const documentIndex = documents.findIndex((item) => item.type === documentType);
    const newDocuments = [...documents];
    const newDocument = documents[documentIndex];
    newDocument.fields = { ...newDocument?.fields, ...fields };
    newDocuments.splice(documentIndex, 1, newDocument);

    const newVerification = {
      ...verificationModel?.value,
      documents: newDocuments,
    };
    dispatch({ type: types.REVIEW_VERIFICATION_SUCCESS, payload: newVerification });
  } catch (error) {
    dispatch({ type: types.REVIEW_VERIFICATION_FAILURE, error });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const reviewVerificationClear = () => async (dispatch) => {
  dispatch({ type: types.REVIEW_VERIFICATION_CLEAR });
};
