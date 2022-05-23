import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { types } from 'apps/WorkflowBuilder/store/WorkflowBuilder.action';
import { IWorkflow, IWorkflowResponse } from 'models/Workflow.model';
import { WorkFlowBuilderActionGroups, WorkflowBuilderStore, SliceNameTypes } from './WorkflowBuilder.store';

const initialState: WorkflowBuilderStore = {
  [SliceNameTypes.ProductsInGraph]: LoadableAdapter.createState([]),
  [SliceNameTypes.ChangeableWorkflow]: LoadableAdapter.createState({} as IWorkflow),
  [SliceNameTypes.LoadedWorkflow]: LoadableAdapter.createState({} as IWorkflowResponse),
  selectedId: null,
  haveUnsavedChanges: false,
};

export const workflowBuilderReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(WorkFlowBuilderActionGroups.ChangeableWorkflow, SliceNameTypes.ChangeableWorkflow),
  ...LoadableAdapter.createHandlers(WorkFlowBuilderActionGroups.ProductsInGraph, SliceNameTypes.ProductsInGraph),
  ...LoadableAdapter.createHandlers(WorkFlowBuilderActionGroups.LoadedWorkflow, SliceNameTypes.LoadedWorkflow),
  [types.PRODUCT_SELECT](state: WorkflowBuilderStore, { payload }) {
    return {
      ...state,
      selectedId: payload,
    };
  },
  [types.HAVE_UNSAVED_CHANGES_UPDATE](state: WorkflowBuilderStore, { payload }) {
    return {
      ...state,
      haveUnsavedChanges: payload,
    };
  },
});
