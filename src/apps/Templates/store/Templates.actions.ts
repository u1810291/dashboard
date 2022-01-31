import { selectFlowBuilderChangeableFlow } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { types } from './Templates.store';
import { createTemplate as createTemplateRequest } from '../api/Templates.client';


export const createEmptyFlow = () => (dispatch) => {
  dispatch({ type: types.CREATE_EMPTY_FLOW });
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
