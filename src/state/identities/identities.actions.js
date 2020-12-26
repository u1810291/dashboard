import { notification } from 'apps/ui';
import * as api from 'lib/client/identities';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { get } from 'lodash';
import { ERROR_COMMON } from 'models/Error.model';
import { filterSerialize } from 'models/Filter.model';
import { createTypesSequence } from 'state/utils';
import { IdentityStatuses } from '../../models/Identity.model';
import { selectFilteredCountModel, selectIdentityFilterSerialized, selectIdentityModel } from './identities.selectors';
import { IdentityActionGroups } from './identities.store';

export const types = {
  ...createTypesSequence('IDENTITY_PATCH'),
  ...createTypesSequence('IDENTITY_DOCUMENTS_LIST'),
  ...createTypesSequence('DOCUMENT_PATCH'),

  ...createTypesSequence(IdentityActionGroups.Identity),
  ...createTypesSequence(IdentityActionGroups.IdentityList),
  ...createTypesSequence(IdentityActionGroups.IdentityRemove),
  ...createTypesSequence(IdentityActionGroups.IdentityCount),
  ...createTypesSequence(IdentityActionGroups.FilteredCount),
  ...createTypesSequence(IdentityActionGroups.PreliminaryFilteredCount),
  ...createTypesSequence(IdentityActionGroups.ManualReviewCount),
  FILTER_UPDATE: 'identities/FILTER_UPDATE',
  IDENTITY_REMOVE: 'IDENTITY_REMOVE',
  SET_PDF_GENERATING: 'SET_PDF_GENERATING',
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

export const downloadCSV = () => async (dispatch, getState) => {
  try {
    const filter = selectIdentityFilterSerialized(getState());
    return await api.downloadCSV({
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

export const identityLoad = (id, isReload) => async (dispatch) => {
  dispatch({ type: isReload ? types.IDENTITY_UPDATING : types.IDENTITY_REQUEST });
  try {
    const payload = await api.getIdentityWithNestedData(id);
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

export const identityUpdate = (id, data) => async (dispatch, getState) => {
  dispatch({ type: types.IDENTITY_UPDATING });
  try {
    // we ignore response here cause returned identity without embed data
    await api.patchIdentity(id, data);
    const identityModel = selectIdentityModel(getState());

    const updatedIdentity = {
      ...identityModel.value,
      ...data,
    };
    dispatch({ type: types.IDENTITY_SUCCESS, payload: updatedIdentity });
  } catch (error) {
    dispatch({ type: types.IDENTITY_FAILURE, error });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const documentUpdate = (id, fields) => async (dispatch, getState) => {
  dispatch({ type: types.IDENTITY_UPDATING });
  try {
    const { data } = await api.patchDocument(id, fields);
    const identityModel = selectIdentityModel(getState());
    const documents = get(identityModel.value, '_embedded.documents', []);
    const documentIndex = documents.findIndex((item) => item.id === id);
    const newDocuments = [...documents];
    newDocuments.splice(documentIndex, 1, data);
    const newIdentity = {
      ...identityModel.value,
      _embedded: {
        ...identityModel.value._embedded,
        documents: newDocuments,
      },
    };
    dispatch({ type: types.IDENTITY_SUCCESS, payload: newIdentity });
  } catch (error) {
    dispatch({ type: types.IDENTITY_FAILURE, error });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const setPDFGenerating = (flag) => ({ type: types.SET_PDF_GENERATING, payload: flag });
