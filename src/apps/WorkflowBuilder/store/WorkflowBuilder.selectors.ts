import { LogoUrl } from 'apps/logo';
import { selectModelValue } from 'lib/loadable.selectors';
import { Loadable } from 'models/Loadable.model';
import { ProductTypes } from 'models/Product.model';
import { createSelector } from 'reselect';
import { FlowStyle, IWorkflow, WorkflowResponse } from 'models/Workflow.model';
import { GDPRSettings } from 'models/GDPR.model';
import { Webhook } from 'models/Webhook.model';
import { SliceNames, WORKFLOW_BUILDER_STORE_KEY, WorkflowBuilderStore } from './WorkflowBuilder.store';

export const workFlowBuilderStore = (state): WorkflowBuilderStore => state[WORKFLOW_BUILDER_STORE_KEY];

export const selectWorkflowBuilderHaveUnsavedChanges = createSelector<any, any, boolean>(
  workFlowBuilderStore,
  (store: WorkflowBuilderStore): boolean => store.haveUnsavedChanges,
);

export const selectWorkflowBuilderProductsInGraphModel = createSelector<any, any, Loadable<ProductTypes[]>>(
  workFlowBuilderStore,
  (store: WorkflowBuilderStore): Loadable<ProductTypes[]> => store.productsInGraph,
);

export const selectWorkflowBuilderProductsInGraph = createSelector<any, any, ProductTypes[]>(
  selectWorkflowBuilderProductsInGraphModel,
  selectModelValue(),
);

export const selectWorkflowBuilderChangeableFlowModel = createSelector<any, any, Loadable<IWorkflow>>(
  workFlowBuilderStore,
  (store: WorkflowBuilderStore): Loadable<IWorkflow> => store[SliceNames.ChangeableWorkflow],
);

export const selectWorkflowBuilderChangeableFlow = createSelector<any, any, IWorkflow>(
  selectWorkflowBuilderChangeableFlowModel,
  selectModelValue(),
);

export const selectWorkflowBuilderChangeableFlowStyle = createSelector<any, any, FlowStyle >(
  selectWorkflowBuilderChangeableFlow,
  (flow: IWorkflow): FlowStyle => flow.workflowSetting.style,
);

export const selectWorkflowBuilderChangeableLogoUrl = createSelector<any, any, null | string>(
  selectWorkflowBuilderChangeableFlow,
  (flow: IWorkflow): LogoUrl => flow.workflowSetting.logoUrl,
);

export const selectWorkflowBuilderSelectedId = createSelector<any, any, ProductTypes>(
  workFlowBuilderStore,
  (store: WorkflowBuilderStore): ProductTypes => store.selectedId,
);

export const selectWorkflowBuilderLoadedWorkflowModel = createSelector<any, any, Loadable<WorkflowResponse>>(
  workFlowBuilderStore,
  (store: WorkflowBuilderStore) => store[SliceNames.LoadedWorkflow],
);

export const selectWorkflowBuilderLoadedWorkflow = createSelector<any, any, WorkflowResponse>(
  selectWorkflowBuilderLoadedWorkflowModel,
  selectModelValue(),
);

export const selectWorkflowPolicyInterval = createSelector<any, any, GDPRSettings>(
  selectWorkflowBuilderChangeableFlow,
  (flow) => flow.workflowSetting.gdprSetting,
);

export const selectWebhookChangeableWorkflow = createSelector<any, any, Webhook>(
  selectWorkflowBuilderChangeableFlow,
  (flow) => flow.workflowSetting.webhook,
);
