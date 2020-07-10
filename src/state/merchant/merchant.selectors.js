import { selectUserId } from 'apps/user/state/user.selectors';
import { fromIsoPeriod } from 'lib/date';
import { selectLoadableValue, selectModelValue } from 'lib/loadable.selectors';
import { createSelector } from 'reselect';
import { MERCHANT_STORE_KEY, SliceNames } from 'state/merchant/merchant.model';
import { DEFAULT_LOCALE } from 'models/Intl.model';

const selectMerchantStore = (state) => state[MERCHANT_STORE_KEY];

// -- merchant

export const selectMerchantModel = createSelector(
  selectMerchantStore,
  (merchant) => merchant[SliceNames.Merchant],
);

export const selectMerchantId = createSelector(
  selectMerchantModel,
  selectModelValue((merchant) => merchant.id),
);

export const selectIsOwnerModel = createSelector(
  selectMerchantModel,
  selectUserId,
  selectLoadableValue((merchant, userId) => {
    const collaborators = merchant.collaborators || [];
    return collaborators.findIndex((item) => item.user === userId && item.role === 2) < 0;
  }),
);

export const selectMerchantName = createSelector(
  selectMerchantModel,
  selectModelValue((merchant) => merchant.displayName),
);

export const selectIsBlockedModel = createSelector(
  selectMerchantModel,
  selectLoadableValue((merchant) => !!merchant.blockedAt),
);

// -- app

const selectAppModel = createSelector(
  selectMerchantStore,
  (merchant) => merchant[SliceNames.App],
);

export const selectAppLastModel = createSelector(
  selectAppModel,
  selectLoadableValue((app) => app.slice(-1).pop() || {}),
);

export const selectClientIdModel = createSelector(
  selectAppLastModel,
  selectLoadableValue((app) => app.clientId),
);

export const selectClientId = createSelector(
  selectClientIdModel,
  selectModelValue(),
);

// -- configuration

export const selectConfigurationModel = createSelector(
  selectMerchantStore,
  (merchant) => merchant[SliceNames.Configuration],
);

// -- dashboard

export const selectDashboardModel = createSelector(
  selectConfigurationModel,
  selectLoadableValue((cfg) => cfg.dashboard),
);

// TODO @dkchv: move to intl feature
export const selectLanguage = createSelector(
  selectDashboardModel,
  selectModelValue((dashboard) => dashboard.language || DEFAULT_LOCALE),
);

export const selectShouldPassOnboarding = createSelector(
  selectDashboardModel,
  selectLoadableValue((dashboard) => dashboard.shouldPassOnboarding),
);

// -- flows

export const selectMerchantFlowsModel = createSelector(
  selectMerchantStore,
  (merchant) => merchant[SliceNames.Flows],
);

export const selectCurrentFlowId = createSelector(
  selectMerchantStore,
  (store) => store.currentFlow,
);

export const selectCurrentFlow = createSelector(
  selectMerchantFlowsModel,
  selectCurrentFlowId,
  selectModelValue((model, id) => model.find((item) => item.id === id)),
);

export const selectStyleModel = createSelector(
  selectCurrentFlow,
  (cfg) => cfg.style,
);

export const selectColor = createSelector(
  selectStyleModel,
  (style) => style.color,
);

export const selectPolicyInterval = createSelector(
  selectCurrentFlow,
  (flow) => fromIsoPeriod(flow.policyInterval),
);

export const selectGovChecks = createSelector(
  selectCurrentFlow,
  (flow) => flow.verificationPatterns,
);

export const selectIpCheck = createSelector(
  selectGovChecks,
  (flow) => flow['ip-validation'],
);

export const selectLogoModel = createSelector(
  selectCurrentFlow,
  (flow) => flow.logoUrl,
);
