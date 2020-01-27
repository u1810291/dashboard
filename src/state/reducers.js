import { AUTH_STORE_KEY, AuthActionGroups } from 'apps/auth/state/auth.model';
import auth from 'apps/auth/state/auth.reducer';
import { BILLING_STORE_KEY } from 'apps/billing/state/billing.model';
import billing from 'apps/billing/state/billing.reducer';
import { USER_STORE_KEY } from 'apps/user/state/user.model';
import user from 'apps/user/state/user.reducer';
import { combineReducers } from 'redux';
import { COLLABORATOR_STORE_KEY } from 'state/collaborators/collaborator.model';
import collaborators from 'state/collaborators/collaborator.reducer';
import { COUNTRIES_STORE_KEY } from 'state/countries/countries.model';
import countries from 'state/countries/countries.reducer';
import { IDENTITIES_STORE_KEY } from 'state/identities/identities.model';
import identities from 'state/identities/identities.reducer';
import { MERCHANT_STORE_KEY } from 'state/merchant/merchant.model';
import merchant from 'state/merchant/merchant.reducer';
import { METRICS_STORE_KEY } from 'state/metrics/metrics.model';
import metrics from 'state/metrics/metrics.reducer';
import { WEBHOOKS_STORE_KEY } from 'state/webhooks/webhooks.model';
import webhooks from 'state/webhooks/webhooks.reducer';

export const appReducers = combineReducers({
  [USER_STORE_KEY]: user,
  [AUTH_STORE_KEY]: auth,
  [COLLABORATOR_STORE_KEY]: collaborators,
  [COUNTRIES_STORE_KEY]: countries,
  [IDENTITIES_STORE_KEY]: identities,
  [MERCHANT_STORE_KEY]: merchant,
  [WEBHOOKS_STORE_KEY]: webhooks,
  [METRICS_STORE_KEY]: metrics,
  [BILLING_STORE_KEY]: billing,
});

export const rootReducers = (state, action) => {
  if (action.type === `${AuthActionGroups.SignOut}_REQUEST`) {
    state = undefined;
  }

  return appReducers(state, action);
};
