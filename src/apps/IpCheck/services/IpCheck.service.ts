import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { IFlow } from 'models/Flow.model';
import { Product, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiActivity } from 'react-icons/fi';
import { getIpCheckStep, IpCheckStep } from 'models/IpCheck.model';
import { VerificationResponse } from 'models/Verification.model';
import { getStepStatus, StepStatus } from 'models/Step.model';
import { IpCheckVerification } from '../components/IpCheckVerification/IpCheckVerification';
import { IpCheckSettings } from '../components/IpCheckSettings/IpCheckSettings';
import { IpCheckCheckTypes, IpCheckSettingsTypes } from '../models/IpCheck.model';

type ProductSettingsIpCheck = ProductSettings<IpCheckSettingsTypes>;

export class IpCheck extends ProductBaseService implements Product<ProductSettingsIpCheck> {
  id = ProductTypes.IpCheck;
  order = 1000;
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
  ];
  icon = FiActivity;
  checks = [{
    id: IpCheckCheckTypes.VpnAndProxy,
    isActive: true,
  }, {
    id: IpCheckCheckTypes.GeoIp,
    isActive: false,
  }, {
    id: IpCheckCheckTypes.RiskyIP,
    isActive: false,
  }];
  component = IpCheckSettings;
  componentVerification = IpCheckVerification;

  parser(flow: IFlow): ProductSettingsIpCheck {
    return {
      [IpCheckSettingsTypes.VpnAndProxy]: {
        value: flow?.verificationPatterns[VerificationPatternTypes.IpValidation],
      },
    };
  }

  serialize(settings: ProductSettingsIpCheck): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.IpValidation]: settings[IpCheckSettingsTypes.VpnAndProxy].value,
      },
    };
  }

  onRemove(): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.IpValidation]: false,
      },
    };
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns[VerificationPatternTypes.IpValidation] === true;
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
