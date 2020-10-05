import { createSelector } from 'reselect';
import { WEBHOOKS_STORE_KEY } from './webhooks.store';

const selectWebhookStore = (state) => state[WEBHOOKS_STORE_KEY];

export const selectWebhook = createSelector(
  selectWebhookStore,
  ({ webhook }) => webhook,
);
