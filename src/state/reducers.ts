import { agentHistoryReducer } from 'apps/agentHistory/state/agentHistory.reducer';
import { AGENT_HISTORY_STORE_KEY } from 'apps/agentHistory/state/agentHistory.store';
import metrics from 'apps/Analytics/state/Analytics.reducer';
import { METRICS_STORE_KEY } from 'apps/Analytics/state/Analytics.store';
import auth from 'apps/auth/state/auth.reducer';
import { AUTH_STORE_KEY, AuthActionGroups } from 'apps/auth/state/auth.store';
import collaborators from 'apps/collaborators/state/collaborator.reducer';
import { COLLABORATOR_STORE_KEY } from 'apps/collaborators/state/collaborator.store';
import dashboard from 'apps/dashboard/state/dashboard.reducer';
import { DASHBOARD_STORE_KEY } from 'apps/dashboard/state/dashboard.store';
import { flowBuilderReducer } from 'apps/flowBuilder/store/FlowBuilder.reducer';
import { FLOW_BUILDER_STORE_KEY } from 'apps/flowBuilder/store/FlowBuilder.store';
import overlay from 'apps/overlay/state/overlay.reducer';
import { OVERLAY_STORE_KEY } from 'apps/overlay/state/overlay.store';
import { productReducer } from 'apps/Product/store/Product.reducer';
import { PRODUCT_STORE_KEY } from 'apps/Product/store/Product.store';
import { reviewModeReducer } from 'apps/reviewMode/state/reviewMode.reducers';
import { REVIEW_MODE_KEY } from 'apps/reviewMode/state/reviewMode.store';
import user from 'apps/user/state/user.reducer';
import { USER_STORE_KEY } from 'apps/user/state/user.store';
import verificationHistory from 'apps/verificationHistory/state/verificationHistory.reducer';
import { VERIFICATION_HISTORY_STORE_KEY } from 'apps/verificationHistory/state/verificationHistory.store';
import { combineReducers } from 'redux';
import countries from 'state/countries/countries.reducer';
import { COUNTRIES_STORE_KEY } from 'state/countries/countries.store';
import identities from 'state/identities/identities.reducer';
import { IDENTITIES_STORE_KEY } from 'state/identities/identities.store';
import merchant from 'state/merchant/merchant.reducer';
import { MERCHANT_STORE_KEY } from 'state/merchant/merchant.store';
import webhooks from 'state/webhooks/webhooks.reducer';
import { WEBHOOKS_STORE_KEY } from 'state/webhooks/webhooks.store';
import { identityProfileReducer } from 'apps/IdentityProfile/store/IdentityProfie.reducer';
import { IDENTITY_PROFILE_STORE_KEY } from 'apps/IdentityProfile/store/IdentityProfile.store';
import { verificationReducer } from 'apps/Verification/state/Verification.reducer';
import { VERIFICATION_STORE_KEY } from 'apps/Verification/state/Verification.store';

export const appReducers = combineReducers({
  [USER_STORE_KEY]: user,
  [AUTH_STORE_KEY]: auth,
  [DASHBOARD_STORE_KEY]: dashboard,
  [COLLABORATOR_STORE_KEY]: collaborators,
  [COUNTRIES_STORE_KEY]: countries,
  [IDENTITIES_STORE_KEY]: identities,
  [MERCHANT_STORE_KEY]: merchant,
  [WEBHOOKS_STORE_KEY]: webhooks,
  [METRICS_STORE_KEY]: metrics,
  [VERIFICATION_HISTORY_STORE_KEY]: verificationHistory,
  [AGENT_HISTORY_STORE_KEY]: agentHistoryReducer,
  [OVERLAY_STORE_KEY]: overlay,
  [REVIEW_MODE_KEY]: reviewModeReducer,
  [FLOW_BUILDER_STORE_KEY]: flowBuilderReducer,
  [PRODUCT_STORE_KEY]: productReducer,
  [IDENTITY_PROFILE_STORE_KEY]: identityProfileReducer,
  [VERIFICATION_STORE_KEY]: verificationReducer,
});

export const rootReducers = (state, action) => {
  let newState = state;
  if (action.type === `${AuthActionGroups.SignOut}_REQUEST`) {
    newState = undefined;
  }

  return appReducers(newState, action);
};
