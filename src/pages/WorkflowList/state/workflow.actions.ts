import { createTypesSequence, TypesSequence } from 'state/store.utils';
import { getWebhooks } from 'state/webhooks/webhooks.actions';
import * as api from '../api/workflows.api';
import { CreateWorkflowPayload } from '../api/workflows.api';
import { selectWorkflowsModel } from './workflow.selectors';
import { WorkflowActionGroups } from './workflow.store';

export const types: TypesSequence = {
  ...createTypesSequence(WorkflowActionGroups.Workflow),
  CURRENT_WORKFLOW_UPDATE: 'CURRENT_WORKFLOW_UPDATE',
};

export const updateCurrentFlowId = (id: string) => (dispatch) => {
  dispatch({ type: types.CURRENT_WORKFLOW_UPDATE, payload: id });
  dispatch(getWebhooks());
};

export const workflowsLoad = (asMerchantId: string) => async (dispatch) => {
  dispatch({ type: types.WORKFLOWS_REQUEST });
  try {
    const { data: { workflows } } = await api.getWorkflows({ ...(asMerchantId && { asMerchantId }) });
    if (Array.isArray(workflows) && workflows.length > 0 && workflows[0].id) {
      dispatch(updateCurrentFlowId(workflows[0].id));
      dispatch({ type: types.WORKFLOWS_SUCCESS, payload: workflows });
    } else {
      const error = new Error('Wrong data received from server');
      dispatch({ type: types.WORKFLOWS_FAILURE, error });
      throw error;
    }
  } catch (error) {
    dispatch({ type: types.WORKFLOWS_FAILURE, error });
    throw error;
  }
};

export const createWorkflow = (payload: CreateWorkflowPayload) => async (dispatch, getState) => {
  dispatch({ type: types.WORKFLOWS_REQUEST });
  try {
    const { value } = selectWorkflowsModel(getState());
    const { data: { workflow } } = await api.createWorkflow(payload);
    dispatch({ type: types.WORKFLOWS_SUCCESS, payload: [...value, workflow], isReset: true });
    return workflow;
  } catch (error) {
    dispatch({ type: types.WORKFLOWS_FAILURE, error });
    throw error;
  }
};

export const deleteWorkflow = (id: string) => async (dispatch, getState) => {
  dispatch({ type: types.WORKFLOWS_REQUEST });
  try {
    const { value } = selectWorkflowsModel(getState());
    const index = value.findIndex((flow) => flow.id === id);
    await api.deleteWorkflow(id);
    const payload = value.filter((_, i) => i !== index);
    dispatch({ type: types.WORKFLOWS_SUCCESS, payload, isReset: true });
  } catch (error) {
    dispatch({ type: types.WORKFLOWS_FAILURE, error });
    throw error;
  }
};
