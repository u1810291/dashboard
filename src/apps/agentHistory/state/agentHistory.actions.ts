import { notification } from 'apps/ui';
import { UserId } from 'models/Collaborator.model';
import { ErrorMessages } from 'models/Error.model';
import { FilterI } from 'models/Filter.model';
import { types } from './agentHistory.store';
import { getAgentHistory, getAgentEventsCount } from '../api/agentHistory.client';
import { selectAgentHistoryFilterSerialized } from './agentHistory.selectors';

export const filterUpdate = (data: FilterI) => (dispatch) => {
  dispatch({ type: types.FILTER_UPDATE, payload: data });
};

export const loadAgentEventsCount = (userId: UserId) => async (dispatch, getState) => {
  try {
    const filter = selectAgentHistoryFilterSerialized(getState());
    const { data } = await getAgentEventsCount(userId, { ...filter });
    dispatch({ type: types.AGENT_HISTORY_COUNT_LOAD, payload: data?.count });
  } catch (error) {
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const loadAgentHistory = (userId: UserId, page: number, isReload: boolean = true) => async (dispatch, getState) => {
  dispatch({ type: isReload ? types.AGENT_HISTORY_REQUEST : types.AGENT_HISTORY_UPDATING });
  try {
    const filter = selectAgentHistoryFilterSerialized(getState());
    const { data } = await getAgentHistory(userId, { ...filter, page });
    dispatch({ type: types.AGENT_HISTORY_SUCCESS, payload: data || [], isReset: isReload });
  } catch (error) {
    dispatch({ type: types.AGENT_HISTORY_FAILURE, payload: error });
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const clearAgentHistory = () => async (dispatch) => {
  dispatch({ type: types.AGENT_HISTORY_CLEAR });
};
