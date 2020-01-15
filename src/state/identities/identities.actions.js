import { notification } from 'components/notification';
import * as api from 'lib/client/identities';
import { ERROR_COMMON } from 'lib/error.model';
import { selectAuthToken } from 'state/auth/auth.selectors';
import { selectIdentity } from 'state/identities/identities.selectors';
import { createTypesSequence } from 'state/utils';
import { get } from 'lodash';

export const types = {
  ...createTypesSequence('IDENTITY_LIST'),
  ...createTypesSequence('IDENTITY_COUNT'),
  ...createTypesSequence('IDENTITY_FETCH'),
  ...createTypesSequence('IDENTITY_PATCH'),
  ...createTypesSequence('IDENTITY_DELETE'),
  ...createTypesSequence('IDENTITY_DOCUMENTS_LIST'),
  ...createTypesSequence('DOCUMENT_PATCH'),
  ...createTypesSequence('IDENTITY_LIST_COUNT'),
  ...createTypesSequence('IDENTITY_LIST_DOWNLOAD'),
};

export const getIdentities = (params) => async (dispatch, getState) => {
  dispatch({ type: types.IDENTITY_LIST_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const { data } = await api.getIdentities(token, params);
    const payload = (data || []).map((item) => item.identity);
    dispatch({ type: types.IDENTITY_LIST_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.IDENTITY_LIST_FAILURE });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const getIdentitiesFile = (params) => async (dispatch, getState) => {
  dispatch({ type: types.IDENTITY_LIST_DOWNLOAD_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.getIdentitiesFile(token, params);
    dispatch({ type: types.IDENTITY_LIST_DOWNLOAD_SUCCESS });
    return payload;
  } catch (error) {
    dispatch({ type: types.IDENTITY_LIST_DOWNLOAD_FAILURE });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const getIdentitiesCount = (params) => async (dispatch, getState) => {
  dispatch({ type: types.IDENTITY_COUNT_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.getIdentitiesCount(token, params);
    dispatch({ type: types.IDENTITY_COUNT_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.IDENTITY_COUNT_FAILURE });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const getIdentityWithNestedData = (id) => async (dispatch, getState) => {
  dispatch({ type: types.IDENTITY_FETCH_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.getIdentityWithNestedData(token, id);
    dispatch({ type: types.IDENTITY_FETCH_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.IDENTITY_FETCH_FAILURE });
    throw error;
  }
};

export const getDemoVerification = (id) => async (dispatch, getState) => {
  dispatch({ type: types.IDENTITY_FETCH_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.getVerificationData(token, id);
    dispatch({ type: types.IDENTITY_FETCH_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.IDENTITY_FETCH_FAILURE });
    throw error;
  }
};

export const patchIdentity = (id, data) => async (dispatch, getState) => {
  dispatch({ type: types.IDENTITY_PATCH_REQUEST });
  try {
    const state = getState();
    const token = selectAuthToken(state);
    // we ignore response here cause returned identity without embed data
    await api.patchIdentity(token, id, data);
    const identity = selectIdentity(id)(state);

    const updatedIdentity = {
      ...identity,
      ...data,
    };

    dispatch({ type: types.IDENTITY_PATCH_SUCCESS, payload: updatedIdentity });
  } catch (error) {
    dispatch({ type: types.IDENTITY_PATCH_FAILURE });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const deleteIdentity = (id) => async (dispatch, getState) => {
  dispatch({ type: types.IDENTITY_DELETE_REQUEST, payload: { id } });
  try {
    const token = selectAuthToken(getState());
    await api.deleteIdentity(token, id);
    dispatch({ type: types.IDENTITY_DELETE_SUCCESS, payload: { id } });
    return { payload: { id } };
  } catch (error) {
    dispatch({ type: types.IDENTITY_DELETE_FAILURE, payload: { id } });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const patchDocument = (identityId, id, fields) => async (dispatch, getState) => {
  const payload = { identityId, id, fields };
  dispatch({ type: types.DOCUMENT_PATCH_REQUEST, payload });
  try {
    const token = selectAuthToken(getState());
    const response = await api.patchDocument(token, id, fields);

    const identity = selectIdentity(identityId)(getState());
    const documents = get(identity, '_embedded.documents', []);
    const documentIndex = documents.findIndex((item) => item.id === id);
    const newDocuments = [...documents];
    newDocuments.splice(documentIndex, 1, response.data);
    const newIdentity = {
      ...identity,
      _embedded: {
        ...identity._embedded,
        documents: newDocuments,
      },
    };
    dispatch({ type: types.DOCUMENT_PATCH_SUCCESS, identityId, payload: newIdentity });
  } catch (error) {
    dispatch({ type: types.DOCUMENT_PATCH_FAILURE });
    notification.error(ERROR_COMMON);
    throw error;
  }
};
