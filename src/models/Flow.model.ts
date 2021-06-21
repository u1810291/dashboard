import { InputValidationCheck } from 'apps/imageValidation/models/imageValidation.model';
import { get } from 'lodash';
import { DocumentTypes } from 'models/Document.model';
import { DocumentStepTypes } from 'models/Step.model';
import { VerificationPatterns } from './VerificationPatterns.model';

export const MAX_NUMBER_OF_FLOWS = 100;

export function getNewFlowId(merchantFlowsModel, currentFlowId) {
  const currentIndex = merchantFlowsModel.value.findIndex((flow) => flow.id === currentFlowId);
  const newIndex = currentIndex ? currentIndex - 1 : currentIndex + 1;
  return get(merchantFlowsModel, `value[${newIndex}].id`, currentFlowId);
}

export interface IFlow {
  ageThreshold?: number,
  computations?: string[],
  createdAt?: string,
  denyUploadsFromMobileGallery?: boolean,
  digitalSignature?: 'nom151' | 'none',
  facematchThreshold?: number,
  id?: string,
  inputTypes?: { id?: string }[],
  inputValidationChecks?: InputValidationCheck[],
  logoUrl?: string,
  name?: string,
  policyInterval?: string,
  postponedTimeout?: string,
  pinnedCountries?: string[],
  style?: {
    color?: string,
    language?: string,
  },
  supportedCountries?: string[],
  updatedAt?: string,
  verificationSteps?: DocumentTypes[][],
  verificationPatterns?: VerificationPatterns,
}

// TODO: @ggrigorev use enum for keys and move to model
export const GovCheckStepsVerificationPatterns = [
  DocumentStepTypes.ArgentinianDni,
  DocumentStepTypes.ArgentinianRenaper,
  DocumentStepTypes.BolivianOep,
  DocumentStepTypes.BrazilianCpf,
  DocumentStepTypes.ColombianRegistraduria,
  DocumentStepTypes.ChileanRegistroCivil,
  DocumentStepTypes.CostaRicanSocialSecurity,
  DocumentStepTypes.CostaRicanTse,
  DocumentStepTypes.DominicanJce,
  DocumentStepTypes.ParaguayanRcp,
  DocumentStepTypes.EcuadorianRegistroCivil,
  DocumentStepTypes.HonduranRnp,
  DocumentStepTypes.CURP,
  DocumentStepTypes.INE,
  DocumentStepTypes.RFC,
  DocumentStepTypes.PanamenianTribunalElectoral,
  DocumentStepTypes.PeruvianReniec,
  DocumentStepTypes.SalvadorianTse,
  DocumentStepTypes.VenezuelanCne,
];

export enum FlowSettingTypes {
  Gdpr = 'gdpr',
  CertifiedTimestamp = 'certifiedTimestamp',
}

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 */
export const FlowCommonDataParser = (flow: IFlow) => ({
  checks: {},
  settings: {
    [FlowSettingTypes.Gdpr]: {
      isActive: !!flow?.policyInterval,
      value: flow?.policyInterval,
    },
    [FlowSettingTypes.CertifiedTimestamp]: {
      isActive: flow?.digitalSignature !== 'none',
      value: flow?.digitalSignature,
    },
  },
});

// TODO: @ggrigorev remove deprecated
/**
 * @deprecated
 */
export const flowFieldsFromFlowCommonDataSettings = (settingType: FlowSettingTypes, { isActive, value }) => {
  switch (settingType) {
    case FlowSettingTypes.CertifiedTimestamp:
      return {
        digitalSignature: isActive ? value : 'none',
      };
    case FlowSettingTypes.Gdpr:
      return {
        policyInterval: isActive ? value : null,
      };
    default:
      return {};
  }
};
