import { createSelector } from 'reselect';
import { ProductBoardSliceTypes, ProductBoardStore, PRODUCT_BOARD_STORE_KEY } from './ProductBoard.store';

export const productBoardStore = (state): ProductBoardStore => state[PRODUCT_BOARD_STORE_KEY];

export const selectProductBoardToken = createSelector(
  productBoardStore,
  (store: ProductBoardStore): string => store[ProductBoardSliceTypes.ProductBoard]?.value?.token,
);
