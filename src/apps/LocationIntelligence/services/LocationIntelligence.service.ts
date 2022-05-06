import { Product, ProductInputTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { IWorkflow, removeBlock, updateBlock } from 'models/Workflow.model';
import { FiMapPin } from 'react-icons/fi';
import { ProductBaseWorkflow } from 'apps/WorkflowBuilder';
import { LocationIntelligenceVerification } from '../components/LocationIntelligenceVerification/LocationIntelligenceVerification';
import { LocationIntelligenceSettings } from '../components/LocationIntelligenceSettings/LocationIntelligenceSettings';
import {
  IpCheckMeritId, IVerificationWithLocationIntelligence,
  LocationIntelligenceCheckTypes,
  LocationIntelligenceSettingsTypes, LocationIntelligenceVerificationOutput,
} from '../models/LocationIntelligence.model';
import { LocationIntelligencePdf } from '../components/LocationIntelligencePdf/LocationIntelligencePdf';
import { isNil } from '../../../lib/isNil';

type ProductSettingsLocationIntelligence = ProductSettings<LocationIntelligenceSettingsTypes>;

export class LocationIntelligenceMerit extends ProductBaseWorkflow implements Product<IWorkflow, IVerificationWithLocationIntelligence> {
  id = ProductTypes.LocationIntelligence;
  meritId = IpCheckMeritId
  order = 50;
  integrationTypes = [];
  icon = FiMapPin;
  inputs = [
    ProductInputTypes.NoActiveInputs,
  ];
  checks = [{
    id: LocationIntelligenceCheckTypes.Basic,
    isActive: true,
  }, {
    id: LocationIntelligenceCheckTypes.GeoRestrictions,
    isActive: true,
  }, {
    id: LocationIntelligenceCheckTypes.VpnDetection,
    isActive: true,
  }];
  component = LocationIntelligenceSettings;
  componentVerification = LocationIntelligenceVerification;
  componentPdf = LocationIntelligencePdf;

  parser(flow: IWorkflow): ProductSettingsLocationIntelligence {
    const productBlock = this.getProductBlock(flow);
    return {
      [LocationIntelligenceSettingsTypes.IpValidation]: {
        value: productBlock?.setting?.geoRestriction?.restriction,
      },
      [LocationIntelligenceSettingsTypes.AllowedRegions]: {
        value: productBlock?.setting?.geoRestriction.allowedCountries,
      },
      [LocationIntelligenceSettingsTypes.VpnDetection]: {
        value: productBlock?.setting?.vpnDetection,
      },
      [LocationIntelligenceSettingsTypes.HighAccuracy]: {
        value: productBlock?.setting?.highAccuracy,
      },
    };
  }

  serialize(settings: ProductSettingsLocationIntelligence, flow?: IWorkflow): Partial<IWorkflow> {
    const newBlock = {
      setting: {
        vpnDetection: !!settings[LocationIntelligenceSettingsTypes.VpnDetection]?.value,
        geoRestriction: {
          allowedCountries: settings[LocationIntelligenceSettingsTypes.AllowedRegions]?.value,
          restriction: settings[LocationIntelligenceSettingsTypes.IpValidation]?.value,
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
          restriction: LocationIntelligenceCheckTypes.Basic,
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

  getVerification(verification: IVerificationWithLocationIntelligence): LocationIntelligenceVerificationOutput {
    return verification?.blocks?.ip?.output;
  }

  isInVerification(verification: IVerificationWithLocationIntelligence): boolean {
    return !isNil(verification?.blocks?.ip?.output);
  }

  hasFailedCheck(verification: IVerificationWithLocationIntelligence): boolean {
    const output = verification?.blocks?.ip?.output;
    return output?.vpnDetection === false || output?.geoRestriction === false;
  }
}
