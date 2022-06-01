import { selectModelValue } from 'lib/loadable.selectors';
import { Loadable } from 'models/Loadable.model';
import { ProductTypes } from 'models/Product.model';
import { createSelector } from 'reselect';
import { IFlowStyle, IWorkflow, IWorkflowResponse } from 'models/Workflow.model';
import { GDPRSettings } from 'models/GDPR.model';
import { Webhook } from 'models/Webhook.model';
import { LogoUrl } from 'apps/logo';
import { SliceNameTypes, WORKFLOW_BUILDER_STORE_KEY, WorkflowBuilderStore } from './WorkflowBuilder.store';

export const workFlowBuilderStore = (state: {WORKFLOW_BUILDER_STORE_KEY: WorkflowBuilderStore}): WorkflowBuilderStore => state[WORKFLOW_BUILDER_STORE_KEY];

export const selectWorkflowBuilderHaveUnsavedChanges = createSelector<[typeof workFlowBuilderStore], boolean>(
  workFlowBuilderStore,
  (store: WorkflowBuilderStore): boolean => store.haveUnsavedChanges,
);

export const selectWorkflowBuilderProductsInGraphModel = createSelector<[typeof workFlowBuilderStore], Loadable<ProductTypes[]>>(
  workFlowBuilderStore,
  (store: WorkflowBuilderStore): Loadable<ProductTypes[]> => store.productsInGraph,
);

export const selectWorkflowBuilderProductsInGraph = createSelector<[typeof selectWorkflowBuilderProductsInGraphModel], ProductTypes[]>(
  selectWorkflowBuilderProductsInGraphModel,
  selectModelValue(),
);

export const selectWorkflowBuilderChangeableFlowModel = createSelector<[typeof workFlowBuilderStore], Loadable<IWorkflow>>(
  workFlowBuilderStore,
  (store: WorkflowBuilderStore): Loadable<IWorkflow> => store[SliceNameTypes.ChangeableWorkflow],
);

export const selectWorkflowBuilderChangeableFlow = createSelector<[typeof selectWorkflowBuilderChangeableFlowModel], IWorkflow>(
  selectWorkflowBuilderChangeableFlowModel,
  selectModelValue(),
);

export const selectWorkflowBuilderChangeableFlowStyle = createSelector<[typeof selectWorkflowBuilderChangeableFlow], IFlowStyle >(
  selectWorkflowBuilderChangeableFlow,
  (flow: IWorkflow): IFlowStyle => flow.workflowSetting.style,
);

export const selectWorkflowBuilderChangeableLogoUrl = createSelector<[typeof selectWorkflowBuilderChangeableFlow], null | string>(
  selectWorkflowBuilderChangeableFlow,
  (flow: IWorkflow): LogoUrl => flow.workflowSetting.logoUrl,
);

export const selectWorkflowBuilderSelectedId = createSelector<[typeof workFlowBuilderStore], ProductTypes>(
  workFlowBuilderStore,
  (store: WorkflowBuilderStore): ProductTypes => store.selectedId,
);

export const selectWorkflowBuilderLoadedWorkflowModel = createSelector<[typeof workFlowBuilderStore], Loadable<IWorkflowResponse>>(
  workFlowBuilderStore,
  (store: WorkflowBuilderStore) => store[SliceNameTypes.LoadedWorkflow],
);

export const selectWorkflowBuilderLoadedWorkflow = createSelector<[typeof selectWorkflowBuilderLoadedWorkflowModel], IWorkflowResponse>(
  selectWorkflowBuilderLoadedWorkflowModel,
  selectModelValue(),
);

export const selectWorkflowPolicyInterval = createSelector<[typeof selectWorkflowBuilderChangeableFlow], GDPRSettings>(
  selectWorkflowBuilderChangeableFlow,
  (flow) => flow.workflowSetting.gdprSetting,
);

export const selectWebhookChangeableWorkflow = createSelector<[typeof selectWorkflowBuilderChangeableFlow], Webhook>(
  selectWorkflowBuilderChangeableFlow,
  (flow) => flow.workflowSetting.webhook,
);
