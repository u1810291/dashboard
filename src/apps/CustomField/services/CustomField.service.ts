import { FiPlusSquare } from 'react-icons/fi';
import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { MerchantTags } from 'models/Merchant.model';
import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductIntegrationTypes, ProductTypes } from 'models/Product.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { VerificationResponse } from 'models/Verification.model';
import { InputTypes } from 'models/Input.model';
import { CustomField, CustomFieldProductSettings, CustomFieldSettingTypes, CustomFieldTypes, flattenTree } from '../models/CustomField.model';
import { CustomFieldSettings } from '../components/CustomFieldSettings/CustomFieldSettings';
import { CustomFieldVerification } from '../components/CustomFieldVerification/CustomFieldVerification';
import { CustomFieldIssue } from '../components/CustomFieldIssue/CustomFieldIssue';

export class CustomFieldService extends ProductBaseService implements Product<CustomFieldProductSettings> {
  constructor(merchantTags: MerchantTags[]) {
    super();
    this.merchantTags = merchantTags;
  }

  id = ProductTypes.CustomField;
  order = 200;
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
  ];
  inputs = [
    ProductInputTypes.CustomDataEntry,
  ];
  checks = [
    {
      id: CustomFieldTypes.InputTypes,
      isActive: true,
    },
    {
      id: CustomFieldTypes.FormatValidation,
      isActive: true,
    },
    {
      id: CustomFieldTypes.MappingDocuments,
      isActive: true,
    },
  ];
  merchantTags: MerchantTags[] = [];

  icon = FiPlusSquare;
  component = CustomFieldSettings;
  componentVerification = CustomFieldVerification;

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns?.[VerificationPatternTypes.CustomFieldsValidation] && !!flow?.customFieldsConfig?.fields?.length;
  }

  getVerification(verification: VerificationResponse): CustomField[] {
    return verification?.inputs?.find((input) => input?.id === InputTypes.CustomFields)?.data.fields;
  }

  isInVerification(verification: VerificationResponse): boolean {
    return verification.inputs.some((i) => i.id === InputTypes.CustomFields);
  }

  onRemove(): Partial<IFlow> {
    return {
      customFieldsConfig: { fields: [] },
      verificationPatterns: {
        [VerificationPatternTypes.CustomFieldsValidation]: false,
      },
    };
  }

  onAdd(): Partial<IFlow> {
    return {
      customFieldsConfig: { fields: [] },
      verificationPatterns: {
        [VerificationPatternTypes.CustomFieldsValidation]: true,
      },
    };
  }

  serialize(settings: CustomFieldProductSettings): Partial<IFlow> {
    const fields = settings[CustomFieldSettingTypes.fields].value;
    return {
      customFieldsConfig: { fields },
      verificationPatterns: {
        [VerificationPatternTypes.CustomFieldsValidation]: !!settings[CustomFieldSettingTypes.fields].value.length,
      },
    };
  }

  parser(flow?: IFlow): CustomFieldProductSettings {
    const value = flow?.customFieldsConfig?.fields;
    return {
      [CustomFieldSettingTypes.fields]: {
        value,
      },
      [CustomFieldSettingTypes.flattenedFields]: {
        value: flattenTree(flow?.customFieldsConfig?.fields),
      },
    };
  }

  haveIssues(flow: IFlow): boolean {
    return !flow.customFieldsConfig.fields.length;
  }

  getIssuesComponent(flow: IFlow): any {
    if (this.haveIssues(flow)) {
      return CustomFieldIssue;
    }

    return null;
  }
}
