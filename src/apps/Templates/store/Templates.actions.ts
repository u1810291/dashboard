import { selectFlowBuilderChangeableFlow } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { flowBuilderProductListInit, types as flowBuilderTypes } from 'apps/flowBuilder/store/FlowBuilder.action';
import { selectCurrentTemplateModelValue } from 'apps/Templates/store/Templates.selectors';
import { types } from './Templates.store';
import { createTemplateRequest, getMetadataRequest, getTemplateRequest, updateTemplateRequest } from '../api/Templates.client';

export const clearCurrentTemplate = () => ({ type: types.GET_TEMPLATE_CLEAR, payload: null });

export const prepareTemplateToEdit = () => (dispatch, getState) => {
  const template = selectCurrentTemplateModelValue(getState());
  dispatch({ type: flowBuilderTypes.CHANGEABLE_FLOW_SUCCESS, payload: template.flow });
  dispatch(flowBuilderProductListInit(template.flow));
};

export const getMetadata = () => async (dispatch) => {
  dispatch({ type: types.GET_METADATA_LIST_UPDATING });

  try {
    const response = await getMetadataRequest();
    dispatch({ type: types.GET_METADATA_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GET_METADATA_LIST_FAILURE, error });
    throw error;
  }
};

export const createTemplate = (title, name, description, metadata) => async (dispatch, getState) => {
  dispatch({ type: types.CREATE_TEMPLATE_UPDATING });
  try {
    const flow = selectFlowBuilderChangeableFlow(getState());
    const { data } = await createTemplateRequest(title, description, metadata, { ...flow, name });
    dispatch({ type: types.CREATE_TEMPLATE_SUCCESS, payload: data });
    dispatch({ type: flowBuilderTypes.HAVE_UNSAVED_CHANGES_UPDATE, payload: false });
  } catch (error) {
    dispatch({ type: types.CREATE_TEMPLATE_FAILURE, error });
    throw error;
  }
};

export const updateTemplate = () => async (dispatch, getState) => {
  dispatch({ type: types.UPDATE_TEMPLATE_UPDATING });

  try {
    const state = getState();
    const flow = selectFlowBuilderChangeableFlow(state);
    const { _id } = selectCurrentTemplateModelValue(state);
    const { data } = await updateTemplateRequest({ id: _id, flow });
    dispatch({ type: flowBuilderTypes.HAVE_UNSAVED_CHANGES_UPDATE, payload: false });
    dispatch({ type: flowBuilderTypes.CHANGEABLE_FLOW_SUCCESS, payload: data.flow });
    dispatch({ type: types.UPDATE_TEMPLATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.UPDATE_TEMPLATE_FAILURE, error });
    throw error;
  }
};

export const getTemplate = (id: string) => async (dispatch) => {
  dispatch({ type: types.GET_TEMPLATE_UPDATING });
  try {
    const { data } = await getTemplateRequest(id);
    dispatch({ type: types.GET_TEMPLATE_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: types.GET_TEMPLATE_FAILURE, error });
    throw error;
  }
};
