import { Product, ProductInputTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { isNil } from 'lib/isNil';
import { IWorkflow, removeBlock, updateBlock } from 'models/Workflow.model';
import { FiMapPin } from 'react-icons/fi';
import { ProductBaseWorkflow } from 'apps/WorkflowBuilder';
import { IpCheckValidationTypes } from 'models/IpCheck.model';
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
        value: productBlock?.setting?.geoRestriction?.restriction,
      },
      [IpCheckSettingsTypes.AllowedRegions]: {
        value: productBlock?.setting?.geoRestriction.allowedCountries,
      },
      [IpCheckSettingsTypes.VpnDetection]: {
        value: productBlock?.setting?.vpnDetection,
      },
    };
  }

  serialize(settings: ProductSettingsIpCheck, flow?: IWorkflow): Partial<IWorkflow> {
    const newBlock = {
      setting: {
        vpnDetection: !!settings[IpCheckSettingsTypes.VpnDetection]?.value,
        geoRestriction: {
          allowedCountries: settings[IpCheckSettingsTypes.AllowedRegions]?.value,
          restriction: settings[IpCheckSettingsTypes.IpValidation]?.value,
        },
      },
    };
    const resultBlockArray = updateBlock(this.meritId, flow.block, newBlock);

    return {
      block: resultBlockArray,
    };
  }

  onAdd(flow: IWorkflow): Partial<IWorkflow> {
    // TODO @vladislav.snimshchikov: Change the template when adding a new block, when information about the expected format appears
    const meritBlock = {
      id: this.order,
      blockReferenceName: `${this.meritId}-${this.order}`,
      name: '',
      type: '',
      setting: {
        vpnDetection: false,
        geoRestriction: {
          allowedCountries: [],
          restriction: IpCheckValidationTypes.Basic,
        },
      },
    };

    const resultBlockArray = [...flow.block, meritBlock];
    return {
      ...flow,
      block: resultBlockArray,
    };
  }

  onRemove(flow?: IWorkflow): Partial<IWorkflow> {
    return { block: removeBlock(this.meritId, flow.block) };
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
