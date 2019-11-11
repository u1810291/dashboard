import { notification } from 'components/notification';
import client from 'lib/client';
import { ERROR_COMMON } from 'lib/error.model';
import { createTypesSequence } from 'state/utils';

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

export function getIdentities(token, params) {
  return function handle(dispatch) {
    dispatch({ type: types.IDENTITY_LIST_REQUEST });
    return client.identities
      .getIdentities(token, params)
      .then((payload) => {
        dispatch({ type: types.IDENTITY_LIST_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.IDENTITY_LIST_FAILURE });
        notification.error(ERROR_COMMON);
        throw error;
      });
  };
}

export function getIdentitiesFile(token, params) {
  return function handle(dispatch) {
    dispatch({ type: types.IDENTITY_LIST_DOWNLOAD_REQUEST });
    return client.identities
      .getIdentitiesFile(token, params)
      .then((payload) => {
        dispatch({ type: types.IDENTITY_LIST_DOWNLOAD_SUCCESS });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.IDENTITY_LIST_DOWNLOAD_FAILURE });
        notification.error(ERROR_COMMON);
        throw error;
      });
  };
}

export function getIdentitiesCount(token, params) {
  return function handle(dispatch) {
    dispatch({ type: types.IDENTITY_COUNT_REQUEST });
    return client.identities
      .getIdentitiesCount(token, params)
      .then((payload) => {
        dispatch({ type: types.IDENTITY_COUNT_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.IDENTITY_COUNT_FAILURE });
        notification.error(ERROR_COMMON);
        throw error;
      });
  };
}

export function getIdentityWithNestedData(token, id) {
  return function handle(dispatch) {
    dispatch({ type: types.IDENTITY_FETCH_REQUEST });
    return client.identities
      .getIdentityWithNestedData(token, id)
      .then((identity) => {
        dispatch({ type: types.IDENTITY_FETCH_SUCCESS, identity });
        return identity;
      })
      .catch((error) => {
        dispatch({ type: types.IDENTITY_FETCH_FAILURE });
        throw error;
      });
  };
}

export function getDemoVerification(token, id) {
  return function handle(dispatch) {
    dispatch({ type: types.IDENTITY_FETCH_REQUEST });
    return client.identities
      .getVerificationData(token, id)
      .then((identity) => {
        dispatch({ type: types.IDENTITY_FETCH_SUCCESS, identity });
        return identity;
      })
      .catch((error) => {
        dispatch({ type: types.IDENTITY_FETCH_FAILURE });
        throw error;
      });
  };
}

export function patchIdentity(token, id, data) {
  return function handle(dispatch) {
    dispatch({ type: types.IDENTITY_PATCH_REQUEST, payload: { id, data } });
    return client.identities
      .patchIdentity(token, id, data)
      .then((payload) => {
        dispatch({ type: types.IDENTITY_PATCH_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.IDENTITY_PATCH_FAILURE });
        notification.error(ERROR_COMMON);
        throw error;
      });
  };
}

export function deleteIdentity(token, id) {
  return function handle(dispatch) {
    dispatch({ type: types.IDENTITY_DELETE_REQUEST, payload: { id } });
    return client.identities
      .deleteIdentity(token, id)
      .then(() => {
        dispatch({ type: types.IDENTITY_DELETE_SUCCESS, payload: { id } });
        return { payload: { id } };
      })
      .catch((error) => {
        dispatch({ type: types.IDENTITY_DELETE_FAILURE, payload: { id } });
        notification.error(ERROR_COMMON);
        throw error;
      });
  };
}

export function patchDocument(token, identityId, id, fields) {
  return function handle(dispatch) {
    dispatch({
      type: types.DOCUMENT_PATCH_REQUEST,
      payload: { identityId, id, fields },
    });
    return client.identities
      .patchDocument(token, id, fields)
      .then((payload) => {
        dispatch({
          type: types.DOCUMENT_PATCH_SUCCESS,
          payload: { identityId, id, fields },
        });
        return payload;
      })
      .catch((error) => {
        dispatch({
          type: types.DOCUMENT_PATCH_FAILURE,
          payload: { identityId, id, fields },
        });
        notification.error(ERROR_COMMON);
        throw error;
      });
  };
}
