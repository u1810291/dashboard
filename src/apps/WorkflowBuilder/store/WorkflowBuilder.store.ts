import { Loadable } from 'models/Loadable.model';
import { ProductTypes } from 'models/Product.model';
import { IWorkflow, IWorkflowResponse } from 'models/Workflow.model';

export const WORKFLOW_BUILDER_STORE_KEY = 'WorkflowBuilder';

export enum SliceNameTypes {
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
  [SliceNameTypes.ProductsInGraph]: Loadable<ProductTypes[]>;
  [SliceNameTypes.ChangeableWorkflow]: Loadable<IWorkflow>;
  [SliceNameTypes.LoadedWorkflow]: Loadable<IWorkflowResponse>;
  haveUnsavedChanges: boolean;
  selectedId: ProductTypes;
}
