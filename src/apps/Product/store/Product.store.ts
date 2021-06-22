import { ProductTypes } from 'models/Product.model';

export const PRODUCT_STORE_KEY = 'Product';

export interface ProductStore {
  isInited: boolean;
  registered: ProductTypes[];
}

export enum ProductActionTypes {
  ProductRegistered = 'ProductRegistered',
  ProductIsInitedUpdate = 'ProductIsInitedUpdate',
}
