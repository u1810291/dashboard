import { notification } from 'apps/ui';
import * as api from 'lib/client/identities';
import { getIdentityProfile } from 'lib/client/identities';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { ERROR_COMMON } from 'models/Error.model';
import { filterSerialize } from 'models/Filter.model';
import { IdentityStatuses } from 'models/Status.model';
import { createTypesSequence } from 'state/store.utils';
import { selectFilteredCountModel, selectIdentityFilterSerialized } from './identities.selectors';
import { IdentityActionGroups } from './identities.store';

export const types: any = {
  ...createTypesSequence('IDENTITY_PATCH'),
  ...createTypesSequence('IDENTITY_DOCUMENTS_LIST'),
  ...createTypesSequence('DOCUMENT_PATCH'),

  ...createTypesSequence(IdentityActionGroups.Identity),
  ...createTypesSequence(IdentityActionGroups.IdentityProfile),
  ...createTypesSequence(IdentityActionGroups.IdentityList),
  ...createTypesSequence(IdentityActionGroups.IdentityRemove),
  ...createTypesSequence(IdentityActionGroups.IdentityCount),
  ...createTypesSequence(IdentityActionGroups.FilteredCount),
  ...createTypesSequence(IdentityActionGroups.PreliminaryFilteredCount),
  ...createTypesSequence(IdentityActionGroups.ManualReviewCount),
  ...createTypesSequence(IdentityActionGroups.VerificationsCollection),
  ...createTypesSequence(IdentityActionGroups.Verification),

  FILTER_UPDATE: 'identities/FILTER_UPDATE',
  IDENTITY_REMOVE: 'IDENTITY_REMOVE',
  SET_PDF_GENERATING: 'SET_PDF_GENERATING',
  PDF_DOWNLOADED: 'PDF_DOWNLOADED',
};

export const identitiesListLoad = (isReload, offset) => async (dispatch, getState) => {
  dispatch({ type: isReload ? types.IDENTITY_LIST_REQUEST : types.IDENTITY_LIST_UPDATING });
  try {
    const filter = selectIdentityFilterSerialized(getState());
    const { data } = await api.getIdentities({ ...filter, ...offset });
    const payload = (data || []).map((item) => item.identity);
    dispatch({ type: types.IDENTITY_LIST_SUCCESS, payload, isReset: isReload });
  } catch (error) {
    dispatch({ type: types.IDENTITY_LIST_FAILURE, error });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

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
    notification.error(ERROR_COMMON);
    throw error;
  }
};

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
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const identitiesFilteredCountLoad = () => async (dispatch, getState) => {
  dispatch({ type: types.FILTERED_COUNT_UPDATING });
  try {
    const filter = selectIdentityFilterSerialized(getState());
    const { data } = await api.getIdentitiesCount(filter);
    dispatch({
      type: types.FILTERED_COUNT_SUCCESS,
      payload: data.count || 0,
    });
  } catch (error) {
    dispatch({
      type: types.FILTERED_COUNT_FAILURE,
      error,
    });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

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
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const identityProfileLoad = (identityId) => async (dispatch) => {
  dispatch({ type: types.IDENTITY_PROFILE_REQUEST });
  try {
    const { data } = await getIdentityProfile(identityId);
    dispatch({ type: types.IDENTITY_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.IDENTITY_PROFILE_FAILURE, error });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const downloadCSV = () => (dispatch, getState) => {
  try {
    const filter = selectIdentityFilterSerialized(getState());
    return api.downloadCSV({
      // TODO @dkchv: review again, do we need filter here?
      ...filter,
      format: 'csv',
    });
  } catch (error) {
    notification.error(ERROR_COMMON);
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
    notification.error(ERROR_COMMON);
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
  dispatch({ type: types.IDENTITY_LIST_CLEAR });
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
