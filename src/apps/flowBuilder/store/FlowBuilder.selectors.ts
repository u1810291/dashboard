import { Logo } from 'apps/logo/models/Logo.model';
import { selectModelValue } from 'lib/loadable.selectors';
import { IFlow, FlowStyle } from 'models/Flow.model';
import { Loadable } from 'models/Loadable.model';
import { ProductIntegrationTypes, ProductTypes } from 'models/Product.model';
import { createSelector } from 'reselect';
import { FLOW_BUILDER_STORE_KEY, FlowBuilderStore } from './FlowBuilder.store';

export const flowBuilderStore = (state) => state[FLOW_BUILDER_STORE_KEY];

export const selectFlowBuilderSelectedId = createSelector(
  flowBuilderStore,
  (store: FlowBuilderStore): ProductTypes => store.selectedId,
);

export const selectFlowBuilderHaveUnsavedChanges = createSelector(
  flowBuilderStore,
  (store: FlowBuilderStore): boolean => store.haveUnsavedChanges,
);

export const selectFlowBuilderProductsInGraphModel = createSelector(
  flowBuilderStore,
  (store: FlowBuilderStore): Loadable<ProductTypes[]> => store.productsInGraph,
);

export const selectFlowBuilderProductsInGraph = createSelector(
  selectFlowBuilderProductsInGraphModel,
  selectModelValue(),
);

export const selectFlowBuilderChangeableFlowModel = createSelector(
  flowBuilderStore,
  (store: FlowBuilderStore): Loadable<IFlow> => store.changeableFlow,
);

export const selectFlowBuilderChangeableFlow = createSelector(
  selectFlowBuilderChangeableFlowModel,
  selectModelValue(),
);

export const selectFlowBuilderIntegrationType = createSelector(
  selectFlowBuilderChangeableFlow,
  (flow: IFlow): ProductIntegrationTypes => flow.integrationType,
);

export const selectFlowBuilderChangeableFlowStyle = createSelector(
  selectFlowBuilderChangeableFlow,
  (flow: IFlow): FlowStyle => flow.style,
);

export const selectFlowBuilderChangeableLogoUrl = createSelector(
  selectFlowBuilderChangeableFlow,
  (flow: IFlow): Logo => flow.logo,
);
