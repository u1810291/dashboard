import { Product, ProductInputTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { isNil } from 'lib/isNil';
import { IWorkflow } from 'models/Workflow.model';
import { FiMapPin } from 'react-icons/fi';
import { ProductBaseWorkflow } from 'apps/WorkflowBuilder';
import { DeepPartial } from 'lib/object';
import { IpCheckCheckTypes, IpCheckMeritId, IpCheckSettingsTypes, IpCheckVerificationOutput, IVerificationWithIpCheck } from '../models/IpCheck.model';
import { IpCheckPdf } from '../components/IpCheckPdf/IpCheckPdf';
import { IpCheckVerification } from '../components/IpCheckVerification/IpCheckVerification';
import { IpCheckSettings } from '../components/IpCheckSettings/IpCheckSettings';

type ProductSettingsIpCheck = ProductSettings<IpCheckSettingsTypes>;

export class IpCheckMerit extends ProductBaseWorkflow implements Product<IWorkflow, IVerificationWithIpCheck> {
  id = ProductTypes.IpCheck;
  meritId = IpCheckMeritId
  order = 50;
  integrationTypes = [];
  icon = FiMapPin;
  inputs = [
    ProductInputTypes.NoActiveInputs,
  ];
  checks = [{
    id: IpCheckCheckTypes.Basic,
    isActive: true,
  }, {
    id: IpCheckCheckTypes.GeoRestrictions,
    isActive: true,
  }, {
    id: IpCheckCheckTypes.VpnDetection,
    isActive: true,
  }];
  component = IpCheckSettings;
  componentVerification = IpCheckVerification;
  componentPdf = IpCheckPdf;

  parser(flow: IWorkflow): ProductSettingsIpCheck {
    const productBlock = this.getProductBlock(flow);
    return {
      [IpCheckSettingsTypes.IpValidation]: {
        value: productBlock.setting?.geoRestriction?.restriction,
      },
      [IpCheckSettingsTypes.AllowedRegions]: {
        value: productBlock?.setting?.geoRestriction.allowedCountries,
      },
      [IpCheckSettingsTypes.VpnDetection]: {
        value: productBlock?.setting?.vpnDetection,
      },
    };
  }

  serialize(settings: ProductSettingsIpCheck): DeepPartial<IWorkflow> {
    return {
      block: [
        {
          meritId: this.meritId,
          setting: {
            vpnDetection: !!settings[IpCheckSettingsTypes.VpnDetection]?.value,
            geoRestriction: {
              allowedCountries: settings[IpCheckSettingsTypes.AllowedRegions]?.value,
              restriction: settings[IpCheckSettingsTypes.IpValidation]?.value,
            },
          },
        },
      ],
    };
  }

  onRemove(): DeepPartial<IWorkflow> {
    return {};
  }

  isInFlow(workflow: IWorkflow): boolean {
    return !!this.getProductBlock(workflow);
  }

  isInVerification(verification: IVerificationWithIpCheck): boolean {
    return !isNil(verification?.blocks?.ip?.output);
  }

  getVerification(verification: IVerificationWithIpCheck): IpCheckVerificationOutput {
    return verification?.blocks?.ip?.output;
  }

  hasFailedCheck(verification: IVerificationWithIpCheck): boolean {
    const output = verification?.blocks?.ip?.output;
    return output?.vpnDetection === false || output?.geoRestriction === false;
  }
}
