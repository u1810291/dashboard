import { IWorkflow } from 'models/Workflow.model';
import { createSelector } from 'reselect';
import { selectModelValue } from 'lib/loadable.selectors';
import { WORKFLOW_STORE_KEY, SliceNameTypes, WorkflowStore } from './workflow.store';

export const selectWorkflowsStore = (store: {WORKFLOW_STORE_KEY: WorkflowStore}): WorkflowStore => store[WORKFLOW_STORE_KEY];

export const selectWorkflowsModel = createSelector(
  selectWorkflowsStore,
  (workflow) => workflow[SliceNameTypes.Workflows],
);

export const selectWorkflowList = createSelector(
  selectWorkflowsModel,
  (model): IWorkflow[] => model.value || [],
);

export const selectCurrentFlowId = createSelector(
  selectWorkflowsStore,
  (store) => store.currentFlow,
);

export const selectCurrentWorkflow = createSelector<[typeof selectWorkflowsModel, typeof selectCurrentFlowId], IWorkflow>(
  selectWorkflowsModel,
  selectCurrentFlowId,
  selectModelValue((model, id) => model.find((item) => item.id === id)),
);
