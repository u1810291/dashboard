import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { flowBuilderChangeableFlowUpdate } from 'apps/flowBuilder/store/FlowBuilder.action';
import { replaceObjKeyByName } from 'lib/object';
import { CustomWatchlistActions, CustomWatchlistModalSubmitType } from 'models/CustomWatchlist.model';
import { selectFlowBuilderChangeableFlowModel } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { CustomWatchlist } from '../services/CustomWatchlist.service';
import * as api from '../client/CustomWatchlist.client';
import { types } from './CustomWatchlist.store';
import { selectCanUseCustomWatchlists, selectWatchlists } from './CustomWatchlist.selectors';

export const customWatchlistInit = () => (dispatch, getState): ProductTypes => {
  const canUseCustomWatchlists = selectCanUseCustomWatchlists(getState());

  // if (!canUseCustomWatchlists) {
  //   return null;
  // }

  const customWatchlist = new CustomWatchlist();
  productManagerService.register(customWatchlist);
  return customWatchlist.id;
};

export const customWatchlistsLoad = (merchantId: string) => async (dispatch, getState) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_REQUEST });
  try {
    const flowWatchlists = selectFlowBuilderChangeableFlowModel(getState()).value.watchlists;
    const payload = await api.getMerchantWatchlistsById(merchantId, {});
    const newPayload = payload.data.map((watchlist) => {
      const findedWatchlist = flowWatchlists.find((flowWatchlist) => flowWatchlist.id === watchlist.id);
      const processedWatchlist = { ...watchlist, ...findedWatchlist, severityOnMatch: findedWatchlist?.severityOnMatch ?? CustomWatchlistActions.NoAction };
      return replaceObjKeyByName(processedWatchlist, 'id', 'watchlistId');
    });

    dispatch(flowBuilderChangeableFlowUpdate({ watchlists: newPayload }));
    dispatch({ type: types.CUSTOM_WATCHLISTS_SUCCESS, payload: newPayload, isReset: true });
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLISTS_FAILURE, error });
    throw error;
  }
};

export const customWatchlistCreate = (merchantId: string, params: CustomWatchlistModalSubmitType, callback: () => void) => async (dispatch, getState) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_REQUEST });
  try {
    const payload = await api.createMerchantWatchlistById(merchantId, params);
    const watchlists = selectWatchlists(getState());
    const mutatedWatchlists = replaceObjKeyByName(payload.data, 'id', 'watchlistId');

    dispatch(flowBuilderChangeableFlowUpdate({ watchlists: [...watchlists, mutatedWatchlists] }));
    dispatch({ type: types.CUSTOM_WATCHLISTS_SUCCESS, payload: [replaceObjKeyByName(payload.data, 'id', 'watchlistId')] });
    callback();
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLISTS_FAILURE });
    throw error;
  }
};

export const customWatchlistUpdate = (merchantId: string, watchlistId: number, params: CustomWatchlistModalSubmitType, callback: () => void) => async (dispatch, getState) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_UPDATING });
  try {
    const payload = await api.updateMerchantWatchlistById(merchantId, watchlistId, params);
    const watchlists = [...selectWatchlists(getState())];
    const findWatchlistIndex = watchlists.findIndex((watchlist) => watchlist.watchlistId === payload.data.id);
    const mutatedWatchlists = replaceObjKeyByName(payload.data, 'id', 'watchlistId');
    watchlists[findWatchlistIndex] = mutatedWatchlists;

    dispatch(flowBuilderChangeableFlowUpdate({ watchlists }));
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
  dispatch({ type: types.CUSTOM_WATCHLISTS_CLEAR });
};
