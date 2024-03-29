import { selectUserId } from 'apps/user/state/user.selectors';
import { fromIsoPeriod } from 'lib/date';
import { selectLoadableValue, selectModelValue } from 'lib/loadable.selectors';
import { BiometricTypes } from 'models/Biometric.model';
import { IFlow } from 'models/Flow.model';
import { StepsOptions } from 'apps/Analytics';
import { DEFAULT_LOCALE, LanguageList, SupportedLocales } from 'models/Intl.model';
import { Loadable } from 'models/Loadable.model';
import { PasswordExpirationPolicyDurationValue } from 'models/Settings.model';
import { IMerchant, MerchantId, MerchantTags, IMerchantSettings, IAgentNotesConfig } from 'models/Merchant.model';
import { createSelector } from 'reselect';
import { CollaboratorRoles } from 'models/Collaborator.model';
import { MERCHANT_STORE_KEY, MerchantStore, SliceNameTypes } from './merchant.store';

export const selectMerchantStore = (state: { MERCHANT_STORE_KEY: MerchantStore }) => state[MERCHANT_STORE_KEY];

// -- merchant

export const selectMerchantModel = createSelector<[typeof selectMerchantStore], Loadable<IMerchant>>(
  selectMerchantStore,
  (store): Loadable<IMerchant> => store[SliceNameTypes.Merchant],
);

export const selectMerchantId = createSelector<[typeof selectMerchantModel], MerchantId>(
  selectMerchantModel,
  selectModelValue((merchant: IMerchant): string => merchant.id),
);

export const selectMerchantOnboarding = createSelector<[typeof selectMerchantModel], StepsOptions[]>(
  selectMerchantModel,
  selectModelValue((merchant: IMerchant) => merchant.onboardingSteps),
);

export const selectOwnerId = createSelector(
  selectMerchantModel,
  selectModelValue((merchant: IMerchant) => merchant?.owner),
);

export const selectIsOwnerModel = createSelector<[typeof selectMerchantModel, typeof selectUserId], Loadable<boolean>>(
  selectMerchantModel,
  selectUserId,
  selectLoadableValue((merchant, userId) => {
    const collaborators = merchant.collaborators || [];
    return collaborators.findIndex((item) => item.user === userId && item.role > 1) < 0;
  }),
);

export const selectUserRole = createSelector<[typeof selectMerchantModel, typeof selectUserId], CollaboratorRoles | null>(
  selectMerchantModel,
  selectUserId,
  selectModelValue((merchant, userId) => {
    if (!merchant) {
      return null;
    }

    if (userId === merchant.owner) {
      return CollaboratorRoles.ADMIN;
    }

    const collaborators = merchant.collaborators || [];
    const collaborator = collaborators.find((item) => item?.user === userId);
    return collaborator?.role;
  }),
);

export const selectMerchantName = createSelector(
  selectMerchantModel,
  selectModelValue((merchant) => merchant.displayName),
);

// TODO: @pabloscdo: Remove this forced typing when Redux gets typed
export const selectMerchantCreatedAt = createSelector<[typeof selectMerchantModel], string>(
  selectMerchantModel,
  selectModelValue((merchant) => merchant.createdAt),
);

export const selectMerchantBusinessName = createSelector<[typeof selectMerchantModel], string>(
  selectMerchantModel,
  selectModelValue((merchant) => merchant.businessName),
);

export const selectMerchantEmail = createSelector(
  selectMerchantModel,
  selectModelValue((merchant) => merchant?.indexFields?.ownerEmail),
);

export const selectIsBlockedModel = createSelector(
  selectMerchantModel,
  selectLoadableValue((merchant) => !!merchant.blockedAt),
);

export const selectMerchantLegalName = createSelector(
  selectMerchantModel,
  selectModelValue((merchant) => merchant.legalName),
);

export const selectMerchantBrandName = createSelector(
  selectMerchantModel,
  selectModelValue((merchant) => merchant.brandName),
);

export const selectMerchantLegalRegNumber = createSelector(
  selectMerchantModel,
  selectModelValue((merchant) => merchant.legalRegNumber),
);

export const selectMerchantLegalAddress = createSelector(
  selectMerchantModel,
  selectModelValue((merchant) => merchant.legalAddress),
);

export const selectMerchantTags = createSelector<[typeof selectMerchantModel], MerchantTags[]>(
  selectMerchantModel,
  selectModelValue((merchant: IMerchant): MerchantTags[] => merchant.tags || []),
);

// -- app

const selectAppModel = createSelector(
  selectMerchantStore,
  (merchant) => merchant[SliceNameTypes.App],
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

// -- settings

export const selectMerchantSettings = createSelector<[typeof selectMerchantModel], IMerchantSettings>(
  selectMerchantModel,
  selectModelValue((merchant) => merchant.settings),
);

export const selectMerchantAgentNotesConfig = createSelector<[typeof selectMerchantSettings], IAgentNotesConfig>(
  selectMerchantSettings,
  (settings) => settings?.agentNotesConfig,
);

export const selectMerchantPasswordExpirationPolicy = createSelector<[typeof selectMerchantModel], PasswordExpirationPolicyDurationValue>(
  selectMerchantModel,
  selectModelValue((merchant) => merchant?.passwordExpirationPolicy),
);

// -- configuration

export const selectConfigurationModel = createSelector(
  selectMerchantStore,
  (merchant) => merchant[SliceNameTypes.Configuration],
);

// -- dashboard

export const selectDashboardModel = createSelector(
  selectConfigurationModel,
  selectLoadableValue((cfg) => cfg.dashboard),
);

// TODO @dkchv: move to intl feature
export const selectLanguage = createSelector<[typeof selectDashboardModel], SupportedLocales>(
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

export const selectMerchantCustomDocumentsModel = createSelector(
  selectMerchantStore,
  (merchant) => merchant[SliceNameTypes.CustomDocuments],
);

// -- flows

export const selectMerchantFlowsModel = createSelector(
  selectMerchantStore,
  (merchant) => merchant[SliceNameTypes.Flows],
);

export const selectMerchantFlowList = createSelector(
  selectMerchantFlowsModel,
  (model): IFlow[] => model.value || [],
);

export const selectCurrentFlowId = createSelector(
  selectMerchantStore,
  (store) => store.currentFlow,
);

export const selectCurrentFlow = createSelector<[typeof selectMerchantFlowsModel, typeof selectCurrentFlowId], IFlow>(
  selectMerchantFlowsModel,
  selectCurrentFlowId,
  selectModelValue((model, id) => model.find((item) => item.id === id)),
);

export const selectSupportedCountries = createSelector(
  selectCurrentFlow,
  (flow) => flow.supportedCountries || [],
);

export const selectUploadDenial = createSelector(
  selectCurrentFlow,
  (flow) => flow.denyUploadsFromMobileGallery,
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

export const selectIsVoiceLiveness = createSelector(
  selectBiometricPattern,
  (pattern) => pattern === BiometricTypes.voiceLiveness,
);

export const selectNom151Check = createSelector(
  selectCurrentFlow,
  (flow) => flow.digitalSignature,
);

export const selectLogoModel = createSelector(
  selectCurrentFlow,
  (flow) => flow.logo || {},
);

export const selectValidationChecks = createSelector(
  selectCurrentFlow,
  (flow) => flow.inputValidationChecks || [],
);

export const selectPostponedTimeout = createSelector(
  selectCurrentFlow,
  (flow) => flow.postponedTimeout,
);

export const selectPhoneRiskAnalysisThreshold = createSelector(
  selectCurrentFlow,
  (flow) => flow.phoneRiskAnalysisThreshold,
);
