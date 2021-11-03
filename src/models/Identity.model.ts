import { getPhoneValidationExtras } from 'apps/PhoneValidation/models/PhoneValidation.model';
import { getPhoneRiskValidationExtras } from 'apps/RiskAnalysis/models/RiskAnalysis.model';
import { titleize } from 'inflection';
import { getFileContents } from 'lib/client/checks';
import { isObjectEmpty } from 'lib/object';
import { get } from 'lodash';
import { BiometricSteps, getBiometricExtras } from './Biometric.model';
import { getDocumentExtras } from './Document.model';
import { getEmailRiskExtra } from './EmailCheck.model';
import { getEmailVerificationExtra } from './EmailValidation.model';
import { FilterRangesByLocal, FilterRangeTypes, initDateFilter } from './Filter.model';
import { getIpCheckStep } from './IpCheck.model';
import { ITEMS_PER_PAGE } from './Pagination.model';
import { isChangeableStatus } from './Status.model';
import { DocumentStepTypes, getStepExtra, StepTypes } from './Step.model';
import { VerificationPatternTypes } from './VerificationPatterns.model';

export enum VerificationSummaryTitleTypes {
  document = 'document',
  additional = 'additional',
  biometric = 'biometric',
  device = 'device',
}

export enum OrderDirections {
  asc = 'asc',
  desc = 'desc',
}

export enum OrderDirectionsNum {
  asc = '-1',
  desc = '1',
}

export enum OrderKeyTypes {
  dateCreated = 'dateCreated',
  fullName = 'fullName',
  verificationFlow = 'verificationFlow',
  status = 'status',
}

export const tableColumnsData: {id: OrderKeyTypes; isSortable?: boolean}[] = [
  {
    id: OrderKeyTypes.fullName,
    isSortable: true,
  },
  {
    id: OrderKeyTypes.verificationFlow,
  },
  {
    id: OrderKeyTypes.dateCreated,
    isSortable: true,
  },
  {
    id: OrderKeyTypes.status,
    isSortable: true,
  },
];

export function getIdentityExtras(identity, countries) {
  if (!identity) {
    return null;
  }

  const verification = get(identity, '_embedded.verification') || {};

  if (!verification || isObjectEmpty(verification)) {
    return null;
  }

  const steps = get(identity, '_embedded.verification.steps') || [];
  const pooStep = getStepExtra(steps.find((item) => item.id === StepTypes.ProofOfOwnership));
  const emailValidationStep = getEmailVerificationExtra(steps.find((item) => item.id === VerificationPatternTypes.EmailOwnershipValidation));
  const emailRiskStep = getEmailRiskExtra(steps.find((item) => item.id === VerificationPatternTypes.EmailRiskValidation));
  const documents = getDocumentExtras(verification, countries, pooStep);

  let duplicateUserDetectionStep;
  let ageCheck;
  let premiumAmlWatchlistsMonitoringStep;
  documents.forEach((doc) => {
    duplicateUserDetectionStep = duplicateUserDetectionStep || doc.steps.find((item) => item.id === VerificationPatternTypes.DuplicateUserValidation);
    const documentsAgeCheck = doc.steps.find((item) => item.id === VerificationPatternTypes.AgeValidation);
    ageCheck = ageCheck?.error || !documentsAgeCheck ? ageCheck : documentsAgeCheck;

    const premiumAmlWatchlistsMonitoring = doc.steps.find((item) => item.id === DocumentStepTypes.PremiumAmlWatchlistsCheck);
    premiumAmlWatchlistsMonitoringStep = premiumAmlWatchlistsMonitoringStep || premiumAmlWatchlistsMonitoring?.data?.isMonitoringAvailable;
  });

  return {
    ...identity,
    biometric: getBiometricExtras(steps.filter((item) => BiometricSteps.includes(item.id))),
    fullName: titleize(identity.fullName || ''),
    documents,
    isEditable: isChangeableStatus(identity.status),
    ipCheck: getIpCheckStep(steps),
    duplicateUserDetectionStep,
    ageCheck,
    emailValidationStep,
    emailRiskStep,
    premiumAmlWatchlistsMonitoringStep,
    phoneValidation: getPhoneValidationExtras(steps.find((item) => item.id === VerificationPatternTypes.PhoneOwnershipValidation)),
    riskAnalysis: getPhoneRiskValidationExtras(steps.find((item) => item.id === VerificationPatternTypes.PhoneRiskValidation)),
    digitalSignature: get(identity, '_embedded.digitalSignature'),
    deviceFingerprint: get(identity, '_embedded.verification.deviceFingerprint'),
    eSignature: steps.find((item) => item.id === VerificationPatternTypes.ESignatureDocuments),
  };
}

export function getGoBackToListLink(location, listRoute: string) {
  return location.state?.from?.startsWith(listRoute)
    ? location.state.from
    : listRoute;
}

export function getDownloadableFileName(verification) {
  if (!verification) {
    return null;
  }
  const flowName = get(verification, 'flow.name', null);
  const { id, fullName: name } = verification;
  return `${flowName?.replaceAll(' ', '_').concat('_')}${name ? name.replaceAll(' ', '_') : id}`;
}

export async function getNom151FileContent(digitalSignatureData = {} as any) {
  let fileContent;
  try {
    const file = await getFileContents(digitalSignatureData.publicUrl);
    fileContent = file?.data || digitalSignatureData.publicUrl;
  } catch {
    fileContent = digitalSignatureData.publicUrl;
  }
  return fileContent;
}

export const verificationsFilterInitialState = {
  ...initDateFilter,
  search: '',
  status: [],
  flowIds: [],
  sortOrder: null,
  sortBy: null,
  offset: 0,
  limit: ITEMS_PER_PAGE,
};

export function getVerificationsFilterInitialState(registrationDate: string) {
  const period = FilterRangesByLocal[FilterRangeTypes.All].getDateRange(registrationDate);
  return {
    ...verificationsFilterInitialState,
    'dateCreated[start]': period.start,
    'dateCreated[end]': period.end,
  };
}

export const verificationsFilterStructure = {
  search: 'search',
  status: 'status',
  flowIds: 'flowIds',
  'dateCreated[start]': 'dateCreated[start]',
  'dateCreated[end]': 'dateCreated[end]',
  offset: 'offset',
  limit: 'limit',
  sortOrder: 'sortOrder',
  sortBy: 'sortBy',
  // For Customer Support
  asMerchantId: 'asMerchantId',
};

export const verificationsCleanFilter = {
  ...initDateFilter,
  status: [],
  flowIds: [],
  sortOrder: null,
  sortBy: null,
};
