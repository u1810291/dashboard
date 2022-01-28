import { Logo } from 'apps/logo/models/Logo.model';
import { get } from 'lodash';
import { IESignatureFlow } from './ESignature.model';
import { DocumentTypes } from './Document.model';
import { ProductIntegrationTypes } from './Product.model';
import { IpValidation } from './IpCheck.model';
import { InputValidationCheck } from './ImageValidation.model';
import { DigitalSignatureProvider } from './DigitalSignature.model';
import { VerificationPatterns } from './VerificationPatterns.model';
import { IFlowWatchlist } from './CustomWatchlist.model';

export const MAX_NUMBER_OF_FLOWS = 100;

export function getNewFlowId(merchantFlowsModel, currentFlowId) {
  const currentIndex = merchantFlowsModel.value.findIndex((flow) => flow.id === currentFlowId);
  const newIndex = currentIndex ? currentIndex - 1 : currentIndex + 1;
  return get(merchantFlowsModel, `value[${newIndex}].id`, currentFlowId);
}

export function createEmptyFlow() {
  return {
    financialInformationBankAccountsRetrieving: [],
    financialInformationPayrollAccountsRetrieving: [],
    financialInformationWorkAccountsRetrieving: [],
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
    digitalSignature: 'none',
    emailRiskThreshold: 80,
    supportedCountries: [],
    verificationSteps: [],
    customDocumentConfig: [],
    inputValidationChecks: [
      {
        id: 'GrayscaleImage',
        isDisabled: true,
      },
      {
        id: 'SimilarImages',
        isDisabled: true,
      },
      {
        id: 'IdenticalImages',
        isDisabled: true,
      },
      {
        id: 'DocumentDetected',
        isDisabled: false,
      },
    ],
    watchlists: [],
    integrationType: 'sdk',
    name: 'Untitled Template',
    verificationPatterns: {},
    denyUploadsFromMobileGallery: false,
    createdAt: null,
    updatedAt: null,
    pinnedCountries: [
      'US',
      'MX',
    ],
    inputTypes: [],
    id: null,
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
}
