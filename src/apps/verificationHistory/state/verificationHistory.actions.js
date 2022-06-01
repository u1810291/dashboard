import { notification } from 'apps/ui';
import { ErrorMessages } from 'models/Error.model';
import { types } from './verificationHistory.store';
import { getVerificationEventsCount, getVerificationHistory, saveVerificationAgentNote } from '../api/verificationHistory.client';
import { selectVerificationChangesList, selectVerificationHistoryFilterSerialized } from './verificationHistory.selectors';

export const filterUpdate = (data) => (dispatch) => {
  dispatch({ type: types.FILTER_UPDATE, payload: data });
};

export const loadVerificationEventsCount = (userId) => async (dispatch, getState) => {
  try {
    const filter = selectVerificationHistoryFilterSerialized(getState());
    const { data } = await getVerificationEventsCount(userId, { ...filter });
    dispatch({ type: types.VERIFICATION_HISTORY_COUNT_LOAD, payload: data?.count });
  } catch (error) {
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const loadVerificationHistory = (identityId, page, isReload = true) => async (dispatch, getState) => {
  dispatch({ type: isReload ? types.VERIFICATION_CHANGES_LIST_REQUEST : types.VERIFICATION_CHANGES_LIST_UPDATING });
  try {
    const filter = selectVerificationHistoryFilterSerialized(getState());
    const { data } = await getVerificationHistory(identityId, { ...filter, page });
    const currentRows = selectVerificationChangesList(getState()) || [];
    const newData = currentRows.concat(data || []);

    dispatch({ type: types.VERIFICATION_CHANGES_LIST_SUCCESS, payload: newData, isReset: isReload });
  } catch (error) {
    dispatch({ type: types.VERIFICATION_CHANGES_LIST_FAILURE, error });
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};

export const clearVerificationHistory = () => async (dispatch) => {
  dispatch({ type: types.VERIFICATION_CHANGES_LIST_CLEAR });
};

export const updateVerificationHistoryAgentNote = (identityId, eventId, value) => async (dispatch, getState) => {
  dispatch({ type: types.VERIFICATION_CHANGE_AGENT_NOTE_REQUEST });
  try {
    const agentNote = value || null;
    await saveVerificationAgentNote(identityId, eventId, { agentNote });
    const changes = selectVerificationChangesList(getState()) || [];
    const updatedChanges = changes.map((item) => {
      if (item?._id === eventId) {
        return {
          ...item,
          agentNote,
        };
      }

      return item;
    });

    dispatch({ type: types.VERIFICATION_CHANGE_AGENT_NOTE_SUCCESS, payload: updatedChanges, isReset: true });
  } catch (error) {
    dispatch({ type: types.VERIFICATION_CHANGE_AGENT_NOTE_FAILURE, error });
    notification.error(ErrorMessages.ERROR_COMMON);
    throw error;
  }
};
