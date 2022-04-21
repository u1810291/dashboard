import { Loadable } from 'models/Loadable.model';
import { ProductTypes } from 'models/Product.model';
import { IWorkflow, IWorkflowResponse } from 'models/Workflow.model';

export const WORKFLOW_BUILDER_STORE_KEY = 'WorkflowBuilder';

export enum SliceNames {
  ProductsInGraph = 'productsInGraph',
  ChangeableWorkflow = 'changeableWorkflow',
  LoadedWorkflow = 'loadedWorkflow'
}

export enum WorkFlowBuilderActionGroups {
  ProductsInGraph = 'PRODUCTS_IN_GRAPH',
  ChangeableWorkflow = 'CHANGEABLE_WORKFLOW',
  LoadedWorkflow = 'LOADED_WORKFLOW',
}

export interface WorkflowBuilderStore {
  [SliceNames.ProductsInGraph]: Loadable<ProductTypes[]>;
  [SliceNames.ChangeableWorkflow]: Loadable<IWorkflow>;
  [SliceNames.LoadedWorkflow]: Loadable<IWorkflowResponse>;
  haveUnsavedChanges: boolean;
  selectedId: ProductTypes;
}
