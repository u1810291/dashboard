import * as api from 'lib/client/webhooks';
import { fromPairs, get } from 'lodash';
import { selectClientId, selectCurrentFlowId } from 'state/merchant/merchant.selectors';
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
    const clientId = selectClientId(getState());
    const flowId = selectCurrentFlowId(getState());
    const payload = await api.subscribeToWebhook(clientId, flowId, data);
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
    const clientId = selectClientId(getState());
    const payload = await api.deleteWebhook(clientId, id);
    dispatch({ type: types.WEBHOOKS_DELETE_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: types.WEBHOOKS_DELETE_FAILURE });
    throw error;
  }
};

export const getWebhooks = () => async (dispatch, getState) => {
  dispatch({ type: types.WEBHOOKS_LIST_REQUEST });
  try {
    const clientId = selectClientId(getState());
    const flowId = selectCurrentFlowId(getState());
    if (!clientId || !flowId) {
      return;
    }
    const { data } = await api.getWebhooks(clientId, flowId);
    dispatch({ type: types.WEBHOOKS_LIST_SUCCESS, payload: data || [] });
  } catch (error) {
    dispatch({ type: types.WEBHOOKS_LIST_FAILURE });
    throw error;
  }
};

export const sendWebhook = (id) => async (dispatch) => {
  dispatch({ type: types.WEBHOOK_SEND_REQUEST });
  try {
    const payload = await api.sendWebhook(id);
    dispatch({ type: types.WEBHOOK_SEND_SUCCESS, payload, id });
    return payload;
  } catch (error) {
    dispatch({ type: types.WEBHOOK_SEND_FAILURE });
    throw error;
  }
};
