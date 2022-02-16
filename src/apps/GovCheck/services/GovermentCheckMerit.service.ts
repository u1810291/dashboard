import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { IFlow } from 'models/Flow.model';
import { FiFlag } from 'react-icons/fi';
import { CountrySpecificChecks, getStepStatus, StepStatus } from 'models/Step.model';
import { ProductBaseWorkflow } from 'apps/WorkflowBuilder';
import { getDocumentsWithoutCustomDocument } from 'models/Document.model';
import { GovCheckSettings } from '../components/GovCheckSettings/GovCheckSettings';
import { getGovCheckRootSteps, getGovCheckVerificationSteps, GovCheckStepTypes, GovCheckVerificationData, GovernmentCheckSettingTypes, GovernmentChecksTypes, verificationPatternsGovchecksDefault } from '../models/GovCheck.model';
import { GovCheckVerificationProduct } from '../components/GovCheckVerificationProduct/GovCheckVerificationProduct';
import { GovCheckIssue } from '../components/GovCheckIssue/GovCheckIssue';

type ProductSettingsGovCheck = ProductSettings<GovernmentCheckSettingTypes>;

export class GovernmentCheckMerit extends ProductBaseWorkflow implements Product {
  id = ProductTypes.GovernmentCheck;
  inputs = [
    ProductInputTypes.NationalId,
  ];
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
    ProductIntegrationTypes.Api,
  ];
  order = 300;
  requiredProductType = ProductTypes.DocumentVerification;
  checks = [
    {
      id: GovernmentChecksTypes.GovernmentDatabaseCheck,
      isActive: true,
    },
  ];

  icon = FiFlag;

  component = GovCheckSettings;
  componentVerification = GovCheckVerificationProduct;

  getVerification(verification: VerificationResponse): GovCheckVerificationData {
    return {
      document: getDocumentsWithoutCustomDocument(verification?.documents) || [],
      govCheckWithoutDocument: getGovCheckRootSteps(verification),
    };
  }

  isInFlow(flow: IFlow): boolean {
    const isGovChecksEnabled = Object.entries(flow?.verificationPatterns).some(
      ([key, value]) => Object.prototype.hasOwnProperty.call(verificationPatternsGovchecksDefault, key)
        && value && value !== GovCheckStepTypes.None,
    );
    return !!flow?.postponedTimeout || isGovChecksEnabled;
  }

  isInVerification(verification: VerificationResponse): boolean {
    // TODO: @anatoliy.turkin (step.id as any) look so sad
    return getGovCheckVerificationSteps(verification).some((step) => CountrySpecificChecks.includes((step.id as any)));
  }

  haveIssues(flow: IFlow, productsInGraph?: ProductTypes[]): boolean {
    return !productsInGraph.includes(ProductTypes.CustomField) && !productsInGraph.includes(ProductTypes.DocumentVerification);
  }

  getIssuesComponent(flow: IFlow, productsInGraph?: ProductTypes[]): any {
    if (this.haveIssues(flow, productsInGraph)) {
      return GovCheckIssue;
    }

    return null;
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    return getGovCheckVerificationSteps(verification).some((step) => getStepStatus(step) === StepStatus.Failure);
  }

  parser(flow: IFlow): ProductSettingsGovCheck {
    return {
      [GovernmentCheckSettingTypes.PostponedTimeout]: {
        value: flow?.postponedTimeout,
      },
      [GovernmentCheckSettingTypes.CountriesGovChecks]: {
        value: flow?.verificationPatterns,
      },
    };
  }

  onRemove(): Partial<IFlow> {
    return {
      verificationPatterns: verificationPatternsGovchecksDefault,
    };
  }

  serialize(settings: ProductSettingsGovCheck): Partial<IFlow> {
    return {
      postponedTimeout: settings[GovernmentCheckSettingTypes.PostponedTimeout]?.value,
      verificationPatterns: settings[GovernmentCheckSettingTypes.CountriesGovChecks]?.value,
    };
  }
}
