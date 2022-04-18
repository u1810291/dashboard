import React from 'react';
import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { VerificationStepTypes } from 'models/Step.model';
import { ProductBaseFlowBuilder } from 'apps/flowBuilder';
import { CustomWatchlistCheckTypes, CustomWatchlistSettingsTypes, CustomWatchlistStepType } from '../models/CustomWatchlist.model';
import { ReactComponent as FilesWithEye } from '../assets/files-with-eye.svg';
import { CustomWatchlistVerification } from '../components/CustomWatchlistVerification/CustomWatchlistVerification';
import { CustomWatchlistSettings } from '../components/CustomWatchlistSettings/CustomWatchlistSettings';

type ProductSettingsCustomWatchlist = ProductSettings<CustomWatchlistSettingsTypes>;

export class CustomWatchlist extends ProductBaseFlowBuilder implements Product {
  id = ProductTypes.CustomWatchlist;
  order = 1200;
  integrationTypes = [
    ProductIntegrationTypes.Sdk,
    ProductIntegrationTypes.Api,
  ];
  inputs = [
    ProductInputTypes.NationalId,
  ];
  requiredProductType = ProductTypes.DocumentVerification;
  checks = [{
    id: CustomWatchlistCheckTypes.CustomDatabases,
    isActive: true,
  }];
  icon = () => <FilesWithEye />;
  component = CustomWatchlistSettings;
  componentVerification = CustomWatchlistVerification;

  parser(flow: IFlow): ProductSettingsCustomWatchlist {
    return {
      [CustomWatchlistSettingsTypes.CustomWatchlists]: {
        value: flow[CustomWatchlistSettingsTypes.CustomWatchlists],
      },
    };
  }

  serialize(settings: ProductSettingsCustomWatchlist): Partial<IFlow> {
    return {
      [CustomWatchlistSettingsTypes.CustomWatchlists]: settings[CustomWatchlistSettingsTypes.CustomWatchlists].value,
    };
  }

  onAdd(): Partial<IFlow> {
    return {
      verificationPatterns: {
        [VerificationPatternTypes.CustomWatchlistsValidation]: true,
      },
    };
  }

  onRemove(): Partial<IFlow> {
    return {
      [CustomWatchlistSettingsTypes.CustomWatchlists]: [],
      verificationPatterns: {
        [VerificationPatternTypes.CustomWatchlistsValidation]: false,
      },
    };
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns?.[VerificationPatternTypes.CustomWatchlistsValidation];
  }

  getVerification(verification: VerificationResponse): VerificationResponse {
    return verification;
  }

  hasFailedCheck(verifcation: VerificationResponse): boolean {
    const step: CustomWatchlistStepType = verifcation.steps.find((dataStep) => dataStep.id === VerificationStepTypes.CustomWatchlistsValidation);
    return !!step?.error;
  }

  isInVerification(verification: VerificationResponse): boolean {
    return !!verification.steps.find((dataStep) => dataStep.id === VerificationStepTypes.CustomWatchlistsValidation);
  }
}
