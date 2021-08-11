import { InputValidationCheck } from 'apps/imageValidation/models/imageValidation.model';
import { Logo } from 'apps/logo/models/Logo.model';
import { get } from 'lodash';
import { DocumentTypes } from 'models/Document.model';
import { ProductIntegrationTypes } from 'models/Product.model';
import { IpValidation } from './IpCheck.model';
import { DigitalSignatureProvider } from './DigitalSignature.model';
import { VerificationPatterns } from './VerificationPatterns.model';

export const MAX_NUMBER_OF_FLOWS = 100;

export function getNewFlowId(merchantFlowsModel, currentFlowId) {
  const currentIndex = merchantFlowsModel.value.findIndex((flow) => flow.id === currentFlowId);
  const newIndex = currentIndex ? currentIndex - 1 : currentIndex + 1;
  return get(merchantFlowsModel, `value[${newIndex}].id`, currentFlowId);
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
  verificationSteps?: DocumentTypes[][];
  verificationPatterns?: Partial<VerificationPatterns>;
  integrationType?: ProductIntegrationTypes;
  amlWatchlistsFuzzinessThreshold?: number;
}
