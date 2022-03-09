import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { IFlow } from 'models/Flow.model';
import { FiFlag } from 'react-icons/fi';
import { CountrySpecificChecks, getStepStatus, StepStatus } from 'models/Step.model';
import { ProductBaseWorkflow } from 'apps/WorkflowBuilder';
import { getDocumentsWithoutCustomDocument } from 'models/Document.model';
import { GovCheckSettings } from '../components/GovCheckSettings/GovCheckSettings';
import { getGovCheckRootSteps, getGovCheckVerificationSteps, GovCheckVerificationData, GovernmentCheckSettingTypes, GovernmentChecksTypes, isGovCheckHaveDependsIssue, isGovCheckInFlow, verificationPatternsGovchecksDefault } from '../models/GovCheck.model';
import { GovCheckVerificationProduct } from '../components/GovCheckVerificationProduct/GovCheckVerificationProduct';
import { GovCheckDependsIssue } from '../components/GovCheckDependsIssue/GovCheckDependsIssue';
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
    return isGovCheckInFlow(flow);
  }

  isInVerification(verification: VerificationResponse): boolean {
    // TODO: @anatoliy.turkin (step.id as any) look so sad
    return getGovCheckVerificationSteps(verification).some((step) => CountrySpecificChecks.includes((step.id as any)));
  }

  haveIssues(flow: IFlow, productsInGraph?: ProductTypes[]): boolean {
    return isGovCheckHaveDependsIssue(flow, productsInGraph) || !isGovCheckInFlow(flow);
  }

  getIssuesComponent(flow: IFlow, productsInGraph?: ProductTypes[]): any {
    if (isGovCheckHaveDependsIssue(flow, productsInGraph)) {
      return GovCheckDependsIssue;
    }

    if (!isGovCheckInFlow(flow)) {
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
