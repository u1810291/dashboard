import { IFlow } from 'models/Flow.model';
import { Loadable } from 'models/Loadable.model';
import { ProductTypes } from 'models/Product.model';

export const FLOW_BUILDER_STORE_KEY = 'FlowBuilder';

export enum SliceNameTypes {
  ProductsInGraph = 'productsInGraph',
  ChangeableFlow = 'changeableFlow',
}

export enum FlowBuilderActionGroups {
  ProductsInGraph = 'PRODUCTS_IN_GRAPH',
  ChangeableFlow = 'CHANGEABLE_FLOW',
}

export interface FlowBuilderStore {
  [SliceNameTypes.ProductsInGraph]: Loadable<ProductTypes[]>;
  [SliceNameTypes.ChangeableFlow]: Loadable<IFlow>;
  haveUnsavedChanges: boolean;
  selectedId: ProductTypes;
}
