import * as api from 'lib/client/webhooks';
import { fromPairs, get } from 'lodash';
import { selectAuthToken } from 'state/auth/auth.selectors';
import { selectClientId } from 'state/merchant/merchant.selectors';
import { createTypesSequence } from 'state/utils';

export const types = {
  ...createTypesSequence('WEBHOOKS_SUBSCRIBE'),
  ...createTypesSequence('WEBHOOKS_DELETE'),
  ...createTypesSequence('WEBHOOKS_LIST'),
  ...createTypesSequence('WEBHOOK_SEND'),
};

export const subscribeToWebhook = (data) => async (dispatch, getState) => {
  dispatch({ type: types.WEBHOOKS_SUBSCRIBE_REQUEST });
  try {
    const state = getState();
    const token = selectAuthToken(state);
    const clientId = selectClientId(state);
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

export const deleteWebhook = (id) => async (dispatch, getState) => {
  dispatch({ type: types.WEBHOOKS_DELETE_REQUEST });
  try {
    const state = getState();
    const token = selectAuthToken(state);
    const clientId = selectClientId(state);
    const payload = await api.deleteWebhook(token, clientId, id);
    dispatch({ type: types.WEBHOOKS_DELETE_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: types.WEBHOOKS_DELETE_FAILURE });
    throw error;
  }
};

export const getWebhooks = () => async (dispatch, getState) => {
  dispatch({ type: types.WEBHOOKS_LIST_REQUEST });
  try {
    const state = getState();
    const token = selectAuthToken(state);
    const clientId = selectClientId(state);
    const payload = await api.getWebhooks(token, clientId);
    dispatch({ type: types.WEBHOOKS_LIST_SUCCESS, payload, clientId });
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
