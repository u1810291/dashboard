import { FlowIssue } from 'apps/ui';
import React from 'react';
import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { IFlow } from 'models/Flow.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { BackgroundChecksSteps, BackgroundCheckSettingTypes, BackgroundChecksTypes, BackgroundCheckTypes, backgroundCheckVerificationPatterns } from 'models/BackgroundCheck.model';
import { ProductBaseFlowBuilder } from 'apps/flowBuilder';
import { BackgroundCheckSettings } from '../components/BackgroundCheckSettings/BackgroundCheckSettings';
import { BackgroundCheckVerificationProduct } from '../components/BackgroundCheckVerificationProduct/BackgroundCheckVerificationProduct';
import { ReactComponent as BackgroundCheckSVG } from '../assets/background-check.svg';
import { BackgroundChecksErrorsToHide } from 'models/Step.model';

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

  onAdd(): Partial<IFlow> {
    return {};
  }

  isInFlow(flow: IFlow): boolean {
    const mexicanBuholegal = flow?.verificationPatterns[VerificationPatternTypes.BackgroundMexicanBuholegal];
    const brazilianChecks = flow?.verificationPatterns[VerificationPatternTypes.BackgroundBrazilianChecks];
    const isBackgroundChecksEnabled = mexicanBuholegal || (brazilianChecks !== BackgroundCheckTypes.None);
    return Boolean(flow?.postponedTimeout) || isBackgroundChecksEnabled;
  }

  isInVerification(verification: VerificationResponse): boolean {
    return verification?.steps?.some((step) => BackgroundChecksSteps.includes(step.id) && !(step?.error?.code && BackgroundChecksErrorsToHide[step.error.code]));
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    const backgroundChecksStep = verification?.steps?.find((step) => BackgroundChecksSteps.includes(step.id) && !(step?.error?.code && BackgroundChecksErrorsToHide[step.error.code]));

    return !!backgroundChecksStep.error?.type;
  }

  getIssuesComponent(flow: IFlow): any {
    if (!flow.verificationPatterns[VerificationPatternTypes.BackgroundMexicanBuholegal] && (flow.verificationPatterns[VerificationPatternTypes.BackgroundBrazilianChecks] === BackgroundCheckTypes.None)) {
      return () => FlowIssue('FlowBuilder.issue.countriesNotSpecified');
    }

    return null;
  }

  parser(flow: IFlow): ProductSettingsBackgroundCheck {
    return {
      [BackgroundCheckSettingTypes.BackgroundChecksSetting]: {
        value: flow?.verificationPatterns,
      },
    };
  }

  serialize(settings: ProductSettingsBackgroundCheck): Partial<IFlow> {
    return {
      verificationPatterns: settings[BackgroundCheckSettingTypes.BackgroundChecksSetting]?.value,
    };
  }

  onRemove(): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.BackgroundMexicanBuholegal]: false,
        [VerificationPatternTypes.BackgroundBrazilianChecks]: BackgroundCheckTypes.None,
      },
    };
  }
}
