import { Logo } from 'apps/logo/models/Logo.model';
import { get } from 'lodash';
import { BiometricTypes } from 'models/Biometric.model';
import { DocumentTypes } from 'models/Document.model';
import { ProductIntegrationTypes } from 'models/Product.model';
import { IFacematchFlow } from 'apps/FacematchService';
import { FormatMessage } from 'apps/intl';
import { VerificationCustomFieldsInputData } from 'apps/CustomField';
import { IESignatureFlow } from './ESignature.model';
import { IpValidation } from './IpCheckOld.model';
import { InputValidationCheck, InputValidationType } from './ImageValidation.model';
import { DigitalSignatureProvider } from './DigitalSignature.model';
import { VerificationPatterns, VerificationPatternTypes } from './VerificationPatterns.model';
import { IFlowWatchlist } from './CustomWatchlist.model';

export const MAX_NUMBER_OF_FLOWS = 100;

export function getNewFlowId(merchantFlowsModel, currentFlowId) {
  const currentIndex = merchantFlowsModel.value.findIndex((flow) => flow.id === currentFlowId);
  const newIndex = currentIndex ? currentIndex - 1 : currentIndex + 1;
  return get(merchantFlowsModel, `value[${newIndex}].id`, currentFlowId);
}

export function createEmptyFlow(formatMessage: FormatMessage, data?: Partial<IFlow>): IFlow {
  return {
    style: {
      color: 'blue',
      language: 'en',
    },
    ipValidation: {
      allowedRegions: [],
    },
    amlWatchlistsFuzzinessThreshold: 50,
    computations: [
      'age',
      'isDocumentExpired',
    ],
    digitalSignature: DigitalSignatureProvider.NONE,
    emailRiskThreshold: 80,
    supportedCountries: [],
    verificationSteps: [],
    inputValidationChecks: [
      {
        id: InputValidationType.GrayscaleImage,
        isDisabled: true,
      },
      {
        id: InputValidationType.SimilarImages,
        isDisabled: true,
      },
      {
        id: InputValidationType.IdenticalImages,
        isDisabled: true,
      },
      {
        id: InputValidationType.DocumentDetected,
        isDisabled: false,
      },
    ],
    watchlists: [],
    integrationType: ProductIntegrationTypes.Sdk,
    name: formatMessage('Untitled.template'),
    denyUploadsFromMobileGallery: false,
    verificationPatterns: {
      [VerificationPatternTypes.Biometrics]: BiometricTypes.none,
    },
    ...data,
  };
}

export interface FlowStyle {
  color?: string;
  language?: string;
}

export type IFlowPhoneOwnership = {
  cooldownTimeout: 'PT1M' | string;
  codeAttemptLimit: number;
  codeSendLimit: number;
  companyName: string;
}

export type IFlowEmailOwnership = {
  companyName: string;
  emailFrom?: string;
}

export type IFlowSystemSettings = {
  useTaskQueueProcessing: boolean;
}

export type IFlowComputationTypes = 'age' | 'isDocumentExpired' | string;

export interface IFlow {
  id?: string;
  // TODO @dkchv: !!!
  _id?: string;
  ageThreshold?: number;
  phoneOwnership?: Partial<IFlowPhoneOwnership>;
  phoneRiskAnalysisThreshold?: number;
  emailOwnership?: IFlowEmailOwnership;
  emailRiskThreshold?: number;
  computations?: IFlowComputationTypes[];
  createdAt?: string;
  denyUploadsFromMobileGallery?: boolean;
  digitalSignature?: DigitalSignatureProvider;
  facematchThreshold?: number;
  reFacematchThreshold?: number;
  ipValidation?: IpValidation;
  inputTypes?: { id?: string }[];
  inputValidationChecks?: InputValidationCheck[];
  logo?: Logo;
  name?: string;
  policyInterval?: string;
  postponedTimeout?: string;
  pinnedCountries?: string[];
  style?: FlowStyle;
  customFieldsConfig?: VerificationCustomFieldsInputData;
  supportedCountries?: string[];
  updatedAt?: string;
  verificationSteps?: (DocumentTypes | string)[][];
  verificationPatterns?: Partial<VerificationPatterns>;
  integrationType?: ProductIntegrationTypes;
  amlWatchlistsFuzzinessThreshold?: number;
  watchlists?: IFlowWatchlist[];
  electronicSignature?: IESignatureFlow;
  financialInformationBankAccountsRetrieving?: {
    countryCodes: string[];
  };
  financialInformationWorkAccountsRetrieving?: {
    countryCodes: string[];
  };
  financialInformationPayrollAccountsRetrieving?: {
    countryCodes: string[];
  };
  facematchServiceConfig?: IFacematchFlow;
}
