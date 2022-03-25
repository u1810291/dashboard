import React from 'react';
import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { IFlow } from 'models/Flow.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { BackgroundChecksSteps, BackgroundCheckSettingTypes, BackgroundChecksTypes, backgroundCheckVerificationPatterns } from 'models/BackgroundCheck.model';
import { ProductBaseFlowBuilder } from 'apps/flowBuilder';
import { DeepPartial } from 'lib/object';
import { BackgroundCheckSettings } from '../components/BackgroundCheckSettings/BackgroundCheckSettings';
import { BackgroundCheckVerificationProduct } from '../components/BackgroundCheckVerificationProduct/BackgroundCheckVerificationProduct';
import { ReactComponent as BackgroundCheckSVG } from '../assets/background-check.svg';

type ProductSettingsBackgroundCheck = ProductSettings<BackgroundCheckSettingTypes>;

export class BackgroundCheck extends ProductBaseFlowBuilder implements Product {
  id = ProductTypes.BackgroundCheck;
  inputs = [
    ProductInputTypes.NationalId,
  ];
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
    ProductIntegrationTypes.Api,
  ];
  order = 800;
  requiredProductType = ProductTypes.DocumentVerification;
  checks = [
    {
      id: BackgroundChecksTypes.CountryDependantSources,
      isActive: true,
    },
  ];

  icon = () => <BackgroundCheckSVG />;

  component = BackgroundCheckSettings;
  componentVerification = BackgroundCheckVerificationProduct;

  getVerification(verification: VerificationResponse): any {
    return verification?.documents || [];
  }

  onAdd(): DeepPartial<IFlow> {
    return {};
  }

  isInFlow(flow: IFlow): boolean {
    const isBackgroundChecksEnabled = Object.entries(flow?.verificationPatterns).some(
      ([key, value]) => backgroundCheckVerificationPatterns.includes(key as VerificationPatternTypes) && value,
    );
    return !!flow?.postponedTimeout || isBackgroundChecksEnabled;
  }

  isInVerification(verification: VerificationResponse): boolean {
    return verification?.steps?.some((step) => BackgroundChecksSteps.includes(step.id));
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    const backgroundChecksStep = verification?.steps?.find((step) => BackgroundChecksSteps.includes(step.id));

    return !!backgroundChecksStep.error?.type;
  }

  parser(flow: IFlow): ProductSettingsBackgroundCheck {
    return {
      [BackgroundCheckSettingTypes.BackgroundChecksSetting]: {
        value: flow?.verificationPatterns,
      },
    };
  }

  serialize(settings: ProductSettingsBackgroundCheck): DeepPartial<IFlow> {
    return {
      verificationPatterns: settings[BackgroundCheckSettingTypes.BackgroundChecksSetting]?.value,
    };
  }

  onRemove(): DeepPartial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.BackgroundMexicanBuholegal]: false,
      },
    };
  }
}
