import { last } from 'lodash';
import { selectMerchantApps } from '../merchant/merchant.selectors';

export function selectWebhook(state) {
  const { clientId } = selectMerchantApps(state);
  return last(state.webhooks.webhooks[clientId]) || {};
}
