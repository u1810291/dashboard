import React from 'react';
import { ProductBaseService } from 'apps/Product/services/ProductBase.service';
import { IFlow } from 'models/Flow.model';
import { Product, ProductInputTypes, ProductIntegrationTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/Verification.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { VerificationStepTypes } from 'models/Step.model';
import { CustomWatchlistCheckTypes, CustomWatchlistSettingsTypes, CustomWatchlistStep } from '../models/CustomWatchlist.models';
import { ReactComponent as FilesWithEye } from '../assets/files-with-eye.svg';
import { CustomWatchlistVerification } from '../components/CustomWatchlistVerification/CustomWatchlistVerification';
import { CustomWatchlistSettings } from '../components/CustomWatchlistSettings/CustomWatchlistSettings';

type ProductSettingsCustomWatchlist = ProductSettings<CustomWatchlistSettingsTypes>;

export class CustomWatchlist extends ProductBaseService implements Product<ProductSettingsCustomWatchlist> {
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
      [CustomWatchlistSettingsTypes.Watchlists]: {
        value: flow[CustomWatchlistSettingsTypes.Watchlists],
      },
    };
  }

  serialize(settings: ProductSettingsCustomWatchlist): Partial<IFlow> {
    return {
      [CustomWatchlistSettingsTypes.Watchlists]: settings[CustomWatchlistSettingsTypes.Watchlists].value,
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
      [CustomWatchlistSettingsTypes.Watchlists]: [],
      verificationPatterns: {
        [VerificationPatternTypes.CustomWatchlistsValidation]: false,
      },
    };
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns?.[VerificationPatternTypes.CustomWatchlistsValidation];
  }

  getVerification(verification: VerificationResponse): any {
    return verification;
  }

  hasFailedCheck(verifcation: VerificationResponse): boolean {
    const step: CustomWatchlistStep = verifcation.steps.find((dataStep) => dataStep.id === VerificationStepTypes.CustomWatchlistsValidation);
    return !!step?.error;
  }

  isInVerification(verification: VerificationResponse): boolean {
    return !!verification.steps.find((dataStep) => dataStep.id === VerificationStepTypes.CustomWatchlistsValidation);
  }
}
