import { Loadable } from 'lib/Loadable.adapter';
import { selectModelValue } from 'lib/loadable.selectors';
import { ProductTypes } from 'models/Product.model';
import { createSelector } from 'reselect';
import { selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { FLOW_BUILDER_STORE_KEY, FlowBuilderStore } from './FlowBuilder.store';

export const flowBuilderStore = (state) => state[FLOW_BUILDER_STORE_KEY];

export const selectFlowBuilderSelectedId = createSelector(
  flowBuilderStore,
  // TODO @dkchv: !!! type
  (store: FlowBuilderStore): ProductTypes => store.selectedId,
);

export const selectFlowBuilderFlowId = createSelector(
  flowBuilderStore,
  (store) => store.selectedFlowId,
);

export const selectFlowBuilderFlowSelected = createSelector(
  selectMerchantFlowsModel,
  selectFlowBuilderFlowId,
  selectModelValue((model, id) => model.find((item) => item.id === id)),
);

export const selectFlowBuilderProductsInGraphModel = createSelector(
  flowBuilderStore,
  // TODO @dkchv: !!! type
  (store: FlowBuilderStore): Loadable<ProductTypes[]> => store.productsInGraph,
);

export const selectFlowBuilderChangeableFlowModel = createSelector(
  flowBuilderStore,
  // TODO @dkchv: !!! type
  (store: FlowBuilderStore): any => store.changeableFlow,
);

export const selectFlowBuilderChangeableFlow = createSelector(
  selectFlowBuilderChangeableFlowModel,
  selectModelValue(),
);
