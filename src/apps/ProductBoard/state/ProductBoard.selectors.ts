import { createSelector } from 'reselect';
import { Loadable } from 'models/Loadable.model';
import { selectModelValue } from 'lib/loadable.selectors';
import { ProductBoardSliceTypes, ProductBoardStore, PRODUCT_BOARD_STORE_KEY } from './ProductBoard.store';

export const productBoardStore = (state: {PRODUCT_BOARD_STORE_KEY: ProductBoardStore}): ProductBoardStore => state[PRODUCT_BOARD_STORE_KEY];

export const selectProductBoardModel = createSelector<[typeof productBoardStore], Loadable<{token: string}>>(
  productBoardStore,
  (store) => store[ProductBoardSliceTypes.ProductBoard],
);

export const selectProductBoardModelValue = createSelector<[typeof selectProductBoardModel], string>(
  selectProductBoardModel,
  selectModelValue((model) => model?.token),
);
