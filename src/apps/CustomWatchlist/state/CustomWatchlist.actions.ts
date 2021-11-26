import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { Watchlist } from 'models/CustomWatchlist.model';
import { CustomWatchlist } from '../services/CustomWatchlist.service';
import * as api from '../client/CustomWatchlist.client';
import { CustomWatchlistModalValidationInputTypes } from '../components/CustomWatchListModalValidation/CustomWatchListModalValidation';
import { types } from './CustomWatchlist.store';
import { selectCanUseCustomWatchlists, selectWatchlists } from './CustomWatchlist.selectors';

export const customWatchlistInit = () => (dispatch, getState): ProductTypes => {
  const canUseCustomWatchlists = selectCanUseCustomWatchlists(getState());

  if (!canUseCustomWatchlists) {
    return null;
  }

  const customWatchlist = new CustomWatchlist();
  productManagerService.register(customWatchlist);
  return customWatchlist.id;
};

export const customWatchlistsLoad = (merchantId: string) => async (dispatch) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_REQUEST });
  try {
    const { data } = await api.getMerchantWatchlistsById(merchantId, {});
    dispatch({ type: types.CUSTOM_WATCHLISTS_SUCCESS, payload: data, isReset: true });
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLISTS_FAILURE, error });
    throw error;
  }
};

export const customWatchlistCreate = (merchantId: string, params: CustomWatchlistModalValidationInputTypes, callback: () => void) => async (dispatch) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_REQUEST });
  try {
    const payload = await api.createMerchantWatchlistById(merchantId, params);

    dispatch({ type: types.CUSTOM_WATCHLISTS_SUCCESS, payload: [payload.data] });
    callback();
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLISTS_FAILURE });
    throw error;
  }
};

export const customWatchlistUpdate = (merchantId: string, watchlistId: number, params: CustomWatchlistModalValidationInputTypes, callback: () => void) => async (dispatch, getState) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_UPDATING });
  try {
    const payload = await api.updateMerchantWatchlistById(merchantId, watchlistId, params);
    const watchlists: Watchlist[] = [...selectWatchlists(getState())];
    const watchlistIndexFind = watchlists.findIndex((watchlist) => watchlist.id === payload.data.id);
    watchlists[watchlistIndexFind] = payload.data;

    dispatch({ type: types.CUSTOM_WATCHLISTS_SUCCESS, payload: watchlists, isReset: true });
    callback();
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLISTS_FAILURE });
    throw error;
  }
};

export const deleteCustomWatchlist = (merchantId: string, watchlistId: number) => async (dispatch) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_DELETE_REQUEST });
  try {
    await api.deleteMerchantWatchlistById(merchantId, watchlistId);

    dispatch({ type: types.CUSTOM_WATCHLISTS_DELETE_SUCCESS });
    dispatch(customWatchlistsLoad(merchantId));
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLISTS_DELETE_FAILURE });
    throw error;
  }
};

export const customWatchlistClear = () => (dispatch) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_CLEAR, payload: [] });
};
