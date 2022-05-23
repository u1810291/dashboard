import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { types } from './FlowBuilder.action';
import { FlowBuilderActionGroups, FlowBuilderStore, SliceNameTypes } from './FlowBuilder.store';

const initialState: FlowBuilderStore = {
  [SliceNameTypes.ProductsInGraph]: LoadableAdapter.createState([]),
  [SliceNameTypes.ChangeableFlow]: LoadableAdapter.createState({}),
  selectedId: null,
  haveUnsavedChanges: false,
};

export const flowBuilderReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(FlowBuilderActionGroups.ChangeableFlow, SliceNameTypes.ChangeableFlow),
  ...LoadableAdapter.createHandlers(FlowBuilderActionGroups.ProductsInGraph, SliceNameTypes.ProductsInGraph),
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
});
