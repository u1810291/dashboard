import { IFlow } from 'models/Flow.model';
import { Loadable } from 'models/Loadable.model';
import { ProductTypes } from 'models/Product.model';

export const WORKFLOW_BUILDER_STORE_KEY = 'WorkflowBuilder';

export enum SliceNames {
  ProductsInGraph = 'productsInGraph',
  ChangeableFlow = 'changeableFlow',
}

export enum WorkFlowBuilderActionGroups {
  ProductsInGraph = 'PRODUCTS_IN_GRAPH',
  ChangeableFlow = 'CHANGEABLE_FLOW',
}

export interface WorkflowBuilderStore {
  [SliceNames.ProductsInGraph]: Loadable<ProductTypes[]>;
  [SliceNames.ChangeableFlow]: Loadable<IFlow>;
  haveUnsavedChanges: boolean;
  selectedId: ProductTypes;
}
