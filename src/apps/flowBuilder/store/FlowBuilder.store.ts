import { IFlow } from 'models/Flow.model';
import { Loadable } from 'models/Loadable.model';
import { ProductTypes } from 'models/Product.model';

export const FLOW_BUILDER_STORE_KEY = 'FlowBuilder';

export enum SliceNames {
  ProductsInGraph = 'productsInGraph',
  ChangeableFlow = 'changeableFlow',
}

export enum FlowBuilderActionGroups {
  ProductsInGraph = 'PRODUCTS_IN_GRAPH',
  ChangeableFlow = 'CHANGEABLE_FLOW',
}

export interface FlowBuilderStore {
  [SliceNames.ProductsInGraph]: Loadable<ProductTypes[]>;
  [SliceNames.ChangeableFlow]: Loadable<IFlow>;
  haveUnsavedChanges: boolean;
  selectedId: ProductTypes;
}
