import { LogoUrls } from 'apps/logo';
import { selectModelValue } from 'lib/loadable.selectors';
import { IFlow } from 'models/Flow.model';
import { Loadable } from 'models/Loadable.model';
import { ProductIntegrationTypes, ProductTypes } from 'models/Product.model';
import { createSelector } from 'reselect';
import { IFlowStyle } from 'models/Workflow.model';
import { FLOW_BUILDER_STORE_KEY, FlowBuilderStore } from './FlowBuilder.store';

export const flowBuilderStore = (state: {FLOW_BUILDER_STORE_KEY: FlowBuilderStore}): FlowBuilderStore => state[FLOW_BUILDER_STORE_KEY];

export const selectFlowBuilderSelectedId = createSelector<[typeof flowBuilderStore], ProductTypes>(
  flowBuilderStore,
  (store: FlowBuilderStore) => store.selectedId,
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

export const selectFlowBuilderChangeableFlowModel = createSelector<[typeof flowBuilderStore], Loadable<IFlow>>(
  flowBuilderStore,
  (store: FlowBuilderStore): Loadable<IFlow> => store.changeableFlow,
);

export const selectFlowBuilderChangeableFlow = createSelector<[typeof selectFlowBuilderChangeableFlowModel], IFlow>(
  selectFlowBuilderChangeableFlowModel,
  selectModelValue(),
);

export const selectFlowBuilderIntegrationType = createSelector(
  selectFlowBuilderChangeableFlow,
  (flow: IFlow): ProductIntegrationTypes => flow.integrationType,
);

export const selectFlowBuilderChangeableFlowStyle = createSelector(
  selectFlowBuilderChangeableFlow,
  (flow: IFlow): IFlowStyle => flow.style,
);

export const selectFlowBuilderChangeableLogoUrl = createSelector(
  selectFlowBuilderChangeableFlow,
  (flow: IFlow): LogoUrls => flow.logo,
);
