import { DocumentVerificationProduct } from 'apps/documents';
import { ProductBaseWorkflow } from 'apps/WorkflowBuilder';
import { Product, ProductInputTypes, ProductIntegrationTypes, ProductTypes } from 'models/Product.model';
import { IWorkflow } from 'models/Workflow.model';
import { FiFileText } from 'react-icons/fi';
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
  serialize(settings: ProductSettingsDocumentVerification): Partial<IWorkflow> {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRemove(flow: IWorkflow): Partial<IWorkflow> {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInFlow(flow: IWorkflow): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getVerification(verification: IVerificationWorkflowDraft): IVerificationWorkflowDraft {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  haveIssues(flow: IWorkflow, productsInGraph?: ProductTypes[]): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getIssuesComponent(flow: IWorkflow, productsInGraph?: ProductTypes[]): any {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasFailedCheck(verification: IVerificationWorkflowDraft): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInVerification(verification: IVerificationWorkflowDraft): boolean {
    return false;
  }
}
