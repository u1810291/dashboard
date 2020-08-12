import { notification } from 'components/notification';
import * as api from 'lib/client/collaborators';
import { ERROR_COMMON } from 'models/Error.model';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { createTypesSequence } from 'state/utils';
import { CollaboratorActionGroups } from './collaborator.store';

export const types = {
  ...createTypesSequence(CollaboratorActionGroups.CollaboratorList),
};

export const collaboratorListLoad = () => async (dispatch, getState) => {
  dispatch({ type: types.COLLABORATOR_LIST_REQUEST });
  try {
    const merchantId = selectMerchantId(getState());
    const { data } = await api.getCollaborators(merchantId);
    dispatch({ type: types.COLLABORATOR_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.COLLABORATOR_LIST_FAILURE, error });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const collaboratorUpdate = (id, updateData) => async (dispatch, getState) => {
  dispatch({ type: types.COLLABORATOR_LIST_UPDATING });
  try {
    const merchantId = selectMerchantId(getState());
    const { data } = await api.patchCollaborators(merchantId, id, updateData);
    dispatch({ type: types.COLLABORATOR_LIST_SUCCESS, isReset: true, payload: data });
  } catch (error) {
    dispatch({ type: types.COLLABORATOR_LIST_FAILURE, error });
    notification.error((error && error.response && error.response.data.message)
      || 'Something went wrong. Please retry');
    throw error;
  }
};

export const collaboratorRemove = (id) => async (dispatch, getState) => {
  dispatch({ type: types.COLLABORATOR_LIST_UPDATING });
  try {
    const state = getState();
    const merchantId = selectMerchantId(state);
    const { data } = await api.deleteCollaborators(merchantId, id);
    dispatch({ type: types.COLLABORATOR_LIST_SUCCESS, isReset: true, payload: data });
  } catch (error) {
    dispatch({ type: types.COLLABORATOR_LIST_FAILURE, error });
    notification.error((error && error.response && error.response.data.message)
      || 'Something went wrong. Please retry');
    throw error;
  }
};

export const collaboratorAdd = (collaborator) => async (dispatch, getState) => {
  dispatch({ type: types.COLLABORATOR_LIST_UPDATING });
  try {
    const merchantId = selectMerchantId(getState());
    const { data } = await api.postCollaborators(merchantId, collaborator);
    dispatch({ type: types.COLLABORATOR_LIST_SUCCESS, isReset: true, payload: data });
  } catch (error) {
    dispatch({ type: types.COLLABORATOR_LIST_FAILURE, error });
    notification.error((error && error.response && error.response.data.message)
      || 'Something went wrong. Please retry');
    throw error;
  }
};
