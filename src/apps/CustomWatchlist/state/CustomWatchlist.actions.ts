import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { ErrorStatuses } from 'models/Error.model';
import { IWatchlistHeaders, IWatchlistShortValidation, IWatchlist, IWatchlistCreateBody, IWatchlistContent, WatchlistTypes } from 'models/Watchlist.model';
import { CustomWatchlistModalValidationInputs, CustomWatchlistModalValidationInputTypes } from '../models/CustomWatchlist.model';
import { CustomWatchlist } from '../services/CustomWatchlist.service';
import * as api from '../client/CustomWatchlist.client';
import { types, CustomWatchlistsActions } from './CustomWatchlist.store';
import { selectWatchlists, selectCurrentCustomWatchlist } from './CustomWatchlist.selectors';

export const customWatchlistInit = () => (): ProductTypes => {
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
  const watchlists = selectWatchlists(getState());
  dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_SUCCESS, payload: watchlists.find((watchlistElem) => watchlistElem.id === watchlistId), isReset: true });
};

export const clearCurrentWatchlist = () => (dispatch) => {
  dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_CLEAR, payload: null });
};

export const clearCurrentWatchlistHeaders = () => (dispatch) => {
  dispatch({ type: types.CURRENT_CUSTOM_WATCHLISTS_HEADERS_CLEAR, payload: null });
};

export const clearWatchlistContent = () => (dispatch) => {
  dispatch({ type: types.CUSTOM_WATCHLIST_CONTENT_CLEAR, payload: null });
};

export const clearCurrentWatchlistFileError = () => (dispatch) => {
  dispatch({ type: CustomWatchlistsActions.CurrentWatchlistFileFailure, payload: null });
};

export const clearWatchlist = () => (dispatch) => {
  dispatch(clearCurrentWatchlistHeaders());
  dispatch(clearWatchlistContent());
  dispatch(clearCurrentWatchlist());
  dispatch(clearCurrentWatchlistFileError());
};

export const updateCurrentWatchlistProcess = (formState: Partial<CustomWatchlistModalValidationInputTypes>) => (dispatch, getState) => {
  dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_UPDATING });

  try {
    const currentWatchlist = selectCurrentCustomWatchlist(getState());
    const newCurrentWatchlist: Partial<IWatchlist> = {
      ...currentWatchlist,
      process: {
        ...currentWatchlist?.process,
        error: null,
        csvSeparator: formState[CustomWatchlistModalValidationInputs.CsvSeparator],
        inputSourceFileName: formState[CustomWatchlistModalValidationInputs.FileName],
        inputSourceFileKey: formState[CustomWatchlistModalValidationInputs.FileKey],
      },
    };

    dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_SUCCESS, payload: newCurrentWatchlist, isReset: true });
  } catch {
    dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_FAILURE });
  }
};

export const updateCurrentWatchlist = (values: Partial<IWatchlist>) => (dispatch, getState) => {
  dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_UPDATING });

  try {
    const currentWatchlist = selectCurrentCustomWatchlist(getState());
    const newCurrentWatchlist: Partial<IWatchlist> = {
      ...currentWatchlist,
      ...values,
    };

    dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_SUCCESS, payload: newCurrentWatchlist, isReset: true });
  } catch {
    dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_FAILURE });
  }
};

export const customWatchlistLoadById = (merchantId: string, watchlistId: number, callback?: (value: IWatchlist) => void) => async (dispatch, getState) => {
  dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_REQUEST });
  try {
    const payload = await api.getMerchantWatchlistById(merchantId, watchlistId);
    const watchlists = [...selectWatchlists(getState())];
    const watchlistIndexFind = watchlists.findIndex((watchlist) => watchlist.id === watchlistId);
    watchlists[watchlistIndexFind] = payload.data;

    dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_SUCCESS, payload: payload.data, isReset: true });
    dispatch({ type: types.CUSTOM_WATCHLISTS_SUCCESS, payload: watchlists, isReset: true });

    if (callback) {
      callback(payload.data);
    }
  } catch (error) {
    dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_FAILURE, error });
    throw error;
  }
};

export const customWatchlistCreate = (merchantId: string, params: IWatchlistCreateBody, callback: (data: IWatchlist) => void) => async (dispatch) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_REQUEST });
  try {
    const payload = await api.createMerchantWatchlist(merchantId, params);

    dispatch({ type: types.CUSTOM_WATCHLISTS_SUCCESS, payload: [payload.data] });
    callback(payload.data);
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLISTS_FAILURE, error });
    throw error;
  }
};

export const customWatchlistUpdateById = (merchantId: string, watchlistId: number, params: IWatchlistCreateBody) => async (dispatch, getState) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_UPDATING });
  try {
    const payload = await api.updateMerchantWatchlistById(merchantId, watchlistId, params);
    const watchlists = [...selectWatchlists(getState())];
    const watchlistIndexFind = watchlists.findIndex((watchlist) => watchlist.id === payload.data.id);
    watchlists[watchlistIndexFind] = payload.data;

    dispatch({ type: types.CUSTOM_WATCHLISTS_SUCCESS, payload: watchlists, isReset: true });
  } catch (error) {
    dispatch({ type: types.CUSTOM_WATCHLISTS_FAILURE, error });
    throw error;
  }
};

export const deleteCustomWatchlistById = (merchantId: string, watchlistId: number, onError?: (error) => void) => async (dispatch) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_DELETE_REQUEST });
  try {
    await api.deleteMerchantWatchlistById(merchantId, watchlistId);

    dispatch({ type: types.CUSTOM_WATCHLISTS_DELETE_SUCCESS });
    dispatch(customWatchlistsLoad(merchantId));
  } catch (error) {
    if (onError) {
      onError(error);
    }
    dispatch({ type: types.CUSTOM_WATCHLISTS_DELETE_FAILURE, error });
    throw error;
  }
};

export const updateMerchantWatchlistContent = (merchantId: string, watchlistId: number, body: IWatchlistContent) => async (dispatch, getState) => {
  dispatch({ type: types.CUSTOM_WATCHLIST_CONTENT_UPDATING });
  try {
    const payload = await api.updateMerchantWatchlistContentById(merchantId, watchlistId, body);
    const watchlists = [...selectWatchlists(getState())];
    const watchlistIndexFind = watchlists.findIndex((watchlist) => watchlist.id === payload.data.id);
    watchlists[watchlistIndexFind] = { ...watchlists[watchlistIndexFind], process: { ...watchlists[watchlistIndexFind].process, ...payload.data.process } };

    dispatch({ type: types.CUSTOM_WATCHLIST_CONTENT_SUCCESS, payload: null, isReset: true });
    dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_SUCCESS, payload: watchlists[watchlistIndexFind], isReset: true });
    dispatch({ type: types.CUSTOM_WATCHLISTS_SUCCESS, payload: watchlists, isReset: true });
  } catch (error: any) {
    dispatch({ type: types.CUSTOM_WATCHLIST_CONTENT_FAILURE, error: error?.response?.data?.type });
    throw error;
  }
};

export const customWatchlistsClear = () => (dispatch) => {
  dispatch({ type: types.CUSTOM_WATCHLISTS_CLEAR, payload: [] });
};

export const getCustomWatchlistHeaders = (merchantId: string, body: IWatchlistHeaders) => async (dispatch) => {
  dispatch({ type: types.CURRENT_CUSTOM_WATCHLISTS_HEADERS_REQUEST });
  try {
    const payload = await api.getWatchlistHeaders(merchantId, body);

    dispatch({ type: types.CURRENT_CUSTOM_WATCHLISTS_HEADERS_SUCCESS, payload: payload.data.headers, isReset: true });
  } catch (error: any) {
    dispatch({ type: types.CURRENT_CUSTOM_WATCHLISTS_HEADERS_FAILURE, error: error?.response?.data?.type });
    throw error;
  }
};

export const getCustomWatchlistShortValidation = (merchantId: string, body: IWatchlistShortValidation, isEdit: boolean) => async (dispatch, getState) => {
  dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_UPDATING });
  try {
    dispatch({ type: CustomWatchlistsActions.CurrentWatchlistFileFailure, payload: null });
    const payload = await api.getWatchlistShortValidation(merchantId, body);
    const currentWatchlist = { ...selectCurrentCustomWatchlist(getState()) };
    currentWatchlist.process = { ...currentWatchlist.process };

    if (isEdit) {
      currentWatchlist.process.error = payload.data.valid ? currentWatchlist.process.error : (payload.data?.errors ?? null);
    }

    if (!isEdit) {
      currentWatchlist.process.error = payload.data?.errors ?? null;
    }

    const foundError = payload?.data?.errors?.find((value) => value.code === ErrorStatuses.UnprocessableEntity);
    if (foundError) {
      dispatch({ type: CustomWatchlistsActions.CurrentWatchlistFileFailure, payload: foundError?.type });
      return;
    }

    dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_SUCCESS, payload: currentWatchlist, isReset: true });
  } catch (error: any) {
    dispatch({ type: types.CURRENT_CUSTOM_WATCHLIST_FAILURE, error });
    throw error;
  }
};

export const customWatchlistsFlowSubmit = (merchantId: string, values: Partial<CustomWatchlistModalValidationInputTypes>, callback: (watchlistData: Partial<IWatchlist>) => void, watchlist?: Partial<IWatchlist>) => async (dispatch) => {
  const watchlistRequestData = {
    name: values[CustomWatchlistModalValidationInputs.Name],
    mapping: values[CustomWatchlistModalValidationInputs.Mapping],
    groupId: null,
    watchlistType: WatchlistTypes.Custom,
  };
  const watchlistContentValues = {
    inputSourceFileKey: values[CustomWatchlistModalValidationInputs.FileKey],
    inputSourceFileName: values[CustomWatchlistModalValidationInputs.FileName],
    csvSeparator: values[CustomWatchlistModalValidationInputs.CsvSeparator],
  };

  if (watchlist?.id) {
    await dispatch(customWatchlistUpdateById(merchantId, watchlist.id, watchlistRequestData));
    await dispatch(updateMerchantWatchlistContent(merchantId, watchlist.id, watchlistContentValues));
    callback(watchlist);
    return;
  }

  dispatch(customWatchlistCreate(merchantId, watchlistRequestData, async (watchlistData: IWatchlist) => {
    dispatch(setCurrentWatchlist(watchlistData.id));
    await dispatch(updateMerchantWatchlistContent(merchantId, watchlistData.id, watchlistContentValues));

    callback(watchlistData);
  }));
};
