import { GovCheckDependsIssue } from 'apps/GovCheck/components/GovCheckDependsIssue/GovCheckDependsIssue';
import { getDocumentsWithoutCustomDocument } from 'models/Document.model';
import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { IFlow } from 'models/Flow.model';
import { FiFlag } from 'react-icons/fi';
import { CountrySpecificChecks, getStepStatus, StepStatus, RootGovChecksErrorsToHide } from 'models/Step.model';
import { ProductBaseFlowBuilder } from 'apps/flowBuilder';
import { GovCheckSettings } from 'apps/GovCheck/components/GovCheckSettings/GovCheckSettings';
import { getGovCheckRootSteps, getGovCheckVerificationSteps, GovCheckVerificationData, GovernmentCheckSettingTypes, GovernmentChecksTypes, isGovCheckHaveDependsIssue, isGovCheckInFlow, verificationPatternsGovchecksDefault } from 'apps/GovCheck/models/GovCheck.model';
import { GovCheckVerificationProduct } from 'apps/GovCheck/components/GovCheckVerificationProduct/GovCheckVerificationProduct';
import { GovCheckIssue } from 'apps/GovCheck/components/GovCheckIssue/GovCheckIssue';

type ProductSettingsGovCheck = ProductSettings<GovernmentCheckSettingTypes>;

export class GovernmentCheck extends ProductBaseFlowBuilder implements Product {
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
    return getGovCheckVerificationSteps(verification).some((step) => CountrySpecificChecks.includes((step.id as any)) && !(step?.error?.code && RootGovChecksErrorsToHide[step.error.code]));
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
    return getGovCheckVerificationSteps(verification).some((step) => getStepStatus(step) === StepStatus.Failure && !(step?.error?.code && RootGovChecksErrorsToHide[step.error.code]));
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
