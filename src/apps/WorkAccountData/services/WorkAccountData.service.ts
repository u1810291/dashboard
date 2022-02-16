import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductTypes, ProductIntegrationTypes, ProductSettings } from 'models/Product.model';
import { FiBriefcase } from 'react-icons/fi';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { ProductBaseFlowBuilder } from 'apps/flowBuilder';
import { FlowIssue } from 'apps/ui';
import { WorkAccountDataVerification } from '../components/WorkAccountDataVerification/WorkAccountDataVerification';
import { WorkAccountDataSettings } from '../components/WorkAccountDataSettings/WorkAccountDataSettings';
import { getWorkAccountData, WorkAccountDataSettingTypes, IWorkAccountDataVerification, WorkAccountDataCheckTypes } from '../models/WorkAccountData.model';

type ProductSettingsWorkAccountData = ProductSettings<WorkAccountDataSettingTypes>;

export class WorkAccountData extends ProductBaseFlowBuilder implements Product {
  id = ProductTypes.WorkAccountData;
  order = 1210;
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
  ];
  icon = FiBriefcase;
  inputs = [
    ProductInputTypes.AccountCredentials,
  ];
  checks = [
    {
      id: WorkAccountDataCheckTypes.Identity,
      isActive: true,
    },
    {
      id: WorkAccountDataCheckTypes.Transactions,
      isActive: true,
    },
    {
      id: WorkAccountDataCheckTypes.Reputation,
      isActive: true,
    },
  ];
  component = WorkAccountDataSettings;
  componentVerification = WorkAccountDataVerification;

  parser(flow: IFlow): ProductSettingsWorkAccountData {
    const countryCodes = flow?.financialInformationWorkAccountsRetrieving?.countryCodes;

    return {
      [WorkAccountDataSettingTypes.countryCodes]: {
        value: countryCodes || [],
      },
    };
  }

  serialize(settings: ProductSettingsWorkAccountData): Partial<IFlow> {
    return {
      financialInformationWorkAccountsRetrieving: {
        countryCodes: settings.countryCodes.value,
      },
    };
  }

  onAdd(): Partial<IFlow> {
    return {
      financialInformationWorkAccountsRetrieving: {
        countryCodes: [],
      },
      verificationPatterns: {
        [VerificationPatternTypes.FinancialInformationWorkAccountsRetrieving]: true,
      },
    };
  }

  haveIssues(flow: IFlow): boolean {
    return flow.financialInformationWorkAccountsRetrieving.countryCodes.length === 0;
  }

  getIssuesComponent(flow: IFlow, productsInGraph?: ProductTypes[]): any {
    const isWorkAccountDataHaveNoCountries = flow.financialInformationWorkAccountsRetrieving.countryCodes.length === 0;

    if (isWorkAccountDataHaveNoCountries) {
      return () => FlowIssue('FlowBuilder.issue.countriesNotSpecified');
    }

    return null;
  }

  onRemove(): Partial<IFlow> {
    return {
      financialInformationWorkAccountsRetrieving: {
        countryCodes: [],
      },
      verificationPatterns: {
        [VerificationPatternTypes.FinancialInformationWorkAccountsRetrieving]: false,
      },
    };
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns?.[VerificationPatternTypes.FinancialInformationWorkAccountsRetrieving];
  }

  getVerification(verification: VerificationResponse): IWorkAccountDataVerification {
    return getWorkAccountData(verification);
  }
}
