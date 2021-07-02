import { DocumentVerificationProduct } from 'apps/documents';
import { InputValidationType } from 'apps/imageValidation/models/imageValidation.model';
import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { IFlow } from 'models/Flow.model';
import { Product, ProductCheck, ProductConfig, ProductInputTypes, ProductIntegrationTypes, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/Verification.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiFileText } from 'react-icons/fi';
import { CountrySpecificChecks, DocumentFrontendSteps, DocumentSecuritySteps, DocumentStepTypes, getComputedSteps, getDocumentStep, getReaderFrontendSteps, getStepStatus, StepStatus } from 'models/Step.model';
import { DocumentVerificationIssues } from '../components/DocumentVerificationIssues/DocumentVerificationIssues';
import { DocumentVerificationSettings } from '../components/DocumentVerificationSettings/DocumentVerificationSettings';
import { DocumentVerificationCheckTypes, DocumentVerificationConfigSettings, DocumentVerificationSettingTypes } from '../models/DocumentVerification.model';

export class DocumentVerification extends ProductBaseService implements Product {
  id = ProductTypes.DocumentVerification;
  order = 100;
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
    ProductIntegrationTypes.Api,
  ];
  icon = FiFileText;
  inputs = [
    ProductInputTypes.Documents,
  ];
  dependentProductTypes = [
    ProductTypes.AmlCheck,
    ProductTypes.GovernmentCheck,
  ];
  checksDefault = [
    {
      id: DocumentVerificationCheckTypes.DocumentReading,
      isActive: true,
    },
    {
      id: DocumentVerificationCheckTypes.ExpirationDetection,
      isActive: true,
    },
    {
      id: DocumentVerificationCheckTypes.TemplateMatching,
      isActive: true,
    },
    {
      id: DocumentVerificationCheckTypes.AgeThreshold,
      isActive: true,
    },
    {
      id: DocumentVerificationCheckTypes.DuplicateUserDetection,
      isActive: true,
    },
    {
      id: DocumentVerificationCheckTypes.AlterationDetection,
      isActive: true,
    },
    {
      id: DocumentVerificationCheckTypes.Facematch,
      isActive: true,
    }];

  component = DocumentVerificationSettings;
  componentVerification = DocumentVerificationProduct;

  getChecks(flow?: IFlow): ProductCheck[] {
    return flow
      ? [
        {
          id: DocumentVerificationCheckTypes.DocumentReading,
          isActive: true,
        },
        {
          id: DocumentVerificationCheckTypes.ExpirationDetection,
          isActive: true,
        },
        {
          id: DocumentVerificationCheckTypes.TemplateMatching,
          isActive: true,
        },
        {
          id: DocumentVerificationCheckTypes.AgeThreshold,
          isActive: flow?.ageThreshold !== undefined && flow?.ageThreshold !== null,
        },
        {
          id: DocumentVerificationCheckTypes.DuplicateUserDetection,
          isActive: !!flow?.verificationPatterns[VerificationPatternTypes.DuplicateUserDetection],
        },
        {
          id: DocumentVerificationCheckTypes.AlterationDetection,
          isActive: true,
        },
        {
          id: DocumentVerificationCheckTypes.Facematch,
          isActive: flow?.facematchThreshold !== null && flow?.facematchThreshold !== undefined,
        }]
      : this.checksDefault;
  }

  parser(flow: IFlow, productsInGraph?: ProductTypes[]): ProductConfig {
    super.parser(flow);
    const isDocumentStepsActive = flow?.verificationSteps?.length > 0;
    const isBiometricStepsActive = productsInGraph.includes(ProductTypes.BiometricVerification);
    const isDuplicateUserDetectionActive = !!flow?.verificationPatterns[VerificationPatternTypes.DuplicateUserDetection];

    return {
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
          value: flow?.inputValidationChecks?.some((check) => check.id === InputValidationType.GrayscaleImage && !check.isDisabled),
          isDisabled: !isDocumentStepsActive,
        },
        [DocumentVerificationSettingTypes.SimilarImages]: {
          value: flow?.inputValidationChecks?.some((check) => (check.id === InputValidationType.SimilarImages || check.id === InputValidationType.IdenticalImages) && !check.isDisabled),
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

  serialize(setting: DocumentVerificationConfigSettings): Partial<IFlow> {
    return {
      verificationSteps: setting.documentSteps.value,
      denyUploadsFromMobileGallery: setting.denyUploadRequirement.value,
      ageThreshold: setting.ageThreshold.value,
      inputValidationChecks: [{
        id: InputValidationType.GrayscaleImage,
        isDisabled: !setting.grayscaleImage.value,
      }, {
        id: InputValidationType.SimilarImages,
        isDisabled: !setting.similarImages.value,
      }, {
        id: InputValidationType.IdenticalImages,
        isDisabled: !setting.similarImages.value,
      }, {
        id: InputValidationType.DocumentDetected,
        isDisabled: false,
      }],
      supportedCountries: setting.countryRestriction.value,
      facematchThreshold: setting.facematchThreshold.value,
      verificationPatterns: {
        'duplicate-user-detection': setting.duplicateUserDetection.value,
        'proof-of-ownership': setting.proofOfOwnership.value,
      },
    };
  }

  onRemove(): Partial<IFlow> {
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
        // TODO @dkchv: use enum
        'duplicate-user-detection': false,
        'proof-of-ownership': false,
      },
    };
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationSteps?.length > 0;
  }

  getVerification(verification: VerificationResponse): any {
    return verification;
  }

  getIssuesComponent(flow: IFlow, integrationType: ProductIntegrationTypes): any {
    if (integrationType === ProductIntegrationTypes.Api && flow?.supportedCountries?.length > 0) {
      return DocumentVerificationIssues;
    }
    return null;
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    return verification?.documents?.some((document) => {
      const steps = document?.steps || [];
      const documentStep = getDocumentStep(DocumentStepTypes.DocumentReading, steps);
      const readerStep = getReaderFrontendSteps(documentStep);
      const computedStep = getComputedSteps(documentStep, verification, document);
      const filteredSteps = steps.filter((step) => [
        ...CountrySpecificChecks,
        ...DocumentSecuritySteps,
        ...DocumentFrontendSteps,
        DocumentStepTypes.PremiumAmlWatchlistsCheck].includes(step.id));

      const allSteps = [
        ...filteredSteps,
        ...readerStep,
        ...computedStep,
      ];

      if (allSteps.length === 0) {
        return false;
      }

      return allSteps.some((step) => getStepStatus(step) === StepStatus.Failure);
    });
  }
}
