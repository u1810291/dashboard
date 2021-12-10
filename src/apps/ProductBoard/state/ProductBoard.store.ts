import { Loadable } from 'models/Loadable.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';

export const PRODUCT_BOARD_STORE_KEY = 'productBoard';

export enum ProductBoardActionGroup {
  productBoardToken = 'PRODUCT_BOARD_TOKEN',
}

export enum ProductBoardSliceTypes {
  ProductBoard = 'productBoard',
}

export interface ProductBoardStore {
  [ProductBoardSliceTypes.ProductBoard]: Loadable<{token: string}>;
}

export const productBoardActionTypes: TypesSequence = createTypesSequence(ProductBoardActionGroup.productBoardToken);
