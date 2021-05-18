import { notification } from 'apps/ui';
import { ERROR_COMMON } from 'models/Error.model';
import { types } from './agentHistory.store';
import { getAgentHistory, getAgentEventsCount } from '../api/agentHistory.client';
import { selectAgentHistoryFilterSerialized, selectAgentHistoryEventsList } from './agentHistory.selectors';

export const filterUpdate = (data) => (dispatch) => {
  dispatch({ type: types.FILTER_UPDATE, payload: data });
};

export const loadAgentEventsCount = (userId) => async (dispatch, getState) => {
  try {
    const filter = selectAgentHistoryFilterSerialized(getState());
    const { data } = await getAgentEventsCount(userId, { ...filter });
    dispatch({ type: types.AGENT_HISTORY_COUNT_LOAD, payload: data?.count });
  } catch (error) {
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const loadAgentHistory = (userId, page, isReload = true) => async (dispatch, getState) => {
  dispatch({ type: isReload ? types.AGENT_HISTORY_REQUEST : types.AGENT_HISTORY_UPDATING });
  try {
    const filter = selectAgentHistoryFilterSerialized(getState());
    const { data } = await getAgentHistory(userId, { ...filter, page });
    const currentRows = selectAgentHistoryEventsList(getState()) || [];
    const newData = currentRows.concat(data || []);
    dispatch({ type: types.AGENT_HISTORY_SUCCESS, payload: newData, isReset: isReload });
  } catch (error) {
    dispatch({ type: types.AGENT_HISTORY_FAILURE, payload: error });
    notification.error(ERROR_COMMON);
    throw error;
  }
};

export const clearAgentHistory = () => async (dispatch) => {
  dispatch({ type: types.AGENT_HISTORY_CLEAR });
};
