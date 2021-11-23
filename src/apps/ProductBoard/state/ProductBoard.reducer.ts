import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { ProductBoardActionGroup, ProductBoardSliceTypes, ProductBoardStore } from './ProductBoard.store';

const initialState: ProductBoardStore = {
  [ProductBoardSliceTypes.ProductBoard]: LoadableAdapter.createState(null),
};

export const productBoardReducer = createReducer(initialState, LoadableAdapter.createHandlers(ProductBoardActionGroup.productBoardToken, ProductBoardSliceTypes.ProductBoard));
