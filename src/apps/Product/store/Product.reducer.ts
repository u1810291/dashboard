import { createReducer } from 'state/store.utils';
import { ProductActionTypes, ProductStore } from './Product.store';

const initialState: ProductStore = {
  isInited: false,
  registered: [],
};

export const productReducer = createReducer(initialState, {
  [ProductActionTypes.ProductIsInitedUpdate](state, { payload }) {
    return {
      ...state,
      isInited: payload,
    };
  },
  [ProductActionTypes.ProductRegistered](state, { payload }) {
    return {
      ...state,
      registered: [
        ...state.registered,
        ...payload,
      ],
    };
  },
});
