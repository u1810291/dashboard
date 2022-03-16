import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { types } from 'apps/WorkflowBuilder/store/WorkflowBuilder.action';
import { WorkFlowBuilderActionGroups, WorkflowBuilderStore, SliceNames } from './WorkflowBuilder.store';

const initialState: WorkflowBuilderStore = {
  [SliceNames.ProductsInGraph]: LoadableAdapter.createState([]),
  [SliceNames.ChangeableFlow]: LoadableAdapter.createState({}),
  selectedId: null,
  haveUnsavedChanges: false,
};

export const workflowBuilderReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(WorkFlowBuilderActionGroups.ChangeableFlow, SliceNames.ChangeableFlow),
  ...LoadableAdapter.createHandlers(WorkFlowBuilderActionGroups.ProductsInGraph, SliceNames.ProductsInGraph),
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
