import { Logo } from 'apps/logo/models/Logo.model';
import { selectModelValue } from 'lib/loadable.selectors';
import { IFlow, FlowStyle } from 'models/Flow.model';
import { Loadable } from 'models/Loadable.model';
import { ProductIntegrationTypes, ProductTypes } from 'models/Product.model';
import { createSelector } from 'reselect';
import { WORKFLOW_BUILDER_STORE_KEY, WorkflowBuilderStore } from './WorkflowBuilder.store';

export const workFlowBuilderStore = (state) => state[WORKFLOW_BUILDER_STORE_KEY];

export const selectWorkflowBuilderSelectedId = createSelector(
  workFlowBuilderStore,
  (store: WorkflowBuilderStore): ProductTypes => store.selectedId,
);

export const selectWorkflowBuilderHaveUnsavedChanges = createSelector(
  workFlowBuilderStore,
  (store: WorkflowBuilderStore): boolean => store.haveUnsavedChanges,
);

export const selectWorkflowBuilderProductsInGraphModel = createSelector(
  workFlowBuilderStore,
  (store: WorkflowBuilderStore): Loadable<ProductTypes[]> => store.productsInGraph,
);

export const selectWorkflowBuilderProductsInGraph = createSelector(
  selectWorkflowBuilderProductsInGraphModel,
  selectModelValue(),
);

export const selectWorkflowBuilderChangeableFlowModel = createSelector<any, any, Loadable<IFlow>>(
  workFlowBuilderStore,
  (store: WorkflowBuilderStore): Loadable<IFlow> => store.changeableFlow,
);

export const selectWorkflowBuilderChangeableFlow = createSelector<any, any, IFlow>(
  selectWorkflowBuilderChangeableFlowModel,
  selectModelValue(),
);

export const selectWorkflowBuilderIntegrationType = createSelector(
  selectWorkflowBuilderChangeableFlow,
  (flow: IFlow): ProductIntegrationTypes => flow.integrationType,
);

export const selectWorkflowBuilderChangeableFlowStyle = createSelector(
  selectWorkflowBuilderChangeableFlow,
  (flow: IFlow): FlowStyle => flow.style,
);

export const selectWorkflowBuilderChangeableLogoUrl = createSelector(
  selectWorkflowBuilderChangeableFlow,
  (flow: IFlow): Logo => flow.logo,
);
