import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductTypes, ProductIntegrationTypes, ProductSettings } from 'models/Product.model';
import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { VerificationResponse } from 'models/Verification.model';
import { FlowIssue } from 'apps/ui';
import { BankAccountDataVerification } from '../components/BankAccountDataVerification/BankAccountDataVerification';
import { BankAccountDataSettings } from '../components/BankAccountDataSettings/BankAccountDataSettings';
import { BankLogo } from '../components/BankLogo/BankLogo';
import { getBankAccountData, BankAccountDataSettingTypes, IBankAccountDataVerification, BankAccountDataCheckTypes } from '../models/BankAccountData.model';
import { BankAccountDataCountriesNotSpecified } from '../components/BankAccountDataCountriesNotSpecified/BankAccountDataCountriesNotSpecified';

type ProductSettingsBankAccountData = ProductSettings<BankAccountDataSettingTypes>;

export class BankAccountData extends ProductBaseService implements Product<ProductSettingsBankAccountData> {
  id = ProductTypes.BankAccountData;
  order = 1200;
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
  ];
  icon = BankLogo;
  inputs = [
    ProductInputTypes.AccountCredentials,
  ];
  checks = [
    {
      id: BankAccountDataCheckTypes.Accounts,
      isActive: true,
    },
    {
      id: BankAccountDataCheckTypes.Balance,
      isActive: true,
    },
    {
      id: BankAccountDataCheckTypes.Identity,
      isActive: true,
    },
    {
      id: BankAccountDataCheckTypes.Transactions,
      isActive: true,
    },
  ];
  component = BankAccountDataSettings;
  componentVerification = BankAccountDataVerification;

  parser(flow: IFlow): ProductSettingsBankAccountData {
    const countryCodes = flow?.financialInformationBankAccountsRetrieving?.countryCodes;

    return {
      [BankAccountDataSettingTypes.countryCodes]: {
        value: countryCodes || [],
      },
    };
  }

  serialize(settings: ProductSettingsBankAccountData): Partial<IFlow> {
    return {
      financialInformationBankAccountsRetrieving: {
        countryCodes: settings.countryCodes.value,
      },
    };
  }

  onAdd(): Partial<IFlow> {
    return {
      financialInformationBankAccountsRetrieving: {
        countryCodes: [],
      },
      verificationPatterns: {
        [VerificationPatternTypes.FinancialInformationBankAccountsRetrieving]: true,
      },
    };
  }

  onRemove(): Partial<IFlow> {
    return {
      financialInformationBankAccountsRetrieving: {
        countryCodes: [],
      },
      verificationPatterns: {
        [VerificationPatternTypes.FinancialInformationBankAccountsRetrieving]: false,
      },
    };
  }

  haveIssues(flow: IFlow): boolean {
    return flow.financialInformationBankAccountsRetrieving.countryCodes.length === 0;
  }

  getIssuesComponent(flow: IFlow, productsInGraph?: ProductTypes[]): any {
    const isBankDataHaveNoCountries = flow.financialInformationBankAccountsRetrieving.countryCodes.length === 0;

    if (isBankDataHaveNoCountries) {
      return () => FlowIssue('FlowBuilder.issue.countiesNotSpecified');
    }

    return null;
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns?.[VerificationPatternTypes.FinancialInformationBankAccountsRetrieving];
  }

  getVerification(verification: VerificationResponse): IBankAccountDataVerification {
    return getBankAccountData(verification);
  }
}
