import { last } from 'lodash';
import { selectClientIdModel } from 'state/merchant/merchant.selectors';

export function selectWebhook(state) {
  const clientIdModel = selectClientIdModel(state);

  if (!clientIdModel.isLoaded) {
    return {};
  }

  return last(state.webhooks.webhooks[clientIdModel.value]) || {};
}
