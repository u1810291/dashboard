import { FullSupportedLocales } from 'models/Intl.model';
import { productBoardActionTypes } from './ProductBoard.store';
import * as api from '../api/ProductBoard.client';

export const getProductBoardToken = (locale: FullSupportedLocales) => async (dispatch) => {
  dispatch({ type: productBoardActionTypes.PRODUCT_BOARD_TOKEN_REQUEST });
  try {
    const { data } = await api.getProductBoardSSOToken(locale);
    dispatch({ type: productBoardActionTypes.PRODUCT_BOARD_TOKEN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: productBoardActionTypes.PRODUCT_BOARD_TOKEN_FAILURE, error });
    throw error;
  }
};
