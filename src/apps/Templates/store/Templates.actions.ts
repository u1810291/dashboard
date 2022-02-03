import { selectFlowBuilderChangeableFlow } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { types } from './Templates.store';
import { createTemplateRequest, getMetadataRequest, getTemplateRequest } from '../api/Templates.client';

export const clearCurrentTemplate = () => ({ type: types.GET_TEMPLATE_CLEAR, payload: null });

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
  } catch (error) {
    dispatch({ type: types.CREATE_TEMPLATE_FAILURE, error });
    throw error;
  }
};

export const getTemplate = (id) => async (dispatch) => {
  dispatch({ type: types.GET_TEMPLATE_UPDATING });
  try {
    const { data } = await getTemplateRequest(id);
    dispatch({ type: types.GET_TEMPLATE_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: types.GET_TEMPLATE_FAILURE, error });
    return null;
  }
};
