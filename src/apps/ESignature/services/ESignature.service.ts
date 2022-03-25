import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { ESignatureCheckSettingsEnum, ESignatureCheckEnum, getAcceptanceCriteria, getSigMethod } from 'models/ESignature.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiPenTool } from 'react-icons/fi';
import { getStepStatus, StepStatus } from 'models/Step.model';
import { ProductBaseFlowBuilder } from 'apps/flowBuilder';
import { DeepPartial } from 'lib/object';
import { ESignatureSettings } from '../components/ESignatureSettings/ESignatureSettings';
import { ESignatureVerification } from '../components/ESignatureVerification/ESignatureVerification';

export class ESignatureService extends ProductBaseFlowBuilder implements Product {
    id = ProductTypes.ESignatureCheck;
    order = 1000;
    integrationTypes = [
      ProductIntegrationTypes.Sdk,
    ];
    icon = FiPenTool;
    checksDefault = [{
      id: ESignatureCheckEnum.SignatureCheck,
      isActive: true,
    }, {
      id: ESignatureCheckEnum.GeoRestrictionCheck,
      isActive: true,
    }, {
      id: ESignatureCheckEnum.RiskyIpCheck,
      isActive: true,
    }];

    inputs = [
      ProductInputTypes.Sign,
    ];

    component = ESignatureSettings;
    componentVerification = ESignatureVerification;

    parser(flow: IFlow, productsInGraph?: ProductTypes[]): ProductSettings<ESignatureCheckSettingsEnum> {
      const acceptanceCriteria = flow?.electronicSignature?.acceptanceCriteria;
      const isEnabled = flow.verificationPatterns[VerificationPatternTypes.ESignatureDocuments];

      const neededProductsInFlow = productsInGraph?.includes(ProductTypes.BiometricVerification) && productsInGraph?.includes(ProductTypes.DocumentVerification);

      return {
        [ESignatureCheckSettingsEnum.ESignatureEnabled]: {
          value: isEnabled,
        },
        [ESignatureCheckSettingsEnum.SignatureMethod]: {
          value: getSigMethod(acceptanceCriteria, neededProductsInFlow),
        },
        [ESignatureCheckSettingsEnum.Terms]: {
          value: flow?.electronicSignature?.templates?.list || [],
        },
        [ESignatureCheckSettingsEnum.TermsOrder]: {
          value: flow?.electronicSignature?.templates?.order || [],
        },
      };
    }

    serialize(settings: ProductSettings<ESignatureCheckSettingsEnum>): DeepPartial<IFlow> {
      return {
        electronicSignature: {
          templates: {
            order: settings.termsOrder.value,
            list: settings.terms.value,
          },
          acceptanceCriteria: getAcceptanceCriteria(settings.signatureMethod.value),
        },
        verificationPatterns: {
          [VerificationPatternTypes.ESignatureDocuments]: settings.eSignatureEnabled.value,
        },
      };
    }

    onRemove(): DeepPartial<IFlow> {
      return {
        electronicSignature: {
          templates: {
            order: [],
            list: [],
          },
          acceptanceCriteria: {
            isDocumentsRequired: false,
            isFaceMatchRequired: false,
            isFullNameRequired: false,
          },
        },
        verificationPatterns: {
          [VerificationPatternTypes.ESignatureDocuments]: false,
        },
      };
    }

    isInFlow(flow: IFlow): boolean {
      return flow?.verificationPatterns?.[VerificationPatternTypes.ESignatureDocuments];
    }

    getVerification(verification: VerificationResponse): any {
      return verification.steps.find((step) => step.id === VerificationPatternTypes.ESignatureDocuments);
    }

    hasFailedCheck(verification: VerificationResponse): boolean {
      const eSigStep = verification?.steps?.find((step) => step?.id === VerificationPatternTypes.ESignatureDocuments);
      const eSigStatus = getStepStatus(eSigStep);
      return [StepStatus.Incomplete, StepStatus.Failure].includes(eSigStatus);
    }
}
