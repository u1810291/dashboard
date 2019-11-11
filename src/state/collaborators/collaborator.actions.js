import { notification } from 'components/notification';
import client from 'lib/client';
import { createTypesSequence } from 'state/utils';

export const types = {
  ...createTypesSequence('COLLABORATORS_GET'),
  ...createTypesSequence('COLLABORATORS_POST'),
  ...createTypesSequence('COLLABORATORS_PATCH'),
  ...createTypesSequence('COLLABORATORS_DELETE'),
};

export function getCollaborators(token, merchantId) {
  return function handle(dispatch) {
    return client.collaborators
      .getCollaborators(token, merchantId)
      .then((payload) => {
        dispatch({ type: types.COLLABORATORS_GET_SUCCESS, payload });
        return payload;
      })
      .catch((error) => {
        dispatch({ type: types.COLLABORATORS_GET_FAILURE });
        notification.error((error && error.response && error.response.data.message)
          || 'Something went wrong. Please retry');
        throw error;
      });
  };
}


export const postCollaborators = (token, merchantId, data) => (dispatch) => {
  dispatch({ type: types.COLLABORATORS_POST_REQUEST });
  return client.collaborators.postCollaborators(token, merchantId, data)
    .then((payload) => {
      dispatch({ type: types.COLLABORATORS_POST_SUCCESS, payload });
      return payload;
    })
    .catch((error) => {
      dispatch({ type: types.COLLABORATORS_POST_FAILURE });
      notification.error((error && error.response && error.response.data.message)
        || 'Something went wrong. Please retry');
      throw error;
    });
};

export const patchCollaborators = (token, merchantId, id, data) => (dispatch) => {
  dispatch({ type: types.COLLABORATORS_PATCH_REQUEST, id });
  return client.collaborators.patchCollaborators(token, merchantId, id, data)
    .then((payload) => {
      dispatch({ type: types.COLLABORATORS_PATCH_SUCCESS, payload, id });
      return payload;
    })
    .catch((error) => {
      dispatch({ type: types.COLLABORATORS_PATCH_FAILURE });
      notification.error((error && error.response && error.response.data.message)
        || 'Something went wrong. Please retry');
      throw error;
    });
};

export const deleteCollaborators = (token, merchantId, id) => (dispatch) => {
  dispatch({ type: types.COLLABORATORS_DELETE_REQUEST });
  return client.collaborators.deleteCollaborators(token, merchantId, id)
    .then((payload) => {
      dispatch({ type: types.COLLABORATORS_DELETE_SUCCESS, payload });
      return payload;
    })
    .catch((error) => {
      dispatch({ type: types.COLLABORATORS_DELETE_FAILURE });
      notification.error((error && error.response && error.response.data.message)
        || 'Something went wrong. Please retry');
      throw error;
    });
};
