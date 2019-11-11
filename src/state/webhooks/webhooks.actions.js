import * as api from 'lib/client/webhooks';
import { fromPairs, get } from 'lodash';
import { selectAuthToken } from 'state/auth/auth.selectors';
import { createTypesSequence } from 'state/utils';

export const types = {
  ...createTypesSequence('WEBHOOKS_SUBSCRIBE'),
  ...createTypesSequence('WEBHOOKS_DELETE'),
  ...createTypesSequence('WEBHOOKS_LIST'),
  ...createTypesSequence('WEBHOOK_SEND'),
};

export const subscribeToWebhook = (clientId, data) => async (dispatch, getState) => {
  dispatch({ type: types.WEBHOOKS_SUBSCRIBE_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.subscribeToWebhook(token, clientId, data);
    dispatch({ type: types.WEBHOOKS_SUBSCRIBE_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.WEBHOOKS_SUBSCRIBE_FAILURE });
    const details = get(error, 'response.data.details');
    if (details) {
      throw fromPairs(details.map((detail) => [detail.path.join('.'), detail.message]));
    } else {
      throw error;
    }
  }
};

export const deleteWebhook = (clientId, id) => async (dispatch, getState) => {
  dispatch({ type: types.WEBHOOKS_DELETE_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.deleteWebhook(token, clientId, id);
    dispatch({ type: types.WEBHOOKS_DELETE_SUCCESS, payload });
    return payload;
  } catch (error) {
    dispatch({ type: types.WEBHOOKS_DELETE_FAILURE });
    throw error;
  }
};

export const getWebhooks = (clientId) => async (dispatch, getState) => {
  dispatch({ type: types.WEBHOOKS_LIST_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.getWebhooks(token, clientId);
    dispatch({ type: types.WEBHOOKS_LIST_SUCCESS, payload, clientId });
    return payload;
  } catch (error) {
    dispatch({ type: types.WEBHOOKS_LIST_FAILURE });
    throw error;
  }
};

export const sendWebhook = (id) => async (dispatch, getState) => {
  dispatch({ type: types.WEBHOOK_SEND_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const payload = await api.sendWebhook(token, id);
    dispatch({ type: types.WEBHOOK_SEND_SUCCESS, payload, id });
    return payload;
  } catch (error) {
    dispatch({ type: types.WEBHOOK_SEND_FAILURE });
    throw error;
  }
};
