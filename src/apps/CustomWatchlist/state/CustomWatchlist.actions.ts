import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { CustomWatchlist } from '../services/CustomWatchlist.service';
import * as api from '../client/CustomWatchlist.client';
import { types } from './CustomWatchlist.store';

export const CustomWatchlistInit = () => (): ProductTypes => {
  const customWatchlist = new CustomWatchlist();
  productManagerService.register(customWatchlist);
  return customWatchlist.id;
};

export const customWatchlistLoad = (id, isReload) => async (dispatch) => {
  dispatch({ type: isReload ? types.CUSTOM_WATCHLISTS_LIST_UPDATING : types.CUSTOM_WATCHLISTS_LIST_REQUEST });
  try {
    const payload = await api.getVerifications({});
    dispatch({ type: types.CUSTOM_WATCHLISTS_LIST_SUCCESS, payload, isReset: true });
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLISTS_LIST_FAILURE, error });
    throw error;
  }
};

export const customWatchlistClear = () => (dispatch) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_LIST_CLEAR });
};
