import { selectUserId } from 'apps/user/state/user.selectors';
import { fromIsoPeriod } from 'lib/date';
import { selectLoadableValue, selectModelValue } from 'lib/loadable.selectors';
import { BiometricTypes } from 'models/Biometric.model';
import { VerificationStepTypes } from 'models/Identity.model';
import { DEFAULT_LOCALE, LanguageList } from 'models/Intl.model';
import { createSelector } from 'reselect';
import { ChecksList } from 'apps/checks/models/Checks.model';
import { MERCHANT_STORE_KEY, SliceNames } from './merchant.store';
import { MerchantTags } from '../../models/Merchant.model';

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

export const selectMerchantCreatedAt = createSelector(
  selectMerchantModel,
  selectModelValue((merchant) => merchant.createdAt),
);

export const selectMerchantBusinessName = createSelector(
  selectMerchantModel,
  selectModelValue((merchant) => merchant.businessName),
);

export const selectIsBlockedModel = createSelector(
  selectMerchantModel,
  selectLoadableValue((merchant) => !!merchant.blockedAt),
);

export const selectMerchantTags = createSelector(
  selectMerchantModel,
  selectModelValue((merchant) => merchant.tags || []),
);

export const selectDenialUploadAvailability = createSelector(
  selectMerchantTags,
  (tags) => tags.includes(MerchantTags.CanUseDenyUploadFromGallery),
);

export const selectAvailableChecks = createSelector(
  selectMerchantTags,
  (tags) => ChecksList.filter((check) => !check.availableOnlyForMerchantTag || tags.includes(check.availableOnlyForMerchantTag)),
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
  selectModelValue((dashboard) => {
    const locale = dashboard.language;
    const isSupported = !!LanguageList.find((item) => item.locale === locale);
    if (!isSupported) {
      console.warn(`warn: Locale ${locale} not found`);
      return DEFAULT_LOCALE;
    }
    return locale;
  }),
);

// -- flows

export const selectMerchantFlowsModel = createSelector(
  selectMerchantStore,
  (merchant) => merchant[SliceNames.Flows],
);

export const selectMerchantFlowList = createSelector(
  selectMerchantFlowsModel,
  (model) => model.value,
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

export const selectUploadDenial = createSelector(
  selectCurrentFlow,
  (flow) => flow.denyUploadsFromMobileGallery,
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

export const selectVerificationPattern = createSelector(
  selectCurrentFlow,
  (flow) => flow.verificationPatterns,
);

export const selectBiometricPattern = createSelector(
  selectVerificationPattern,
  (pattern) => pattern.biometrics || BiometricTypes.none,
);

export const selectIpCheck = createSelector(
  selectVerificationPattern,
  (flow) => flow[VerificationStepTypes.IpValidation],
);

export const selectDuplicateUserDetectionCheck = createSelector(
  selectVerificationPattern,
  (flow) => flow[VerificationStepTypes.DuplicateUserValidation],
);

export const selectComplyAdvantageIntegratedCheck = createSelector(
  selectVerificationPattern,
  (flow) => flow[VerificationStepTypes.ComplyAdvantageValidation],
);

export const selectNom151Check = createSelector(
  selectCurrentFlow,
  (flow) => flow.digitalSignature,
);

export const selectLogoModel = createSelector(
  selectCurrentFlow,
  (flow) => flow.logoUrl,
);

export const selectValidationChecks = createSelector(
  selectCurrentFlow,
  (flow) => flow.inputValidationChecks || [],
);
