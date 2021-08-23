import { notification } from 'apps/ui';
import * as api from 'lib/client/identities';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { get } from 'lodash';
import { ErrorMessages, isInReviewModeError } from 'models/Error.model';
import { filterSerialize } from 'models/Filter.model';
import { REDUCE_DB_COUNT_CALLS } from 'models/Release.model';
import { IdentityStatuses } from 'models/Status.model';
import { Dispatch } from 'redux';
import { createTypesSequence, TypesSequence } from '../store.utils';
import { selectFilteredCountModel, selectIdentityFilterSerialized, selectIdentityModel } from './identities.selectors';
import { IdentityActionGroups } from './identities.store';

export const types: TypesSequence = {
  ...createTypesSequence('IDENTITY_PATCH'),
  ...createTypesSequence('IDENTITY_DOCUMENTS_LIST'),
  ...createTypesSequence('DOCUMENT_PATCH'),

  ...createTypesSequence(IdentityActionGroups.Identity),
  ...createTypesSequence(IdentityActionGroups.IdentityList),
  ...createTypesSequence(IdentityActionGroups.IdentityCount),
  ...createTypesSequence(IdentityActionGroups.FilteredCount),
  ...createTypesSequence(IdentityActionGroups.PreliminaryFilteredCount),
  ...createTypesSequence(IdentityActionGroups.ManualReviewCount),

  FILTER_UPDATE: 'identities/FILTER_UPDATE',
  IDENTITY_REMOVE: 'IDENTITY_REMOVE',
  SET_PDF_GENERATING: 'SET_PDF_GENERATING',
  PDF_DOWNLOADED: 'PDF_DOWNLOADED',
};

export const verificationsListLoad = (isReload: boolean, params?: { offset: number; asMerchantId: string }) => async (dispatch, getState) => {
  dispatch({ type: isReload ? types.IDENTITY_LIST_REQUEST : types.IDENTITY_LIST_UPDATING });
  try {
    const filter = selectIdentityFilterSerialized(getState());
    const { data } = await api.getVerifications({ ...filter, ...params });
    dispatch({ type: types.IDENTITY_LIST_SUCCESS, payload: data || [], isReset: isReload });
  } catch (error) {
    dispatch({ type: types.IDENTITY_LIST_FAILURE, error });
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 */
export const identitiesListLoad = (isReload, offset) => async (dispatch, getState) => {
  dispatch({ type: isReload ? types.IDENTITY_LIST_REQUEST : types.IDENTITY_LIST_UPDATING });
  try {
    const filter = selectIdentityFilterSerialized(getState());
    const { data } = await api.getIdentities({ ...filter, ...offset });
    const payload = (data || []).map((item) => item.identity);
    dispatch({ type: types.IDENTITY_LIST_SUCCESS, payload, isReset: isReload });
  } catch (error) {
    dispatch({ type: types.IDENTITY_LIST_FAILURE, error });
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const verificationsManualReviewCountLoad = () => async (dispatch) => {
  dispatch({ type: types.MANUAL_REVIEW_COUNT_UPDATING });
  try {
    const filter = { status: IdentityStatuses.reviewNeeded };
    const apiCall = REDUCE_DB_COUNT_CALLS ? api.getIdentitiesCount : api.getVerificationsCount;
    const { data } = await apiCall(filter);
    dispatch({
      type: types.MANUAL_REVIEW_COUNT_SUCCESS,
      payload: data?.count ?? data ?? 0,
    });
  } catch (error) {
    dispatch({
      type: types.MANUAL_REVIEW_COUNT_FAILURE,
      error,
    });
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 */
export const identitiesManualReviewCountLoad = () => async (dispatch) => {
  dispatch({ type: types.MANUAL_REVIEW_COUNT_UPDATING });
  try {
    const filter = { status: IdentityStatuses.reviewNeeded };
    const { data } = await api.getIdentitiesCount(filter);
    dispatch({
      type: types.MANUAL_REVIEW_COUNT_SUCCESS,
      payload: data.count || 0,
    });
  } catch (error) {
    dispatch({
      type: types.MANUAL_REVIEW_COUNT_FAILURE,
      error,
    });
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 */
export const identitiesCountLoad = () => async (dispatch, getState) => {
  // always updating here, cause pushing new collection
  dispatch({ type: types.IDENTITY_COUNT_UPDATING });
  try {
    const { data } = await api.getIdentitiesCount();
    dispatch({ type: types.IDENTITY_COUNT_SUCCESS, payload: data.count || 0 });
    // update filter count
    const filteredCount = selectFilteredCountModel(getState());
    if (LoadableAdapter.isPristine(filteredCount)) {
      dispatch({ type: types.FILTERED_COUNT_SUCCESS, payload: data.count || 0 });
    }
  } catch (error) {
    dispatch({ type: types.IDENTITY_COUNT_FAILURE, error });
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const verificationsFilteredCountLoad = () => async (dispatch, getState) => {
  dispatch({ type: types.FILTERED_COUNT_UPDATING });
  try {
    const filter = selectIdentityFilterSerialized(getState());
    const apiCall = REDUCE_DB_COUNT_CALLS ? api.getIdentitiesCount : api.getVerificationsCount;
    const { data } = await apiCall(filter);
    dispatch({
      type: types.FILTERED_COUNT_SUCCESS,
      payload: data?.count ?? data ?? 0,
    });
  } catch (error) {
    dispatch({
      type: types.FILTERED_COUNT_FAILURE,
      error,
    });
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 */
export const identitiesFilteredCountLoad = () => async (dispatch, getState) => {
  dispatch({ type: types.FILTERED_COUNT_UPDATING });
  try {
    const filter = selectIdentityFilterSerialized(getState());
    const { data } = await api.getIdentitiesCount(filter);
    dispatch({
      type: types.FILTERED_COUNT_SUCCESS,
      payload: data?.count ?? data ?? 0,
    });
  } catch (error) {
    dispatch({
      type: types.FILTERED_COUNT_FAILURE,
      error,
    });
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const verificationsPreliminaryCountLoad = (localFilter) => async (dispatch, getState) => {
  dispatch({ type: types.PRELIMINARY_FILTERED_COUNT_UPDATING });
  try {
    const filter = localFilter ? filterSerialize(localFilter) : selectIdentityFilterSerialized(getState());
    const { data } = await api.getVerificationsCount(filter);
    dispatch({
      type: types.PRELIMINARY_FILTERED_COUNT_SUCCESS,
      payload: data || 0,
    });
  } catch (error) {
    dispatch({
      type: types.PRELIMINARY_FILTERED_COUNT_FAILURE,
      error,
    });
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 */
export const identitiesPreliminaryCountLoad = (localFilter) => async (dispatch, getState) => {
  dispatch({ type: types.PRELIMINARY_FILTERED_COUNT_UPDATING });
  try {
    const filter = localFilter ? filterSerialize(localFilter) : selectIdentityFilterSerialized(getState());
    const { data } = await api.getIdentitiesCount(filter);
    dispatch({
      type: types.PRELIMINARY_FILTERED_COUNT_SUCCESS,
      payload: data.count || 0,
    });
  } catch (error) {
    dispatch({
      type: types.PRELIMINARY_FILTERED_COUNT_FAILURE,
      error,
    });
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const downloadVerificationCSV = () => async (dispatch, getState) => {
  try {
    const filter = selectIdentityFilterSerialized(getState());
    return api.downloadVerificationCSV({
      // TODO @dkchv: review again, do we need filter here?
      ...filter,
      format: 'csv',
    });
  } catch (error) {
    notification.error(ErrorMessages.ERROR_COMMON);
    return null;
  }
};

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 */
export const downloadCSV = () => (dispatch, getState) => {
  try {
    const filter = selectIdentityFilterSerialized(getState());
    return api.downloadCSV({
      // TODO @dkchv: review again, do we need filter here?
      ...filter,
      format: 'csv',
    });
  } catch (error) {
    notification.error(ErrorMessages.ERROR_COMMON);
    return null;
  }
};

export const filterUpdate = (data) => (dispatch) => {
  dispatch({ type: types.FILTER_UPDATE, payload: data });
};

export const identityRemove = (id) => async (dispatch) => {
  try {
    await api.deleteIdentity(id);
    dispatch({ type: types.IDENTITY_REMOVE, payload: id });
  } catch (error) {
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

// identity

export const identityLoad = (id, isReload, asMerchantId) => async (dispatch) => {
  dispatch({ type: isReload ? types.IDENTITY_UPDATING : types.IDENTITY_REQUEST });
  try {
    const payload = await api.getIdentityWithNestedData(id, { ...(asMerchantId && { asMerchantId }) });
    dispatch({ type: types.IDENTITY_SUCCESS, payload, isReset: true });
  } catch (error) {
    dispatch({ type: types.IDENTITY_FAILURE, error });
    throw error;
  }
};

export const identityClear = () => (dispatch) => {
  dispatch({ type: types.IDENTITY_CLEAR });
};

export const identityListClear = () => (dispatch) => {
  dispatch({ type: types.IDENTITY_LIST_CLEAR, payload: [] });
};

export const identityDemoLoad = (id) => async (dispatch) => {
  dispatch({ type: types.IDENTITY_REQUEST });
  try {
    const payload = await api.getVerificationData(id);
    dispatch({ type: types.IDENTITY_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: types.IDENTITY_FAILURE, error });
    throw error;
  }
};

export const setPDFGenerating = (flag) => ({ type: types.SET_PDF_GENERATING, payload: flag });

export const pdfDownloaded = (identityId, verificationId) => async (dispatch) => {
  await api.postPdfDownloaded(identityId, verificationId);
  dispatch({ type: types.PDF_DOWNLOADED });
};

export const verificationDocumentUpdate = (verificationId: string, documentType, fields) => async (dispatch: Dispatch, getState) => {
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
      notification.error(ErrorMessages.IN_REVIEW_MODE_ERROR, { autoClose: false });
    } else {
      notification.error(ErrorMessages.ERROR_COMMON);
    }
    throw error;
  }
};
