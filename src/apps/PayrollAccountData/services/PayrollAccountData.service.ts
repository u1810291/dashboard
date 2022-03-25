import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductTypes, ProductIntegrationTypes, ProductSettings } from 'models/Product.model';
import { FiBriefcase } from 'react-icons/fi';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { ProductBaseFlowBuilder } from 'apps/flowBuilder';
import { FlowIssue } from 'apps/ui';
import { DeepPartial } from 'lib/object';
import { PayrollAccountDataVerification } from '../components/PayrollAccountDataVerification/PayrollAccountDataVerification';
import { PayrollAccountDataSettings } from '../components/PayrollAccountDataSettings/PayrollAccountDataSettings';
import { getPayrollAccountData, PayrollAccountDataSettingTypes, IPayrollAccountDataVerification, PayrollAccountDataCheckTypes } from '../models/PayrollAccountData.model';

type ProductSettingsPayrollAccountData = ProductSettings<PayrollAccountDataSettingTypes>;

export class PayrollAccountData extends ProductBaseFlowBuilder implements Product {
  id = ProductTypes.PayrollAccountData;
  order = 1220;
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
  ];
  icon = FiBriefcase;
  inputs = [
    ProductInputTypes.AccountCredentials,
  ];
  checks = [
    {
      id: PayrollAccountDataCheckTypes.Accounts,
      isActive: true,
    },
    {
      id: PayrollAccountDataCheckTypes.Identity,
      isActive: true,
    },
    {
      id: PayrollAccountDataCheckTypes.EmploymentDetails,
      isActive: true,
    },
    {
      id: PayrollAccountDataCheckTypes.Income,
      isActive: true,
    },
  ];
  component = PayrollAccountDataSettings;
  componentVerification = PayrollAccountDataVerification;

  parser(flow: IFlow): ProductSettingsPayrollAccountData {
    const countryCodes = flow?.financialInformationPayrollAccountsRetrieving?.countryCodes;

    return {
      [PayrollAccountDataSettingTypes.countryCodes]: {
        value: countryCodes || [],
      },
    };
  }

  serialize(settings: ProductSettingsPayrollAccountData): DeepPartial<IFlow> {
    return {
      financialInformationPayrollAccountsRetrieving: {
        countryCodes: settings.countryCodes.value,
      },
    };
  }

  onAdd(): DeepPartial<IFlow> {
    return {
      financialInformationPayrollAccountsRetrieving: {
        countryCodes: [],
      },
      verificationPatterns: {
        [VerificationPatternTypes.FinancialInformationPayrollAccountsRetrieving]: true,
      },
    };
  }

  onRemove(): DeepPartial<IFlow> {
    return {
      financialInformationPayrollAccountsRetrieving: {
        countryCodes: [],
      },
      verificationPatterns: {
        [VerificationPatternTypes.FinancialInformationPayrollAccountsRetrieving]: false,
      },
    };
  }

  haveIssues(flow: IFlow): boolean {
    return flow.financialInformationPayrollAccountsRetrieving.countryCodes.length === 0;
  }

  getIssuesComponent(flow: IFlow): any {
    const isPayrollAccountDataHaveNoCountries = flow.financialInformationPayrollAccountsRetrieving.countryCodes.length === 0;

    if (isPayrollAccountDataHaveNoCountries) {
      return () => FlowIssue('FlowBuilder.issue.countriesNotSpecified');
    }

    return null;
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns?.[VerificationPatternTypes.FinancialInformationPayrollAccountsRetrieving];
  }

  getVerification(verification: VerificationResponse): IPayrollAccountDataVerification {
    return getPayrollAccountData(verification);
  }
}
