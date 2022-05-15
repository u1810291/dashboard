import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiMapPin } from 'react-icons/fi';
import { VerificationResponse } from 'models/VerificationOld.model';
import { getStepStatus, StepStatus } from 'models/Step.model';
import { ProductBaseFlowBuilder } from 'apps/flowBuilder';
import { LocationIntelligenceSettings, LocationIntelligenceVerification, LocationIntelligenceVerificationOutput } from 'apps/LocationIntelligence';
import { getLocationIntelligenceStep, LocationIntelligenceCheckTypes, LocationIntelligenceErrorCodes, LocationIntelligenceSettingsTypes, LocationIntelligenceValidationTypes } from '../models/LocationIntelligenceOld.model';

type ProductSettingsLocationIntelligenceOld = ProductSettings<LocationIntelligenceSettingsTypes>;

export class LocationIntelligenceOld extends ProductBaseFlowBuilder implements Product {
  id = ProductTypes.LocationIntelligence;
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
    id: LocationIntelligenceCheckTypes.HighAccuracy,
    isActive: true,
  },
  {
    id: LocationIntelligenceCheckTypes.VpnDetection,
    isActive: true,
  },
  {
    id: LocationIntelligenceCheckTypes.GeoRestrictions,
    isActive: true,
  }];
  component = LocationIntelligenceSettings;
  componentVerification = LocationIntelligenceVerification;

  parser(flow: IFlow): ProductSettingsLocationIntelligenceOld {
    return {
      [LocationIntelligenceSettingsTypes.IpValidation]: {
        value: flow?.verificationPatterns?.[VerificationPatternTypes.IpValidation],
      },
      [LocationIntelligenceSettingsTypes.AllowedRegions]: {
        value: flow?.ipValidation?.allowedRegions,
      },
      [LocationIntelligenceSettingsTypes.VpnDetection]: {
        value: flow?.verificationPatterns?.[VerificationPatternTypes.VpnDetection],
      },
      [LocationIntelligenceSettingsTypes.HighAccuracy]: {
        value: flow?.verificationPatterns?.[VerificationPatternTypes.HighAccuracy],
      },
    };
  }

  serialize(settings: ProductSettingsLocationIntelligenceOld): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.IpValidation]: settings[LocationIntelligenceSettingsTypes.IpValidation].value,
        [VerificationPatternTypes.VpnDetection]: settings[LocationIntelligenceSettingsTypes.VpnDetection].value,
        [VerificationPatternTypes.HighAccuracy]: settings[LocationIntelligenceSettingsTypes.HighAccuracy].value,
      },
      ipValidation: {
        allowedRegions: settings[LocationIntelligenceSettingsTypes.AllowedRegions].value,
      },
    };
  }

  onAdd(): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.IpValidation]: LocationIntelligenceValidationTypes.Basic,
      },
    };
  }

  onRemove(): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.IpValidation]: LocationIntelligenceValidationTypes.None,
        [VerificationPatternTypes.VpnDetection]: false,
        [VerificationPatternTypes.HighAccuracy]: false,
      },
    };
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns?.[VerificationPatternTypes.IpValidation] !== undefined && flow.verificationPatterns[VerificationPatternTypes.IpValidation] !== LocationIntelligenceValidationTypes.None;
  }

  getVerification(verification: VerificationResponse): LocationIntelligenceVerificationOutput {
    const locationIntelligenceStep = getLocationIntelligenceStep(verification?.steps);
    return {
      ...locationIntelligenceStep?.data,
      isRunning: locationIntelligenceStep?.status < 200,
      vpnDetection: locationIntelligenceStep?.error?.code === LocationIntelligenceErrorCodes.VpnDetected,
      geoRestriction: locationIntelligenceStep?.error?.code === LocationIntelligenceErrorCodes.Restricted,
    };
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    const locationIntelligenceStep = getLocationIntelligenceStep(verification?.steps);
    if (!locationIntelligenceStep) {
      return false;
    }
    return getStepStatus(locationIntelligenceStep) === StepStatus.Failure;
  }
}
