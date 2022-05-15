import { IWorkflow } from 'models/Workflow.model';
import { createSelector } from 'reselect';
import { Loadable } from 'models/Loadable.model';
import { selectModelValue } from 'lib/loadable.selectors';
import { WORKFLOW_STORE_KEY, SliceNames } from './workflow.store';

export const selectWorkflowsStore = (store) => store[WORKFLOW_STORE_KEY];

export const selectWorkflowsModel = createSelector(
  selectWorkflowsStore,
  (workflow) => workflow[SliceNames.Workflows],
);

export const selectWorkflowList = createSelector(
  selectWorkflowsModel,
  (model): IWorkflow[] => model.value || [],
);

export const selectCurrentFlowId = createSelector(
  selectWorkflowsStore,
  (store) => store.currentFlow,
);

export const selectCurrentWorkflow = createSelector<any, Loadable<any>, any, IWorkflow>(
  selectWorkflowsModel,
  selectCurrentFlowId,
  selectModelValue((model, id) => model.find((item) => item.id === id)),
);
