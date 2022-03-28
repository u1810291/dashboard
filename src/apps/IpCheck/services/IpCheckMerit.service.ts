import { isNil } from 'lib/isNil';
import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { IWorkflow } from 'models/Workflow.model';
import { FiMapPin } from 'react-icons/fi';
import { IpCheckValidationTypes } from 'models/IpCheck.model';
import { ProductBaseWorkflow } from 'apps/WorkflowBuilder';
import { IpCheckCheckTypes, IpCheckSettingsTypes, IpCheckVerificationOutput, IVerificationWithIpCheck } from '../models/IpCheck.model';
import { IpCheckPdf } from '../components/IpCheckPdf/IpCheckPdf';
import { IpCheckVerification } from '../components/IpCheckVerification/IpCheckVerification';
import { IpCheckSettings } from '../components/IpCheckSettings/IpCheckSettings';

type ProductSettingsIpCheck = ProductSettings<IpCheckSettingsTypes>;

export class IpCheckMerit extends ProductBaseWorkflow implements Product<IWorkflow, IVerificationWithIpCheck> {
  id = ProductTypes.IpCheck;
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

  parser(flow: IFlow): ProductSettingsIpCheck {
    return {
      [IpCheckSettingsTypes.IpValidation]: {
        value: flow?.verificationPatterns?.[VerificationPatternTypes.IpValidation],
      },
      [IpCheckSettingsTypes.AllowedRegions]: {
        value: flow?.ipValidation?.allowedRegions,
      },
      [IpCheckSettingsTypes.VpnDetection]: {
        value: flow?.verificationPatterns?.[VerificationPatternTypes.VpnDetection],
      },
    };
  }

  serialize(settings: ProductSettingsIpCheck): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.IpValidation]: settings[IpCheckSettingsTypes.IpValidation].value,
        [VerificationPatternTypes.VpnDetection]: settings[IpCheckSettingsTypes.VpnDetection].value,
      },
      ipValidation: {
        allowedRegions: settings[IpCheckSettingsTypes.AllowedRegions].value,
      },
    };
  }

  onAdd(): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.IpValidation]: IpCheckValidationTypes.Basic,
      },
    };
  }

  onRemove(): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.IpValidation]: IpCheckValidationTypes.None,
        [VerificationPatternTypes.VpnDetection]: false,
      },
    };
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns?.[VerificationPatternTypes.IpValidation] !== undefined && flow.verificationPatterns[VerificationPatternTypes.IpValidation] !== IpCheckValidationTypes.None;
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
