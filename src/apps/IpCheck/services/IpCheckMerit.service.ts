import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiMapPin } from 'react-icons/fi';
import { getIpCheckStep, IpCheckStep } from 'models/IpCheck.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { getStepStatus, StepStatus } from 'models/Step.model';
import { IpCheckCheckTypes, IpCheckSettingsTypes, IpCheckValidationTypes } from 'apps/IpCheck/models/IpCheck.model';
import { ProductBaseWorkflow } from 'apps/WorkflowBuilder';
import { IpCheckVerification } from '../components/IpCheckVerification/IpCheckVerification';
import { IpCheckSettings } from '../components/IpCheckSettings/IpCheckSettings';

type ProductSettingsIpCheck = ProductSettings<IpCheckSettingsTypes>;

export class IpCheckMerit extends ProductBaseWorkflow implements Product {
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

  getVerification(verification: VerificationResponse): IpCheckStep {
    return getIpCheckStep(verification?.steps);
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    const ipCheckStep = getIpCheckStep(verification?.steps);
    if (!ipCheckStep) {
      return false;
    }
    return getStepStatus(ipCheckStep) === StepStatus.Failure;
  }
}
