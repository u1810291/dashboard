import { DocumentVerificationProduct } from 'apps/documents';
import { FACEMATCH_DEFAULT_THRESHOLD } from 'apps/facematch/models/facematch.model';
import { InputValidationType } from 'apps/imageValidation/models/imageValidation.model';
import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { intersection } from 'lodash';
import { DocumentTypes } from 'models/Document.model';
import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductIntegrationTypes, ProductTypes } from 'models/Product.model';
import { CountrySpecificChecks, DocumentFrontendSteps, DocumentSecuritySteps, DocumentStepTypes, getComputedSteps, getDocumentStep, getReaderFrontendSteps, getStepStatus, StepStatus, VerificationDocStepTypes } from 'models/Step.model';
import { VerificationResponse } from 'models/Verification.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiFileText } from 'react-icons/fi';
import { BiometricVerificationCheckTypes } from 'apps/biometricVerification/models/BiometricVerification.model';
import { AGE_CHECK_MAX_THRESHOLD, AGE_CHECK_MIN_THRESHOLD } from 'apps/AgeCheck/models/AgeCheck.model';
import { IESignatureFlow } from 'models/ESignature.model';
import { DocumentVerificationIssues } from '../components/DocumentVerificationIssues/DocumentVerificationIssues';
import { DocumentIsStepNotSpecifiedIssues } from '../components/DocumentIsStepNotSpecifiedIssues/DocumentIsIsStepNotSpecifiedIssues';
import { DocumentVerificationSettings } from '../components/DocumentVerificationSettings/DocumentVerificationSettings';
import { DocumentVerificationCheckTypes, DocumentVerificationSettingTypes, ProductSettingsDocumentVerification } from '../models/DocumentVerification.model';

export class DocumentVerification extends ProductBaseService implements Product<ProductSettingsDocumentVerification> {
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
  checks = [
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

  parser(flow: IFlow, productsInGraph?: ProductTypes[]): ProductSettingsDocumentVerification {
    const isDocumentStepsActive = flow?.verificationSteps?.length > 0;
    const isBiometricStepsActive = productsInGraph.includes(ProductTypes.BiometricVerification);
    const isDuplicateUserDetectionActive = !!flow?.verificationPatterns?.[VerificationPatternTypes.DuplicateUserDetection];

    const neededSteps = flow?.verificationSteps.filter((group) => intersection(group, [DocumentTypes.Passport, DocumentTypes.NationalId, DocumentTypes.DrivingLicense, DocumentTypes.ProofOfResidency]).length > 0);
    const otherSteps = flow?.verificationSteps.filter((group) => !(intersection(group, [DocumentTypes.Passport, DocumentTypes.NationalId, DocumentTypes.DrivingLicense, DocumentTypes.ProofOfResidency]).length > 0));

    return {
      [DocumentVerificationSettingTypes.DocumentSteps]: {
        value: neededSteps,
      },
      [DocumentVerificationSettingTypes.OtherSteps]: {
        value: otherSteps,
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
        value: flow?.inputValidationChecks?.some((check) => check.id === InputValidationType.GrayscaleImage && !check.isDisabled) || false,
        isDisabled: !isDocumentStepsActive,
      },
      [DocumentVerificationSettingTypes.SimilarImages]: {
        value: flow?.inputValidationChecks?.some((check) => (check.id === InputValidationType.SimilarImages || check.id === InputValidationType.IdenticalImages) && !check.isDisabled) || false,
        isDisabled: !isDocumentStepsActive,
      },
      [DocumentVerificationSettingTypes.DuplicateUserDetection]: {
        value: isDuplicateUserDetectionActive,
        isDisabled: !isDocumentStepsActive,
      },
      [DocumentVerificationSettingTypes.CountryRestriction]: {
        value: flow?.supportedCountries || [],
        isDisabled: !isDocumentStepsActive,
      },
      [DocumentVerificationSettingTypes.FacematchThreshold]: {
        value: flow?.facematchThreshold || FACEMATCH_DEFAULT_THRESHOLD,
        isDisabled: !isDocumentStepsActive,
        isRequireOtherProduct: !isBiometricStepsActive,
      },
      [DocumentVerificationSettingTypes.DuplicateUserDetection]: {
        value: flow?.verificationPatterns?.[VerificationPatternTypes.DuplicateUserDetection],
        isDisabled: !isDocumentStepsActive,
      },
      [DocumentVerificationSettingTypes.ProofOfOwnership]: {
        value: !!flow?.verificationPatterns?.[VerificationPatternTypes.ProofOfOwnership],
        isDisabled: !isDocumentStepsActive,
        isRequireOtherProduct: !isBiometricStepsActive,
        isCantBeUsedWithOtherSetting: flow?.verificationPatterns?.biometrics === BiometricVerificationCheckTypes.VoiceLiveness,
      },
    };
  }

  serialize(settings: ProductSettingsDocumentVerification): Partial<IFlow> {
    return {
      verificationSteps: [...settings.documentSteps.value, ...settings.otherSteps.value],
      denyUploadsFromMobileGallery: settings.denyUploadRequirement.value,
      ageThreshold: settings.ageThreshold.value,
      inputValidationChecks: [{
        id: InputValidationType.GrayscaleImage,
        isDisabled: !settings.grayscaleImage.value,
      }, {
        id: InputValidationType.SimilarImages,
        isDisabled: !settings.similarImages.value,
      }, {
        id: InputValidationType.IdenticalImages,
        isDisabled: !settings.similarImages.value,
      }, {
        id: InputValidationType.DocumentDetected,
        isDisabled: false,
      }],
      supportedCountries: settings.countryRestriction.value,
      facematchThreshold: settings.facematchThreshold.value,
      verificationPatterns: {
        [VerificationPatternTypes.DuplicateUserDetection]: settings.duplicateUserDetection.value,
        [VerificationPatternTypes.ProofOfOwnership]: settings.proofOfOwnership.value,
      },
    };
  }

  onRemove(flow: IFlow): Partial<IFlow> {
    const otherSteps = flow?.verificationSteps.filter((group) => !(intersection(group, [DocumentTypes.Passport, DocumentTypes.NationalId, DocumentTypes.DrivingLicense, DocumentTypes.ProofOfResidency]).length > 0));
    let electronicSignature: IESignatureFlow = flow?.electronicSignature;
    if (flow?.electronicSignature?.acceptanceCriteria.isDocumentsRequired) {
      electronicSignature = {
        ...flow.electronicSignature,
        acceptanceCriteria: {
          ...flow.electronicSignature.acceptanceCriteria,
          isDocumentsRequired: false,
          isFaceMatchRequired: false,
        },
      };
    }
    return {
      verificationSteps: [...otherSteps],
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
        [VerificationPatternTypes.DuplicateUserDetection]: false,
        [VerificationPatternTypes.ProofOfOwnership]: false,
      },
      electronicSignature,
    };
  }

  isInFlow(flow: IFlow): boolean {
    const allSteps = flow?.verificationSteps?.flatMap((step) => step) || [];
    const documents: string[] = Object.values(DocumentTypes).map((item: DocumentTypes) => item as string);

    return allSteps.some((step) => documents.includes(step));
  }

  getVerification(verification: VerificationResponse): any {
    const documentTypes: string[] = Object.values(DocumentTypes).map((item: DocumentTypes) => item as string);

    const documents = verification?.documents?.filter((el) => documentTypes.includes(el.type))
      .map((doc) => {
        const duplicateUserDetectionStep = doc?.steps?.find((item) => item?.id === VerificationDocStepTypes.DuplicateUserValidation);
        const ageCheck = doc?.steps?.find((item) => item?.id === VerificationDocStepTypes.AgeValidation);
        return { ...doc, duplicateUserDetectionStep, ageCheck };
      });

    return { ...verification, documents };
  }

  haveIssues(flow: IFlow, productsInGraph?: ProductTypes[]): boolean {
    const isAgeThresholdValid = !flow.ageThreshold || (flow.ageThreshold >= AGE_CHECK_MIN_THRESHOLD && flow.ageThreshold <= AGE_CHECK_MAX_THRESHOLD);
    const isDocumentStepNotSpecified = productsInGraph && !this.isInFlow(flow);

    return !isAgeThresholdValid || super.haveIssues(flow) || isDocumentStepNotSpecified;
  }

  getIssuesComponent(flow: IFlow, productsInGraph?: ProductTypes[]): any {
    const isDocumentStepNotSpecified = productsInGraph && !this.isInFlow(flow);
    const isAPICountryRestriction = flow?.integrationType === ProductIntegrationTypes.Api && flow?.supportedCountries?.length > 0;

    if (isAPICountryRestriction) {
      return DocumentVerificationIssues;
    }

    if (isDocumentStepNotSpecified) {
      return DocumentIsStepNotSpecifiedIssues;
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
