import { createSelector } from 'reselect';
import { IProductCard, ProductTypes } from 'models/Product.model';
import { productManagerService } from '../services/ProductManager.service';
import { PRODUCT_STORE_KEY, ProductStore } from './Product.store';

export const selectProductStore = (state) => state[PRODUCT_STORE_KEY];

export const selectProductIsInited = createSelector(
  selectProductStore,
  (store: ProductStore): boolean => store.isInited,
);

export const selectProductRegistered = createSelector(
  selectProductStore,
  (store: ProductStore): ProductTypes[] => store.registered || [],
);

export const selectProductCards = createSelector(
  selectProductRegistered,
  (): IProductCard[] => productManagerService.getProductsAllOrdered().map((item) => item.getCard()),
);
