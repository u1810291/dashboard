import auth from 'apps/auth/state/auth.reducer';
import { AUTH_STORE_KEY, AuthActionGroups } from 'apps/auth/state/auth.store';
import collaborators from 'apps/collaborators/state/collaborator.reducer';
import { COLLABORATOR_STORE_KEY } from 'apps/collaborators/state/collaborator.store';
import overlay from 'apps/overlay/state/overlay.reducer';
import user from 'apps/user/state/user.reducer';
import { USER_STORE_KEY } from 'apps/user/state/user.store';
import { combineReducers } from 'redux';
import countries from 'state/countries/countries.reducer';
import { COUNTRIES_STORE_KEY } from 'state/countries/countries.store';
import identities from 'state/identities/identities.reducer';
import { IDENTITIES_STORE_KEY } from 'state/identities/identities.store';
import merchant from 'state/merchant/merchant.reducer';
import { MERCHANT_STORE_KEY } from 'state/merchant/merchant.store';
import metrics from 'state/metrics/metrics.reducer';
import { METRICS_STORE_KEY } from 'state/metrics/metrics.store';
import webhooks from 'state/webhooks/webhooks.reducer';
import { WEBHOOKS_STORE_KEY } from 'state/webhooks/webhooks.store';
import { OVERLAY_STORE_KEY } from '../apps/overlay/state/overlay.store';

export const appReducers = combineReducers({
  [USER_STORE_KEY]: user,
  [AUTH_STORE_KEY]: auth,
  [COLLABORATOR_STORE_KEY]: collaborators,
  [COUNTRIES_STORE_KEY]: countries,
  [IDENTITIES_STORE_KEY]: identities,
  [MERCHANT_STORE_KEY]: merchant,
  [WEBHOOKS_STORE_KEY]: webhooks,
  [METRICS_STORE_KEY]: metrics,
  [OVERLAY_STORE_KEY]: overlay,
});

export const rootReducers = (state, action) => {
  if (action.type === `${AuthActionGroups.SignOut}_REQUEST`) {
    state = undefined;
  }

  return appReducers(state, action);
};
