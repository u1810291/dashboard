import { productManagerService } from 'apps/Product';
import { get } from 'lodash';
import { ProductTypes } from 'models/Product.model';
import { flowBuilderChangeableFlowUpdate } from 'apps/flowBuilder/store/FlowBuilder.action';
import { replaceObjKeyByName } from 'lib/object';
import { CustomWatchlistSeverityOnMatch, CustomWatchlistModalSubmitType, FlowWatchlist, Watchlist } from 'models/CustomWatchlist.model';
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
    const flowWatchlists: FlowWatchlist[] = get(selectFlowBuilderChangeableFlowModel(getState()), 'value.watchlists', []);
    const payload = await api.getMerchantWatchlistsById(merchantId, {});
    const newFlowWatchlistsPayload: FlowWatchlist[] = payload.data.map((watchlist) => {
      const findedWatchlist = flowWatchlists.find((flowWatchlist) => flowWatchlist.watchlistId === watchlist.id);
      return {
        ...replaceObjKeyByName(watchlist, 'id', 'watchlistId'),
        ...findedWatchlist,
        severityOnMatch: findedWatchlist?.severityOnMatch ?? CustomWatchlistSeverityOnMatch.NoAction,
      };
    });

    // ! flow watchlists have different scheme for ui, so flow watchlists and watchlsts were parallelized to maintain immutability
    dispatch(flowBuilderChangeableFlowUpdate({ watchlists: newFlowWatchlistsPayload }));
    dispatch({ type: types.CUSTOM_WATCHLISTS_SUCCESS, payload: payload.data, isReset: true });
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLISTS_FAILURE, error });
    throw error;
  }
};

export const customWatchlistCreate = (merchantId: string, params: CustomWatchlistModalSubmitType, callback: () => void) => async (dispatch, getState) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_REQUEST });
  try {
    const flowWatchlists: FlowWatchlist[] = get(selectFlowBuilderChangeableFlowModel(getState()), 'value.watchlists', []);
    const payload = await api.createMerchantWatchlistById(merchantId, params);
    const mutatedWatchlists: FlowWatchlist = { ...replaceObjKeyByName(payload.data, 'id', 'watchlistId'), severityOnMatch: CustomWatchlistSeverityOnMatch.NoAction };

    dispatch(flowBuilderChangeableFlowUpdate({ watchlists: [...flowWatchlists, mutatedWatchlists] }));
    dispatch({ type: types.CUSTOM_WATCHLISTS_SUCCESS, payload: [payload.data] });
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
    const watchlists: Watchlist[] = [...selectWatchlists(getState())];
    const flowWatchlists: FlowWatchlist[] = [...get(selectFlowBuilderChangeableFlowModel(getState()), 'value.watchlists', [])];
    const findWatchlistIndex = watchlists.findIndex((watchlist) => watchlist.id === payload.data.id);
    const findFlowWatchlistIndex = flowWatchlists.findIndex((flowWatchlist) => flowWatchlist.watchlistId === payload.data.id);
    flowWatchlists[findFlowWatchlistIndex] = { ...flowWatchlists[findFlowWatchlistIndex], ...replaceObjKeyByName(payload.data, 'id', 'watchlistId') };
    watchlists[findWatchlistIndex] = payload.data;

    dispatch(flowBuilderChangeableFlowUpdate({ watchlists: flowWatchlists }));
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
