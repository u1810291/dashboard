import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { types as templateTypes } from 'apps/Templates/store/Templates.store';
import { createEmptyFlow } from 'models/Flow.model';
import { types } from './FlowBuilder.action';
import { FlowBuilderActionGroups, FlowBuilderStore, SliceNames } from './FlowBuilder.store';

const initialState: FlowBuilderStore = {
  [SliceNames.ProductsInGraph]: LoadableAdapter.createState([]),
  [SliceNames.ChangeableFlow]: LoadableAdapter.createState({}),
  selectedId: null,
  haveUnsavedChanges: false,
};

export const flowBuilderReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(FlowBuilderActionGroups.ChangeableFlow, SliceNames.ChangeableFlow),
  ...LoadableAdapter.createHandlers(FlowBuilderActionGroups.ProductsInGraph, SliceNames.ProductsInGraph),
  [types.PRODUCT_SELECT](state: FlowBuilderStore, { payload }) {
    return {
      ...state,
      selectedId: payload,
    };
  },
  [types.HAVE_UNSAVED_CHANGES_UPDATE](state: FlowBuilderStore, { payload }) {
    return {
      ...state,
      haveUnsavedChanges: payload,
    };
  },
  [templateTypes.CREATE_EMPTY_FLOW](state: FlowBuilderStore) {
    return {
      ...state,
      changeableFlow: {
        ...state.changeableFlow,
        isLoaded: true,
        value: createEmptyFlow(),
      },
    };
  },
});
