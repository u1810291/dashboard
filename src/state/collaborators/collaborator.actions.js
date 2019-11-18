import { notification } from 'components/notification';
import * as api from 'lib/client/collaborators';
import { selectAuthToken } from 'state/auth/auth.selectors';
import { createTypesSequence } from 'state/utils';

export const types = {
  ...createTypesSequence('COLLABORATORS_GET'),
  ...createTypesSequence('COLLABORATORS_POST'),
  ...createTypesSequence('COLLABORATORS_PATCH'),
  ...createTypesSequence('COLLABORATORS_DELETE'),
};

export const getCollaborators = (merchantId) => async (dispatch, getState) => {
  try {
    const token = selectAuthToken(getState());
    const payload = await api.getCollaborators(token, merchantId);
    dispatch({ type: types.COLLABORATORS_GET_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.COLLABORATORS_GET_FAILURE });
    notification.error((error && error.response && error.response.data.message)
      || 'Something went wrong. Please retry');
    throw error;
  }
};

export const postCollaborators = (merchantId, data) => async (dispatch, getState) => {
  dispatch({ type: types.COLLABORATORS_POST_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.postCollaborators(token, merchantId, data);
    dispatch({ type: types.COLLABORATORS_POST_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.COLLABORATORS_POST_FAILURE });
    notification.error((error && error.response && error.response.data.message)
      || 'Something went wrong. Please retry');
    throw error;
  }
};

export const patchCollaborators = (merchantId, id, data) => async (dispatch, getState) => {
  dispatch({ type: types.COLLABORATORS_PATCH_REQUEST, id });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.patchCollaborators(token, merchantId, id, data);
    dispatch({ type: types.COLLABORATORS_PATCH_SUCCESS, payload, id });
    return payload;
  } catch (error) {
    dispatch({ type: types.COLLABORATORS_PATCH_FAILURE });
    notification.error((error && error.response && error.response.data.message)
      || 'Something went wrong. Please retry');
    throw error;
  }
};

export const deleteCollaborators = (merchantId, id) => async (dispatch, getState) => {
  dispatch({ type: types.COLLABORATORS_DELETE_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.deleteCollaborators(token, merchantId, id);
    dispatch({ type: types.COLLABORATORS_DELETE_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.COLLABORATORS_DELETE_FAILURE });
    notification.error((error && error.response && error.response.data.message)
      || 'Something went wrong. Please retry');
    throw error;
  }
};
