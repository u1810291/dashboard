import { verificationProductListInit } from 'apps/Product';
import { notification } from 'apps/ui';
import { DocumentTypes } from 'models/Document.model';
import { ErrorMessages, isInReviewModeError } from 'models/Error.model';
import { ProductTypes } from 'models/Product.model';
import { IdentityStatuses } from 'models/Status.model';
import { IStep } from 'models/Step.model';
import { VerificationListItem, VerificationResponse } from 'models/VerificationOld.model';
import { Dispatch } from 'redux';
import { types } from 'state/identities/identities.actions';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { selectIdentityModel } from 'state/identities/identities.selectors';
import * as client from '../client/VerificationOld.client';
import { selectNewVerificationWithExtras, selectVerification } from './VerificationOld.selectors';
import { VerificationActionTypes } from './VerificationOld.store';

export const verificationListLoad = (identityId: string, asMerchantId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: VerificationActionTypes.VERIFICATIONS_PASSED_REQUEST });
  try {
    const { data }: { data: VerificationListItem[] } = await client.getVerificationList(identityId, { ...(asMerchantId && { asMerchantId }) });
    dispatch({ type: VerificationActionTypes.VERIFICATIONS_PASSED_SUCCESS, isReset: true, payload: data });
  } catch (error) {
    dispatch({ type: VerificationActionTypes.VERIFICATIONS_PASSED_FAILURE, error });
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const verificationListClear = () => async (dispatch: Dispatch) => {
  dispatch({ type: VerificationActionTypes.VERIFICATIONS_PASSED_CLEAR, payload: [] });
};

export const verificationLoad = (verificationId: string, asMerchantId: string) => async (dispatch) => {
  dispatch({ type: VerificationActionTypes.VERIFICATION_REQUEST });
  try {
    const { data }: { data: VerificationResponse } = await client.getVerification(verificationId, { ...(asMerchantId && { asMerchantId }) });
    const productList: ProductTypes[] = dispatch(verificationProductListInit(data));
    dispatch({ type: VerificationActionTypes.VERIFICATION_PRODUCT_LIST_UPDATE, payload: productList });
    dispatch({ type: VerificationActionTypes.VERIFICATION_SUCCESS, isReset: true, payload: data });
  } catch (error) {
    dispatch({ type: VerificationActionTypes.VERIFICATION_FAILURE, error });
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const verificationClear = () => async (dispatch: Dispatch) => {
  dispatch({ type: VerificationActionTypes.VERIFICATION_PRODUCT_LIST_UPDATE, payload: [] });
  dispatch({ type: VerificationActionTypes.VERIFICATION_CLEAR, payload: {} });
};

export const verificationStatusUpdate = (verificationId: string, status: IdentityStatuses, agentNote?: string) => async (dispatch: Dispatch, getState) => {
  dispatch({ type: types.IDENTITY_UPDATING });
  try {
    // we ignore response here cause returned identity without embed data
    await client.verificationStatusUpdate(verificationId, status, agentNote);
    const identityModel = selectIdentityModel(getState());

    const updatedIdentity = {
      ...identityModel.value,
      status,
    };
    dispatch({ type: types.IDENTITY_SUCCESS, payload: updatedIdentity });
  } catch (error) {
    dispatch({ type: types.IDENTITY_FAILURE, error });
    if (isInReviewModeError(error)) {
      notification.error(ErrorMessages.IN_REVIEW_MODE_ERROR, { autoClose: false });
    } else {
      notification.error(ErrorMessages.ERROR_COMMON);
    }

    throw error;
  }
};

export const verificationStepsUpdate = <T extends unknown>(stepType: VerificationPatternTypes, step: IStep<T>) => async (dispatch: Dispatch, getState) => {
  const verification = selectVerification(getState());
  const stepIndex = verification?.steps.findIndex((stepElm: IStep<T>) => stepElm.id === step.id);
  verification.steps[stepIndex] = { ...verification.steps[stepIndex], ...step };

  dispatch({ type: VerificationActionTypes.VERIFICATION_SUCCESS, payload: verification });
};

export const verificationDocumentStepsUpdate = <T extends unknown>(documentType: DocumentTypes, step: IStep<T>) => async (dispatch: Dispatch, getState) => {
  const verification = selectNewVerificationWithExtras(getState());
  const document = verification.documents.find((documentElm) => documentElm.type === documentType);
  const stepIndex = document?.steps.findIndex((stepElm) => stepElm.id === step.id);
  document.steps[stepIndex] = { ...document.steps[stepIndex], ...step };

  dispatch({ type: VerificationActionTypes.VERIFICATION_SUCCESS, payload: verification });
};

export const verificationDocumentUpdate = (verificationId: string, documentType, fields) => async (dispatch: Dispatch, getState) => {
  dispatch({ type: VerificationActionTypes.VERIFICATION_UPDATING });
  try {
    await client.patchVerificationDocument(verificationId, documentType, fields);
    const verification = selectVerification(getState());
    const documents = verification.documents;
    const documentIndex = documents.findIndex((item) => item.type === documentType);
    const newDocuments = [...documents];
    newDocuments[documentIndex].fields = { ...newDocuments[documentIndex].fields, ...fields };

    const newVerificaiton = {
      ...verification,
      documents: newDocuments,
    };

    dispatch({ type: VerificationActionTypes.VERIFICATION_SUCCESS, isReset: true, payload: newVerificaiton });
  } catch (error) {
    dispatch({ type: VerificationActionTypes.VERIFICATION_FAILURE, error });
    throw error;
  }
};
