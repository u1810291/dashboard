import { verificationProductListInit } from 'apps/Product';
import { notification } from 'apps/ui';
import { isObjectEmpty } from 'lib/object';
import { ErrorMessages, isInReviewModeError } from 'models/Error.model';
import { ProductTypes } from 'models/Product.model';
import { IdentityStatuses } from 'models/Status.model';
import { DocumentTypes } from 'models/Document.model';
import { storeAction } from 'state/store.utils';
import * as api from '../api/reviewMode.client';
import { selectReviewVerificationId, selectVerification, selectVerificationModel } from './reviewMode.selectors';
import { ReviewModeActionTypes } from './reviewMode.store';

const reviewVerificationRequest = storeAction<null>(ReviewModeActionTypes.REVIEW_VERIFICATION_REQUEST);
const clearReviewVerification = storeAction<null>(ReviewModeActionTypes.REVIEW_VERIFICATION_CLEAR);
const reviewVerificationSuccess = storeAction<any>(ReviewModeActionTypes.REVIEW_VERIFICATION_SUCCESS);
const reviewLoadingNext = storeAction<boolean>(ReviewModeActionTypes.REVIEW_LOADING_NEXT);
const reviewVerificationFailure = storeAction<any>(ReviewModeActionTypes.REVIEW_VERIFICATION_FAILURE);
const reviewVerificationUpdating = storeAction<null>(ReviewModeActionTypes.REVIEW_VERIFICATION_UPDATING);
const reviewAwaitingCountRequest = storeAction<null>(ReviewModeActionTypes.REVIEW_AWAITING_COUNT_REQUEST);
const reviewAwaitingCountSuccess = storeAction<number>(ReviewModeActionTypes.REVIEW_AWAITING_COUNT_SUCCESS);
const reviewAwaitingCountFailure = storeAction<any>(ReviewModeActionTypes.REVIEW_AWAITING_COUNT_FAILURE);
const verificationProductListUpdate = storeAction<ProductTypes[]>(ReviewModeActionTypes.VERIFICATION_PRODUCT_LIST_UPDATE);

export const reviewVerificationClear = () => (dispatch) => {
  dispatch(clearReviewVerification(null));
};

export const verificationLoad = () => async (dispatch, getState) => {
  const verification = selectVerificationModel(getState());
  dispatch(reviewVerificationRequest(null));
  try {
    const { data } = await api.getVerification();

    if (isObjectEmpty(data) && !isObjectEmpty(verification?.value)) {
      dispatch(reviewVerificationClear());
    } else {
      dispatch(reviewVerificationSuccess(data));
      const productList: ProductTypes[] = dispatch(verificationProductListInit(data));
      dispatch(verificationProductListUpdate(productList));
    }
    dispatch(reviewLoadingNext(false));

    if (notification.isActive(ReviewModeActionTypes.REVIEW_VERIFICATION_FAILURE)) {
      notification.dismiss(ReviewModeActionTypes.REVIEW_VERIFICATION_FAILURE);
    }
  } catch (error) {
    dispatch(reviewVerificationFailure(error));
    notification.error(ErrorMessages.ERROR_COMMON, { toastId: ReviewModeActionTypes.REVIEW_VERIFICATION_FAILURE, autoClose: false });
    throw error;
  }
};

export const verificationSkip = () => async (dispatch, getState) => {
  dispatch(reviewLoadingNext(true));
  const id = selectReviewVerificationId(getState());
  try {
    await api.requestSkipVerification(id);
  } catch (error) {
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const verificationStatusChange = (status: IdentityStatuses) => async (dispatch, getState) => {
  dispatch(reviewVerificationUpdating(null));
  dispatch(reviewLoadingNext(true));
  const id = selectReviewVerificationId(getState());
  const verification = selectVerificationModel(getState())?.value;
  try {
    await api.putVerificationStatus(id, status);
    dispatch(reviewVerificationSuccess({ ...verification, isStatusSet: true }));
  } catch (error) {
    dispatch(reviewVerificationFailure(error));
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const reviewAwaitingCountLoad = () => async (dispatch) => {
  dispatch(reviewAwaitingCountRequest(null));
  try {
    const { data } = await api.getAwaitingReviewCount();
    dispatch(reviewAwaitingCountSuccess(data?.countAwaitingVerifications || 0));
  } catch (error) {
    dispatch(reviewAwaitingCountFailure(error));
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const reviewPatchDocumentFields = (verificationId: string, documentType: DocumentTypes, fields: any) => async (dispatch, getState) => {
  dispatch(reviewVerificationUpdating(null));
  try {
    await api.patchDocumentReviewMode(verificationId, documentType, fields);
    const verification = selectVerification(getState());
    const documents = verification?.documents || [];
    const documentIndex = documents.findIndex((item) => item.type === documentType);
    const newDocuments = [...documents];
    newDocuments[documentIndex].fields = { ...newDocuments[documentIndex].fields, ...fields };

    const newVerification = {
      ...verification,
      documents: newDocuments,
    };

    dispatch(reviewVerificationSuccess(newVerification));
  } catch (error) {
    dispatch(reviewVerificationFailure(error));
    if (isInReviewModeError(error)) {
      notification.error(ErrorMessages.IN_REVIEW_MODE_ERROR, { autoClose: false });
    } else {
      notification.error(ErrorMessages.ERROR_COMMON);
    }
    throw error;
  }
};
