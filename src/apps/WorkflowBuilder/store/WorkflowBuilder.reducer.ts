import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { types } from 'apps/WorkflowBuilder/store/WorkflowBuilder.action';
import { IWorkflow, IWorkflowResponse } from 'models/Workflow.model';
import { WorkFlowBuilderActionGroups, WorkflowBuilderStore, SliceNames } from './WorkflowBuilder.store';

const initialState: WorkflowBuilderStore = {
  [SliceNames.ProductsInGraph]: LoadableAdapter.createState([]),
  [SliceNames.ChangeableWorkflow]: LoadableAdapter.createState({} as IWorkflow),
  [SliceNames.LoadedWorkflow]: LoadableAdapter.createState({} as IWorkflowResponse),
  selectedId: null,
  haveUnsavedChanges: false,
};

export const workflowBuilderReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(WorkFlowBuilderActionGroups.ChangeableWorkflow, SliceNames.ChangeableWorkflow),
  ...LoadableAdapter.createHandlers(WorkFlowBuilderActionGroups.ProductsInGraph, SliceNames.ProductsInGraph),
  ...LoadableAdapter.createHandlers(WorkFlowBuilderActionGroups.LoadedWorkflow, SliceNames.LoadedWorkflow),
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
