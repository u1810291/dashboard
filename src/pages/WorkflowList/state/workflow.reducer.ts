import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { types } from './workflow.actions';
import { WorkflowActionGroups, SliceNames, WorkflowStore } from './workflow.store';

const initialState: WorkflowStore = {
  [SliceNames.Workflows]: LoadableAdapter.createState([
    // see IWorkflow
  ]),
  currentFlow: null,
};

export default createReducer(initialState, {
  ...LoadableAdapter.createHandlers(WorkflowActionGroups.Workflow, SliceNames.Workflows),

  [types.CURRENT_WORKFLOW_UPDATE](state, { payload }) {
    return {
      ...state,
      currentFlow: payload,
    };
  },
});
