import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { IWatchlist, WatchlistContentTypes, WatchlistCreateBodyTypes } from '../models/CustomWatchlist.models';
import { CustomWatchlist } from '../services/CustomWatchlist.service';
import * as api from '../client/CustomWatchlist.client';
import { types } from './CustomWatchlist.store';
import { selectCanUseCustomWatchlists, selectWatchlists } from './CustomWatchlist.selectors';

export const customWatchlistInit = () => (_dispatch, getState): ProductTypes => {
  const canUseCustomWatchlists = selectCanUseCustomWatchlists(getState());

  // if (!canUseCustomWatchlists) {
  //   return null;
  // }

  const customWatchlist = new CustomWatchlist();
  productManagerService.register(customWatchlist);
  return customWatchlist.id;
};

export const customWatchlistsLoad = (merchantId: string) => async (dispatch) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_REQUEST });
  try {
    const payload = await api.getMerchantWatchlists(merchantId);
    dispatch({ type: types.CUSTOM_WATCHLISTS_SUCCESS, payload: payload.data, isReset: true });
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLISTS_FAILURE, error });
    throw error;
  }
};

export const setCurrentWatchlist = (watchlistId) => (dispatch, getState) => {
  const watchlists: IWatchlist[] = selectWatchlists(getState());
  dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_SUCCESS, payload: watchlists.find((watchlistElem) => watchlistElem.id === watchlistId), isReset: true });
};

export const clearCurrentWatchlist = () => (dispatch) => {
  dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_CLEAR, payload: null });
};

export const customWatchlistLoadById = (merchantId: string, watchlistId: number, callback?: (data: IWatchlist) => void) => async (dispatch) => {
  dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_REQUEST });
  try {
    const payload = await api.getMerchantWatchlistById(merchantId, watchlistId);

    if (callback) {
      callback(payload.data);
    }

    dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_SUCCESS, payload: payload.data, isReset: true });
  } catch (error) {
    dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_FAILURE, error });
    throw error;
  }
};

export const customWatchlistCreate = (merchantId: string, params: WatchlistCreateBodyTypes, callback: (data: IWatchlist) => void) => async (dispatch) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_REQUEST });
  try {
    const payload = await api.createMerchantWatchlist(merchantId, params);

    dispatch({ type: types.CUSTOM_WATCHLISTS_SUCCESS, payload: [payload.data] });
    callback(payload.data);
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLISTS_FAILURE });
    throw error;
  }
};

export const customWatchlistUpdateById = (merchantId: string, watchlistId: number, params: WatchlistCreateBodyTypes, callback: () => void) => async (dispatch, getState) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_UPDATING });
  try {
    const payload = await api.updateMerchantWatchlistById(merchantId, watchlistId, params);
    const watchlists: IWatchlist[] = [...selectWatchlists(getState())];
    const watchlistIndexFind = watchlists.findIndex((watchlist) => watchlist.id === payload.data.id);
    watchlists[watchlistIndexFind] = payload.data;

    dispatch({ type: types.CUSTOM_WATCHLISTS_SUCCESS, payload: watchlists, isReset: true });
    callback();
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLISTS_FAILURE });
    throw error;
  }
};

export const deleteCustomWatchlistById = (merchantId: string, watchlistId: number) => async (dispatch) => {
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

export const updateMerchantWatchlistContent = (merchantId: string, watchlistId: number, body: WatchlistContentTypes) => async (dispatch, getState) => {
  dispatch({ type: types.CUSTOM_WATCHLIST_CONTENT_UPDATING });
  try {
    const payload = await api.updateMerchantWatchlistContentById(merchantId, watchlistId, body);
    const watchlists: IWatchlist[] = [...selectWatchlists(getState())];
    const watchlistIndexFind = watchlists.findIndex((watchlist) => watchlist.id === payload.data.id);
    watchlists[watchlistIndexFind] = { ...watchlists[watchlistIndexFind], process: { ...watchlists[watchlistIndexFind].process, ...payload.data.process } };

    dispatch({ type: types.CUSTOM_WATCHLIST_CONTENT_SUCCESS });
    dispatch({ type: types.CUSTOM_WATCHLISTS_SUCCESS, payload: watchlists, isReset: true });
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLIST_CONTENT_FAILURE });
    throw error;
  }
};

export const customWatchlistsClear = () => (dispatch) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_CLEAR, payload: [] });
};
