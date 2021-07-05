import { IProductCard, ProductTypes } from 'models/Product.model';
import { createSelector } from 'reselect';
import { selectFlowBuilderChangeableFlow } from 'apps/flowBuilder/store/FlowBuilder.selectors';
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
  selectFlowBuilderChangeableFlow,
  selectProductRegistered,
  (): IProductCard[] => productManagerService.getProductsConfigurable().map((item) => item.getCard()),
);
