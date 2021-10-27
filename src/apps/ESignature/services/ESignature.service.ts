import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/Verification.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiPenTool } from 'react-icons/fi';
import { ESignatureSettings } from '../components/ESignatureSettings/ESignatureSettings';
import { ESignatureVerification } from '../components/ESignatureVerification/ESignatureVerification';
import { ESignatureCheckSettingsTypes, ESignatureCheckTypes, ESignatureRadioOptions } from '../models/ESignature.model';

export class ESignatureService extends ProductBaseService implements Product {
    id = ProductTypes.ESignatureCheck;
    order = 1000;
    integrationTypes = [
      ProductIntegrationTypes.Sdk,
    ];
    icon = FiPenTool;
    checksDefault = [{
      id: ESignatureCheckTypes.SignatureCheck,
      isActive: true,
    }, {
      id: ESignatureCheckTypes.GeoRestrictionCheck,
      isActive: true,
    }, {
      id: ESignatureCheckTypes.RiskyIpCheck,
      isActive: true,
    }];

    inputs = [
      ProductInputTypes.Sign,
    ];

    component = ESignatureSettings;
    componentVerification = ESignatureVerification;

    parser(flow: IFlow, productsInGraph?: ProductTypes[]): ProductSettings<ESignatureCheckSettingsTypes> {
      const acceptanceCriteria = flow?.electronicSignature?.acceptanceCriteria;
      const isEnabled = flow.verificationPatterns[VerificationPatternTypes.ESignatureDocuments];

      const neededProductsInFlow = productsInGraph?.includes(ProductTypes.BiometricVerification) && productsInGraph?.includes(ProductTypes.DocumentVerification);
      const hasFlowSettings = acceptanceCriteria?.isFaceMatchRequired && acceptanceCriteria?.isDocumentsRequired;

      const sigMethodValue = neededProductsInFlow && hasFlowSettings
        ? ESignatureRadioOptions.FaceAndDocumentSignature
        : ESignatureRadioOptions.NameTyping;

      return {
        [ESignatureCheckSettingsTypes.ESignatureEnabled]: {
          value: isEnabled,
        },
        [ESignatureCheckSettingsTypes.SignatrureMethod]: {
          value: sigMethodValue,
        },
        [ESignatureCheckSettingsTypes.Terms]: {
          value: flow?.electronicSignature?.templates?.list || [],
        },
        [ESignatureCheckSettingsTypes.TermsOrder]: {
          value: flow?.electronicSignature?.templates?.order || [],
        },
      };
    }

    serialize(settings: ProductSettings<ESignatureCheckSettingsTypes>): Partial<IFlow> {
      const needFaceAndDocs = settings.signatureMethod.value === ESignatureRadioOptions.FaceAndDocumentSignature;
      return {
        electronicSignature: {
          templates: {
            order: settings.termsOrder.value,
            list: settings.terms.value,
          },
          acceptanceCriteria: {
            isDocumentsRequired: needFaceAndDocs,
            isFaceMatchRequired: needFaceAndDocs,
            isFullNameRequired: true,
          },
        },
        verificationPatterns: {
          [VerificationPatternTypes.ESignatureDocuments]: settings.eSignatureEnabled.value,
        },
      };
    }

    onRemove(): Partial<IFlow> {
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
      return flow.verificationPatterns[VerificationPatternTypes.ESignatureDocuments];
    }

    getVerification(verification: VerificationResponse): any {
      return verification.steps.find((step) => step.id === VerificationPatternTypes.ESignatureDocuments);
    }
}
