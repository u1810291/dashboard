import { InputValidationType } from 'apps/imageValidation/models/imageValidation.model';
import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductIntegrationTypes, ProductTypes } from 'models/Product.model';
import { FiImage } from 'react-icons/fi';
import { DocumentVerificationSettings2 } from '../components/DocumentVerificationSettings2/DocumentVerificationSettings2';
import { DocumentVerificationCheckTypes, DocumentVerificationConfig, DocumentVerificationSettingTypes } from '../models/DocumentVerification.model';

export class DocumentVerification extends ProductBaseService implements Product {
  id = ProductTypes.DocumentVerification;
  order = 1;
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
    ProductIntegrationTypes.Api,
  ];
  // TODO @dkchv: !!! set actual
  icon = FiImage;
  inputs = [ProductInputTypes.Documents];
  checks = [
    // TODO @dkchv: !!! add actual
  ];
  component = DocumentVerificationSettings2;

  parser(flow: IFlow): DocumentVerificationConfig {
    const isDocumentStepsActive = flow?.verificationSteps?.length > 0;
    const isBiometricStepsActive = flow?.verificationPatterns?.biometrics !== 'none';
    const isDuplicateUserDetectionActive = !!flow?.verificationPatterns['duplicate-user-detection'];

    return {
      checks: {
        [DocumentVerificationCheckTypes.DocumentReading]: {
          isActive: true,
        },
        [DocumentVerificationCheckTypes.ExpirationDetection]: {
          isActive: true,
        },
        [DocumentVerificationCheckTypes.TemplateMatching]: {
          isActive: true,
        },
        [DocumentVerificationCheckTypes.AgeThreshold]: {
          isActive: flow?.ageThreshold !== undefined && flow?.ageThreshold !== null,
        },
        [DocumentVerificationCheckTypes.DuplicateUserDetection]: {
          isActive: isDuplicateUserDetectionActive,
        },
        [DocumentVerificationCheckTypes.AlterationDetection]: {
          isActive: true,
        },
        [DocumentVerificationCheckTypes.Facematch]: {
          isActive: flow?.facematchThreshold !== null && flow?.facematchThreshold !== undefined,
        },
      },
      settings: {
        [DocumentVerificationSettingTypes.DocumentSteps]: {
          value: flow?.verificationSteps,
        },
        [DocumentVerificationSettingTypes.DenyUploadRequirement]: {
          value: !!flow?.denyUploadsFromMobileGallery,
          isDisabled: !isDocumentStepsActive,
        },
        [DocumentVerificationSettingTypes.AgeThreshold]: {
          value: flow?.ageThreshold,
          isDisabled: !isDocumentStepsActive,
        },
        [DocumentVerificationSettingTypes.GrayscaleImage]: {
          value: flow?.inputValidationChecks?.some((check) => check.id === InputValidationType.GrayscaleImage && check.isDisabled === false),
          isDisabled: !isDocumentStepsActive,
        },
        [DocumentVerificationSettingTypes.SimilarImages]: {
          value: flow?.inputValidationChecks?.some((check) => (check.id === InputValidationType.SimilarImages || check.id === InputValidationType.IdenticalImages) && check.isDisabled === false),
          isDisabled: !isDocumentStepsActive,
        },
        [DocumentVerificationSettingTypes.DuplicateUserDetection]: {
          value: isDuplicateUserDetectionActive,
          isDisabled: !isDocumentStepsActive,
        },
        [DocumentVerificationSettingTypes.CountryRestriction]: {
          value: flow?.supportedCountries,
          isDisabled: !isDocumentStepsActive,
        },
        [DocumentVerificationSettingTypes.FacematchThreshold]: {
          value: flow?.facematchThreshold,
          isDisabled: !isDocumentStepsActive,
          isRequireOtherProduct: !isBiometricStepsActive,
        },
        [DocumentVerificationSettingTypes.ProofOfOwnership]: {
          value: !!flow?.verificationPatterns['proof-of-ownership'],
          isDisabled: !isDocumentStepsActive,
          isRequireOtherProduct: !isBiometricStepsActive,
          isCantBeUsedWithOtherSetting: flow?.verificationPatterns?.biometrics === 'voice+liveness',
        },
      },
    };
  }

  // eslint-disable-next-line class-methods-use-this
  serialize(setting: DocumentVerificationConfig): Partial<IFlow> {
    return {
      verificationSteps: setting.settings.documentSteps.value,
      denyUploadsFromMobileGallery: setting.settings.denyUploadRequirement.value,
      ageThreshold: setting.settings.ageThreshold.value,
      inputValidationChecks: [{
        id: InputValidationType.GrayscaleImage,
        isDisabled: setting.settings.grayscaleImage.value,
      }, {
        id: InputValidationType.SimilarImages,
        isDisabled: setting.settings.similarImages.value,
      }, {
        id: InputValidationType.IdenticalImages,
        isDisabled: setting.settings.similarImages.value,
      }, {
        id: InputValidationType.DocumentDetected,
        isDisabled: false,
      }],
      supportedCountries: setting.settings.countryRestriction.value,
      facematchThreshold: setting.settings.facematchThreshold.value,
      verificationPatterns: {
        'duplicate-user-detection': setting.settings.duplicateUserDetection.value,
        'proof-of-ownership': setting.settings.proofOfOwnership.value,
      },
    };
  }

  getNullishValues(): Partial<IFlow> {
    return {
      verificationSteps: [],
      denyUploadsFromMobileGallery: false,
      ageThreshold: undefined,
      inputValidationChecks: [{
        id: InputValidationType.GrayscaleImage,
        isDisabled: true,
      }, {
        id: InputValidationType.SimilarImages,
        isDisabled: true,
      }, {
        id: InputValidationType.IdenticalImages,
        isDisabled: true,
      }, {
        id: InputValidationType.DocumentDetected,
        isDisabled: false,
      }],
      supportedCountries: [],
      facematchThreshold: undefined,
      verificationPatterns: {
        'duplicate-user-detection': false,
        'proof-of-ownership': false,
      },
    };
  }

  isInGraph(flow: IFlow): boolean {
    return flow?.verificationSteps?.length > 0;
  }
}
