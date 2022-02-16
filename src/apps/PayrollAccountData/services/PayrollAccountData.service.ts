import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductTypes, ProductIntegrationTypes, ProductSettings } from 'models/Product.model';
import { FiBriefcase } from 'react-icons/fi';
import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { VerificationResponse } from 'models/Verification.model';
import { PayrollAccountDataVerification } from '../components/PayrollAccountDataVerification/PayrollAccountDataVerification';
import { PayrollAccountDataSettings } from '../components/PayrollAccountDataSettings/PayrollAccountDataSettings';
import { getPayrollAccountData, PayrollAccountDataSettingTypes, IPayrollAccountDataVerification, PayrollAccountDataCheckTypes } from '../models/PayrollAccountData.model';

type ProductSettingsPayrollAccountData = ProductSettings<PayrollAccountDataSettingTypes>;

export class PayrollAccountData extends ProductBaseService implements Product<ProductSettingsPayrollAccountData> {
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

  serialize(settings: ProductSettingsPayrollAccountData): Partial<IFlow> {
    return {
      financialInformationPayrollAccountsRetrieving: {
        countryCodes: settings.countryCodes.value,
      },
    };
  }

  onAdd(): Partial<IFlow> {
    return {
      financialInformationPayrollAccountsRetrieving: {
        countryCodes: [],
      },
      verificationPatterns: {
        [VerificationPatternTypes.FinancialInformationPayrollAccountsRetrieving]: true,
      },
    };
  }

  onRemove(): Partial<IFlow> {
    return {
      financialInformationPayrollAccountsRetrieving: {
        countryCodes: [],
      },
      verificationPatterns: {
        [VerificationPatternTypes.FinancialInformationPayrollAccountsRetrieving]: false,
      },
    };
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns?.[VerificationPatternTypes.FinancialInformationPayrollAccountsRetrieving];
  }

  getVerification(verification: VerificationResponse): IPayrollAccountDataVerification {
    return getPayrollAccountData(verification);
  }
}
