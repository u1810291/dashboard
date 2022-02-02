import { selectFlowBuilderChangeableFlow } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { types } from './Templates.store';
import { createTemplateRequest, getMetadataRequest } from '../api/Templates.client';

export const createEmptyFlow = () => (dispatch) => {
  dispatch({ type: types.CREATE_EMPTY_FLOW });
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
    const response = await createTemplateRequest(title, description, metadata, { ...flow, name });
    dispatch({ type: types.CREATE_TEMPLATE_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: types.CREATE_TEMPLATE_FAILURE, error });
    throw error;
  }
};
