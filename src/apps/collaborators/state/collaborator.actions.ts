import { UserId } from 'models/Collaborator.model';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { createTypesSequence } from 'state/store.utils';
import { CollaboratorActionGroups } from './collaborator.store';
import * as api from '../api/collaborators';
import { selectCollaboratorCollection } from './collaborator.selectors';

export const types = {
  ...createTypesSequence(CollaboratorActionGroups.CollaboratorList),
  ...createTypesSequence(CollaboratorActionGroups.Collaborator),
};

export const collaboratorLoad = (id) => async (dispatch, getState) => {
  dispatch({ type: types.COLLABORATOR_REQUEST });
  try {
    const merchantId = selectMerchantId(getState());
    const { data } = await api.getCollaborator(merchantId, id);
    dispatch({ type: types.COLLABORATOR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.COLLABORATOR_FAILURE, error });
    throw error;
  }
};

export const collaboratorClear = () => async (dispatch) => {
  dispatch({ type: types.COLLABORATOR_CLEAR });
};

export const collaboratorListLoad = () => async (dispatch, getState) => {
  dispatch({ type: types.COLLABORATOR_LIST_REQUEST });
  try {
    const merchantId = selectMerchantId(getState());
    const { data } = await api.getCollaborators(merchantId);
    dispatch({ type: types.COLLABORATOR_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.COLLABORATOR_LIST_FAILURE, error });
    throw error;
  }
};

export const collaboratorUpdate = (id, updateData) => async (dispatch, getState) => {
  dispatch({ type: types.COLLABORATOR_UPDATING });
  try {
    const merchantId = selectMerchantId(getState());
    const { data } = await api.patchCollaborators(merchantId, id, updateData);
    const currentUpdatedCollaborator = data.find((collaborator) => collaborator?.user?.id === id);

    dispatch({ type: types.COLLABORATOR_SUCCESS, payload: currentUpdatedCollaborator });
  } catch (error) {
    dispatch({ type: types.COLLABORATOR_FAILURE, error });
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
    throw error;
  }
};

export const userBlock = (userId: UserId) => async (dispatch, getState) => {
  dispatch({ type: types.COLLABORATOR_LIST_UPDATING });
  try {
    const collaborators = selectCollaboratorCollection(getState());
    const { data } = await api.userBlock(userId);
    const newCollaborators = collaborators.map((item) => ((item?.user?.id === data?._id) ? { ...item, user: { ...item?.user, blocked: data?.blocked } } : item));
    dispatch({ type: types.COLLABORATOR_LIST_SUCCESS, isReset: true, payload: newCollaborators });
  } catch (error) {
    dispatch({ type: types.COLLABORATOR_LIST_FAILURE, error });
    throw error;
  }
};

export const userUnblock = (userId: UserId) => async (dispatch, getState) => {
  dispatch({ type: types.COLLABORATOR_LIST_UPDATING });
  try {
    const collaborators = selectCollaboratorCollection(getState());
    const { data } = await api.userUnblock(userId);
    const newCollaborators = collaborators.map((item) => ((item?.user?.id === data?._id) ? { ...item, user: { ...item?.user, blocked: data?.blocked } } : item));
    dispatch({ type: types.COLLABORATOR_LIST_SUCCESS, isReset: true, payload: newCollaborators });
  } catch (error) {
    dispatch({ type: types.COLLABORATOR_LIST_FAILURE, error });
    throw error;
  }
};
