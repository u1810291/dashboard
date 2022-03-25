import { DocumentVerificationProduct } from 'apps/documents';
import { ProductBaseWorkflow } from 'apps/WorkflowBuilder';
import { DocumentTypes } from 'models/Document.model';
import { Product, ProductInputTypes, ProductIntegrationTypes, ProductTypes } from 'models/Product.model';
import { DocumentFrontendSteps, DocumentSecuritySteps, DocumentStepTypes, getComputedSteps, getDocumentStep, getReaderFrontendSteps, getStepStatus, StepStatus, VerificationDocStepTypes } from 'models/Step.model';
import { IWorkflow } from 'models/Workflow.model';
import { FiFileText } from 'react-icons/fi';
import { DeepPartial } from 'lib/object';
import { DocumentVerificationCheckTypes, DocumentVerificationMeritId, ProductSettingsDocumentVerification } from '../models/DocumentVerification.model';
import { DocumentVerificationSettings } from '../components/DocumentVerificationSettings/DocumentVerificationSettings';

type IVerificationWorkflowDraft = any;

export class DocumentVerificationMerit extends ProductBaseWorkflow implements Product<IWorkflow, IVerificationWorkflowDraft> {
  id = ProductTypes.DocumentVerification;
  meritId = DocumentVerificationMeritId;
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
    ProductTypes.CustomWatchlist,
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
  componentPdf = null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parser(flow: IWorkflow, productsInGraph?: ProductTypes[]): ProductSettingsDocumentVerification {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  serialize(settings: ProductSettingsDocumentVerification): DeepPartial<IWorkflow> {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRemove(flow: IWorkflow): DeepPartial<IWorkflow> {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInFlow(flow: IWorkflow): boolean {
    return false;
  }

  getVerification(verification: IVerificationWorkflowDraft): IVerificationWorkflowDraft {
    const documentTypes: string[] = Object.values(DocumentTypes).map((item: DocumentTypes) => item as string);

    const documents = verification?.documents?.filter((el) => documentTypes.includes(el.type))
      .map((doc) => {
        const duplicateUserDetectionStep = doc?.steps?.find((item) => item?.id === VerificationDocStepTypes.DuplicateUserValidation);
        const ageCheck = doc?.steps?.find((item) => item?.id === VerificationDocStepTypes.AgeValidation);
        return { ...doc, duplicateUserDetectionStep, ageCheck };
      });

    return { ...verification, documents };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  haveIssues(flow: IWorkflow, productsInGraph?: ProductTypes[]): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getIssuesComponent(flow: IWorkflow, productsInGraph?: ProductTypes[]): any {
    return null;
  }

  hasFailedCheck(verification: IVerificationWorkflowDraft): boolean {
    return verification?.documents?.some((document) => {
      const steps = document?.steps || [];
      const documentStep = getDocumentStep(DocumentStepTypes.DocumentReading, steps);
      const readerStep = getReaderFrontendSteps(documentStep);
      const computedStep = getComputedSteps(documentStep, verification, document);
      const filteredSteps = steps.filter((step) => [
        ...DocumentSecuritySteps,
        ...DocumentFrontendSteps].includes(step.id));

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInVerification(verification: IVerificationWorkflowDraft): boolean {
    return false;
  }
}
