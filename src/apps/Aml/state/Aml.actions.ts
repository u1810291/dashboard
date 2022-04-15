import { productManagerService } from 'apps/Product';
import { ProductTypes } from 'models/Product.model';
import { ErrorStatuses } from 'models/Error.model';
import { IWatchlist, IWatchlistContent, IWatchlistHeaders, IWatchlistShortValidation, IWatchlistCreateBody, WatchlistTypes } from 'models/Watchlist.model';
import { AmlCheck } from '../services/Aml.service';
import { BasicWatchlistModalValidationInputTypes, IBasicWatchlistModalValidationInputs, IBasicWatchlistGroupCreateUpdate } from '../models/Aml.model';
import * as api from '../client/Aml.client';
import { types, BasicWatchlistsActions } from './Aml.store';
import { selectWatchlists, selectCurrentBasicWatchlist, selectWatchlistsGroups } from './Aml.selectors';

export const amlCheckInit = () => (): ProductTypes => {
  const amlCheck = new AmlCheck();
  productManagerService.register(amlCheck);
  return amlCheck.id;
};

export const basicWatchlistsLoad = () => async (dispatch) => {
  dispatch({ type: types.BASIC_WATCHLISTS_REQUEST });
  try {
    const payload = await api.getMerchantWatchlists();
    dispatch({ type: types.BASIC_WATCHLISTS_SUCCESS, payload: payload.data, isReset: true });
  } catch (error) {
    dispatch({ type: types.BASIC_WATCHLISTS_FAILURE, error });
  }
};

export const basicWatchlistsGroupsLoad = () => async (dispatch) => {
  dispatch({ type: types.BASIC_WATCHLISTS_GROUPS_REQUEST });
  try {
    const payload = await api.getMerchantWatchlistsGroups();
    dispatch({ type: types.BASIC_WATCHLISTS_GROUPS_SUCCESS, payload: payload.data, isReset: true });
  } catch (error) {
    dispatch({ type: types.BASIC_WATCHLISTS_GROUPS_FAILURE, error });
  }
};

export const setCurrentWatchlist = (watchlistId) => (dispatch, getState) => {
  const watchlists = selectWatchlists(getState());
  dispatch({ type: types.CURRENT_BASIC_WATCHLIST_SUCCESS, payload: watchlists.find((watchlistElem) => watchlistElem.id === watchlistId), isReset: true });
};

export const clearCurrentWatchlist = () => (dispatch) => {
  dispatch({ type: types.CURRENT_BASIC_WATCHLIST_CLEAR, payload: null });
};

export const clearCurrentWatchlistHeaders = () => (dispatch) => {
  dispatch({ type: types.CURRENT_BASIC_WATCHLIST_HEADERS_CLEAR, payload: null });
};

export const clearWatchlistContent = () => (dispatch) => {
  dispatch({ type: types.BASIC_WATCHLIST_CONTENT_CLEAR, payload: null });
};

export const clearCurrentWatchlistFileError = () => (dispatch) => {
  dispatch({ type: BasicWatchlistsActions.CurrentWatchlistFileFailure, payload: null });
};

export const clearWatchlist = () => (dispatch) => {
  dispatch(clearCurrentWatchlistHeaders());
  dispatch(clearWatchlistContent());
  dispatch(clearCurrentWatchlist());
  dispatch(clearCurrentWatchlistFileError());
};

export const updateCurrentWatchlistProcess = (formState: Partial<IBasicWatchlistModalValidationInputs>) => (dispatch, getState) => {
  dispatch({ type: types.CURRENT_BASIC_WATCHLIST_UPDATING });

  try {
    const currentWatchlist = selectCurrentBasicWatchlist(getState());
    const newCurrentWatchlist: Partial<IWatchlist> = {
      ...currentWatchlist,
      process: {
        ...currentWatchlist?.process,
        error: null,
        csvSeparator: formState[BasicWatchlistModalValidationInputTypes.CsvSeparator],
        inputSourceFileName: formState[BasicWatchlistModalValidationInputTypes.FileName],
        inputSourceFileKey: formState[BasicWatchlistModalValidationInputTypes.FileKey],
      },
    };

    dispatch({ type: types.CURRENT_BASIC_WATCHLIST_SUCCESS, payload: newCurrentWatchlist, isReset: true });
  } catch {
    dispatch({ type: types.CURRENT_BASIC_WATCHLIST_FAILURE });
  }
};

export const basicWatchlistUpdateById = (merchantId: string, watchlistId: number, params: IWatchlistCreateBody) => async (dispatch, getState) => {
  dispatch({ type: types.BASIC_WATCHLISTS_UPDATING });
  try {
    const payload = await api.updateMerchantWatchlistById(merchantId, watchlistId, params);
    const watchlists = [...selectWatchlists(getState())];
    const watchlistIndexFind = watchlists.findIndex((watchlist) => watchlist.id === payload.data.id);
    watchlists[watchlistIndexFind] = payload.data;

    dispatch({ type: types.BASIC_WATCHLISTS_SUCCESS, payload: watchlists, isReset: true });
  } catch (error) {
    dispatch({ type: types.BASIC_WATCHLISTS_FAILURE, error });
  }
};

export const updateCurrentWatchlist = (values: Partial<IWatchlist>) => (dispatch, getState) => {
  dispatch({ type: types.CURRENT_BASIC_WATCHLIST_UPDATING });

  try {
    const currentWatchlist = selectCurrentBasicWatchlist(getState());
    const newCurrentWatchlist: Partial<IWatchlist> = {
      ...currentWatchlist,
      ...values,
    };

    dispatch({ type: types.CURRENT_BASIC_WATCHLIST_SUCCESS, payload: newCurrentWatchlist, isReset: true });
  } catch {
    dispatch({ type: types.CURRENT_BASIC_WATCHLIST_FAILURE });
  }
};

export const basicWatchlistLoadById = (merchantId: string, watchlistId: number, callback?: (value: IWatchlist) => void) => async (dispatch, getState) => {
  dispatch({ type: types.CURRENT_BASIC_WATCHLIST_REQUEST });
  try {
    const payload = await api.getMerchantWatchlistById(merchantId, watchlistId);
    const watchlists = [...selectWatchlists(getState())];
    const watchlistIndexFind = watchlists.findIndex((watchlist) => watchlist.id === watchlistId);
    watchlists[watchlistIndexFind] = payload.data;

    dispatch({ type: types.CURRENT_BASIC_WATCHLIST_SUCCESS, payload: payload.data, isReset: true });
    dispatch({ type: types.BASIC_WATCHLISTS_SUCCESS, payload: watchlists, isReset: true });

    if (callback) {
      callback(payload.data);
    }
  } catch (error) {
    dispatch({ type: types.CURRENT_BASIC_WATCHLIST_FAILURE, error });
  }
};

export const basicWatchlistCreate = (merchantId: string, params: IWatchlistCreateBody, callback: (data: IWatchlist) => void) => async (dispatch) => {
  dispatch({ type: types.BASIC_WATCHLISTS_REQUEST });
  try {
    const payload = await api.createMerchantWatchlist(merchantId, params);

    dispatch({ type: types.BASIC_WATCHLISTS_SUCCESS, payload: [payload.data] });
    callback(payload.data);
  } catch (error) {
    dispatch({ type: types.BASIC_WATCHLISTS_FAILURE, error });
  }
};

export const updateMerchantWatchlistContent = (merchantId: string, watchlistId: number, body: IWatchlistContent) => async (dispatch, getState) => {
  dispatch({ type: types.BASIC_WATCHLIST_CONTENT_UPDATING });
  try {
    const payload = await api.updateMerchantWatchlistContentById(merchantId, watchlistId, body);
    const watchlists = [...selectWatchlists(getState())];
    const watchlistIndexFind = watchlists.findIndex((watchlist) => watchlist.id === payload.data.id);
    watchlists[watchlistIndexFind] = { ...watchlists[watchlistIndexFind], process: { ...watchlists[watchlistIndexFind].process, ...payload.data.process } };

    dispatch({ type: types.BASIC_WATCHLIST_CONTENT_SUCCESS, payload: null, isReset: true });
    dispatch({ type: types.CURRENT_BASIC_WATCHLIST_SUCCESS, payload: watchlists[watchlistIndexFind], isReset: true });
    dispatch({ type: types.BASIC_WATCHLISTS_SUCCESS, payload: watchlists, isReset: true });
  } catch (error: any) {
    dispatch({ type: types.BASIC_WATCHLIST_CONTENT_FAILURE, error: error?.response?.data?.type });
  }
};

export const basicWatchlistsClear = () => (dispatch) => {
  dispatch({ type: types.BASIC_WATCHLISTS_CLEAR, payload: [] });
};

export const basicWatchlistsGroupsClear = () => (dispatch) => {
  dispatch({ type: types.BASIC_WATCHLISTS_GROUPS_CLEAR, payload: [] });
};

export const getBasicWatchlistHeaders = (merchantId: string, body: IWatchlistHeaders) => async (dispatch) => {
  dispatch({ type: types.CURRENT_BASIC_WATCHLIST_HEADERS_REQUEST });
  try {
    const payload = await api.getWatchlistHeaders(merchantId, body);

    dispatch({ type: types.CURRENT_BASIC_WATCHLIST_HEADERS_SUCCESS, payload: payload.data.headers, isReset: true });
  } catch (error: any) {
    dispatch({ type: types.CURRENT_BASIC_WATCHLIST_HEADERS_FAILURE, error: error?.response?.data?.type });
  }
};

export const getBasicWatchlistShortValidation = (merchantId: string, body: IWatchlistShortValidation, isEdit: boolean) => async (dispatch, getState) => {
  dispatch({ type: types.CURRENT_BASIC_WATCHLIST_UPDATING });
  try {
    dispatch({ type: BasicWatchlistsActions.CurrentWatchlistFileFailure, payload: null });
    const payload = await api.getWatchlistShortValidation(merchantId, body);
    const currentWatchlist = { ...selectCurrentBasicWatchlist(getState()) };
    currentWatchlist.process = { ...currentWatchlist.process };

    if (isEdit) {
      currentWatchlist.process.error = payload.data.valid ? currentWatchlist.process.error : (payload.data?.errors ?? null);
    }

    if (!isEdit) {
      currentWatchlist.process.error = payload.data?.errors ?? null;
    }

    const foundError = payload?.data?.errors?.find((value) => value.code === ErrorStatuses.UnprocessableEntity);
    if (foundError) {
      dispatch({ type: BasicWatchlistsActions.CurrentWatchlistFileFailure, payload: foundError?.type });
      return;
    }

    dispatch({ type: types.CURRENT_BASIC_WATCHLIST_SUCCESS, payload: currentWatchlist, isReset: true });
  } catch (error: any) {
    dispatch({ type: types.CURRENT_BASIC_WATCHLIST_FAILURE, error });
  }
};

export const basicWatchlistsGroupCreate = (body: IBasicWatchlistGroupCreateUpdate, callback: (loading: boolean, error?: unknown) => void) => async (dispatch, getState) => {
  dispatch({ type: types.BASIC_WATCHLISTS_GROUPS_REQUEST });
  try {
    const watchlistsGroups = selectWatchlistsGroups(getState());

    callback(true);

    const payload = await api.createWatchlistGroup(body);

    callback(false);

    dispatch({ type: types.BASIC_WATCHLISTS_GROUPS_SUCCESS, payload: [...watchlistsGroups, payload.data], isReset: true });
  } catch (error) {
    callback(false, error);

    dispatch({ type: types.BASIC_WATCHLISTS_GROUPS_FAILURE, error });
  }
};

export const basicWatchlistsGroupUpdate = (groupId: number, body: IBasicWatchlistGroupCreateUpdate, callback: (loading: boolean, error?: unknown) => void) => async (dispatch, getState) => {
  dispatch({ type: types.BASIC_WATCHLISTS_GROUPS_UPDATING });
  try {
    const newWatchlistsGroups = [...selectWatchlistsGroups(getState())];

    callback(true);

    const payload = await api.updateWatchlistGroup(groupId, body);

    callback(false);

    const currentGroupIndex = newWatchlistsGroups.findIndex((group) => group.id === groupId);
    newWatchlistsGroups[currentGroupIndex] = payload.data;
    dispatch({ type: types.BASIC_WATCHLISTS_GROUPS_SUCCESS, payload: newWatchlistsGroups, isReset: true });
  } catch (error) {
    callback(false, error);

    dispatch({ type: types.BASIC_WATCHLISTS_GROUPS_FAILURE, error });
  }
};

export const basicWatchlistsGroupItemDelete = (merchantId: string, watchlistId: number, callback?: (flag: boolean) => void) => async (dispatch) => {
  dispatch({ type: types.BASIC_WATCHLISTS_DELETE_REQUEST });
  try {
    const payload = await api.deleteMerchantWatchlistById(merchantId, watchlistId);

    callback(payload.data);

    if (!payload.data) {
      dispatch({ type: types.BASIC_WATCHLISTS_DELETE_FAILURE });
      return;
    }

    dispatch({ type: types.BASIC_WATCHLISTS_DELETE_SUCCESS });
    dispatch(basicWatchlistsLoad());
  } catch (error) {
    dispatch({ type: types.BASIC_WATCHLISTS_DELETE_FAILURE, error });
  }
};

export const basicWatchlistsGroupDelete = (groupId: number, callback?: (flag: boolean) => void) => async (dispatch, getState) => {
  dispatch({ type: types.BASIC_WATCHLISTS_GROUPS_REQUEST });
  try {
    const watchlistsGroups = selectWatchlistsGroups(getState());
    const payload = await api.deleteWatchlistGroup(groupId);

    callback(payload.data.result);

    if (payload.data.result) {
      const newWatchlistsGroups = await watchlistsGroups.filter((group) => group.id !== groupId);
      await dispatch({ type: types.BASIC_WATCHLISTS_GROUPS_SUCCESS, payload: newWatchlistsGroups, isReset: true });
    }

    if (!payload.data.result) {
      dispatch({ type: types.BASIC_WATCHLISTS_GROUPS_FAILURE });
    }
  } catch (error) {
    dispatch({ type: types.BASIC_WATCHLISTS_GROUPS_FAILURE, error });
  }
};

export const basicWatchlistsFlowSubmit = (merchantId: string, values: Partial<IBasicWatchlistModalValidationInputs>, callback: (watchlistData: Partial<IWatchlist>) => void, watchlist?: Partial<IWatchlist>) => async (dispatch) => {
  const watchlistRequestData = {
    name: values[BasicWatchlistModalValidationInputTypes.Name],
    mapping: values[BasicWatchlistModalValidationInputTypes.Mapping],
    groupId: values[BasicWatchlistModalValidationInputTypes.Group] as number,
    watchlistType: WatchlistTypes.Basic,
  };

  const watchlistContentValues = {
    inputSourceFileKey: values[BasicWatchlistModalValidationInputTypes.FileKey],
    inputSourceFileName: values[BasicWatchlistModalValidationInputTypes.FileName],
    csvSeparator: values[BasicWatchlistModalValidationInputTypes.CsvSeparator],
  };

  if (watchlist?.id) {
    await dispatch(basicWatchlistUpdateById(merchantId, watchlist.id, watchlistRequestData));
    await dispatch(updateMerchantWatchlistContent(merchantId, watchlist.id, watchlistContentValues));
    callback(watchlist);
    return;
  }

  dispatch(basicWatchlistCreate(merchantId, watchlistRequestData, async (watchlistData: IWatchlist) => {
    dispatch(setCurrentWatchlist(watchlistData.id));
    await dispatch(updateMerchantWatchlistContent(merchantId, watchlistData.id, watchlistContentValues));

    callback(watchlistData);
  }));
};
