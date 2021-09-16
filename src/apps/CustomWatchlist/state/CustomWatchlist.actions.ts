import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { flowBuilderChangeableFlowUpdate } from 'apps/flowBuilder/store/FlowBuilder.action';
import { replaceObjKeyByName } from 'lib/object';
import { CustomWatchlist } from '../services/CustomWatchlist.service';
import * as api from '../client/CustomWatchlist.client';
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
  dispatch({ type: types.CUSTOM_WATCHLISTS_LIST_REQUEST });
  try {
    const payload = await api.getMerchantWatchlistsById(merchantId, {});
    const mutatedPayload = payload.data.map((watchlist) => replaceObjKeyByName(watchlist, 'id', 'watchlistId'));
    dispatch(flowBuilderChangeableFlowUpdate({ watchlists: mutatedPayload }));
    dispatch({ type: types.CUSTOM_WATCHLISTS_LIST_SUCCESS, payload: mutatedPayload, isReset: true });
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLISTS_LIST_FAILURE, error });
    throw error;
  }
};

export const customWatchlistClear = () => (dispatch) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_LIST_CLEAR });
};

export const deleteCustomWatchlist = (merchantId: string, watchlistId: number) => async (dispatch) => {
  dispatch({ type: types.CUSTOM_WATCHLIST_DELETE_REQUEST });
  try {
    await api.deleteMerchantWatchlistById(merchantId, watchlistId);
    dispatch({ type: types.CUSTOM_WATCHLIST_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLIST_DELETE_FAILURE });
    throw error;
  }
};

// TODO: replace Object in params with normal type
export const customWatchlistCreate = (merchantId: string, params: Object, callback: () => void) => async (dispatch, getState) => {
  dispatch({ type: types.CUSTOM_WATCHLIST_SET_REQUEST });
  try {
    const payload = await api.createMerchantWatchlistById(merchantId, params);
    const watchlists = selectWatchlists(getState());
    const newPayload = [...watchlists, replaceObjKeyByName(payload.data, 'id', 'watchlistId')];
    dispatch(flowBuilderChangeableFlowUpdate({ watchlists: newPayload }));
    dispatch({ type: types.CUSTOM_WATCHLIST_SET_SUCCESS, payload: newPayload });
    callback();
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLIST_SET_FAILURE });
    throw error;
  }
};

// TODO: replace Object in params with normal type
export const customWatchlistUpdate = (merchantId: string, watchlistId: number, params: Object, callback: Function) => async (dispatch) => {
  dispatch({ type: types.CUSTOM_WATCHLIST_UPDATE_REQUEST });
  try {
    const payload = await api.updateMerchantWatchlistById(merchantId, watchlistId, params);
    dispatch({ type: types.CUSTOM_WATCHLIST_UPDATE_SUCCESS, payload: payload.data });
    callback();
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLIST_UPDATE_FAILURE });
    throw error;
  }
};
