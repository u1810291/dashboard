import { ProductBaseFlowBuilder } from 'apps/flowBuilder';
import { IFlow } from 'models/Flow.model';
import { MerchantTags } from 'models/Merchant.model';
import { Product, ProductInputTypes, ProductSettings, ProductTypes } from 'models/Product.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { FiUser } from 'react-icons/fi';
import isNil from 'lodash/isNil';
import { getStepStatus, IStep, StepStatus } from 'models/Step.model';
import { GovCheckStepTypes } from 'apps/GovCheck/models/GovCheck.model';
import { FacematchCheckSettingsTypes, FacematchCheckStepData, FacematchSourceTypes, FACEMATCH_DEFAULT_APPROVE_THRESHOLD, FACEMATCH_DEFAULT_REJECT_THRESHOLD, IFacematchSource, IFacematchSourceDocumentOptions, IFacematchSourceGovCheckOptions } from '../models/Facematch.model';
import { FacematchSettings } from '../components/FacematchSettings/FacematchSettings';
import { FacematchVerificationIssues } from '../components/FacematchVerificationIssues/FacematchVerificationIssues';
import { FacematchVerification } from '../components/FacematchVerification/FacematchVerification';

export class Facematch extends ProductBaseFlowBuilder implements Product {
  merchantTags: MerchantTags[] = [];

  id = ProductTypes.Facematch;
  order = 700;

  inputs = [
    ProductInputTypes.ImageSources,
  ];

  checks = [];

  icon = FiUser;
  component = FacematchSettings;
  componentVerification = FacematchVerification;

  parser(flow?: IFlow, productsInGraph?: ProductTypes[]): ProductSettings<FacematchCheckSettingsTypes> {
    const { verificationPatterns, verificationSteps, facematchServiceConfig: { sources, approveThreshold, rejectThreshold } } = flow;
    const isBiometricStepActive = productsInGraph.includes(ProductTypes.BiometricVerification);
    const isDocumentStepActive = productsInGraph.includes(ProductTypes.DocumentVerification);
    const isGovCheckStepActive = productsInGraph.includes(ProductTypes.GovernmentCheck);

    return {
      [FacematchCheckSettingsTypes.FacematchEnabled]: {
        value: verificationPatterns[VerificationPatternTypes.Facematch],
      },
      [FacematchCheckSettingsTypes.FacematchSettings]: {
        value: rejectThreshold,
      },
      [FacematchCheckSettingsTypes.RejectThreshold]: {
        value: rejectThreshold,
      },
      [FacematchCheckSettingsTypes.ApproveThreshold]: {
        value: approveThreshold,
      },
      [FacematchCheckSettingsTypes.Sources]: {
        value: sources,
      },
      [FacematchCheckSettingsTypes.DocumentTypes]: {
        value: verificationSteps,
      },
      [FacematchCheckSettingsTypes.ProductsInGraph]: {
        value: {
          isBiometricStepActive,
          isDocumentStepActive,
          isGovCheckStepActive,
        },
      },
      [FacematchCheckSettingsTypes.CountriesGovChecks]: {
        value: verificationPatterns,
      },
    };
  }

  serialize(settings: ProductSettings<FacematchCheckSettingsTypes>): Partial<IFlow> {
    return {
      verificationPatterns: {
        ...(settings[FacematchCheckSettingsTypes.CountriesGovChecks]?.value || {}),
        [VerificationPatternTypes.Facematch]: settings[FacematchCheckSettingsTypes.FacematchEnabled].value,
      },
      facematchServiceConfig: {
        approveThreshold: settings[FacematchCheckSettingsTypes.ApproveThreshold].value,
        rejectThreshold: settings[FacematchCheckSettingsTypes.RejectThreshold].value,
        sources: settings[FacematchCheckSettingsTypes.Sources].value,
      },
    };
  }

  getVerification(verification: VerificationResponse): IStep<FacematchCheckStepData> {
    const facematchStep = verification.steps.find((step) => step.id === VerificationPatternTypes.Facematch);

    return { ...facematchStep, checkStatus: getStepStatus(facematchStep) };
  }

  isInFlow(flow: IFlow): boolean {
    return flow?.verificationPatterns?.[VerificationPatternTypes.Facematch];
  }

  onAdd(): Partial<IFlow> {
    return {
      facematchServiceConfig: {
        sources: [],
        approveThreshold: FACEMATCH_DEFAULT_APPROVE_THRESHOLD,
        rejectThreshold: FACEMATCH_DEFAULT_REJECT_THRESHOLD,
      },
      verificationPatterns: {
        [VerificationPatternTypes.Facematch]: true,
      },
    };
  }

  onRemove(): Partial<IFlow> {
    return {
      facematchServiceConfig: {
        sources: [],
        approveThreshold: FACEMATCH_DEFAULT_APPROVE_THRESHOLD,
        rejectThreshold: FACEMATCH_DEFAULT_REJECT_THRESHOLD,
      },
      verificationPatterns: {
        [VerificationPatternTypes.Facematch]: false,
      },
    };
  }

  getMissingProductsInGraph(productsInGraph: ProductTypes[] = [], sources?: IFacematchSource[]): IFacematchSource[] {
    const isBiometricStepActive = productsInGraph.includes(ProductTypes.BiometricVerification);
    const isDocumentStepActive = productsInGraph.includes(ProductTypes.DocumentVerification);
    const isGovCheckStepActive = productsInGraph.includes(ProductTypes.GovernmentCheck);

    return sources.filter(({ type }) => {
      switch (type) {
        case FacematchSourceTypes.Document:
          return !isDocumentStepActive;
        case FacematchSourceTypes.Biometrics:
          return !isBiometricStepActive;
        case FacematchSourceTypes.GovermentCheck:
          return !isGovCheckStepActive;
        default:
          return false;
      }
    });
  }

  getIssuesComponent(flow: IFlow, productsInGraph?: ProductTypes[]): any {
    const { facematchServiceConfig: { sources }, verificationPatterns } = flow;
    const missingProducts = this.getMissingProductsInGraph(productsInGraph, sources);

    if (sources.length < 2) {
      return FacematchVerificationIssues.bind(this, { textId: 'Facematch.issues.notEnoughSources.description' });
    }

    if (missingProducts.length > 0) {
      return FacematchVerificationIssues.bind(this, { textId: 'Facematch.issues.missingProducts.description' });
    }

    const haveRequiredOptions = sources.every(({ type, options }) => {
      switch (type) {
        case FacematchSourceTypes.Document:
          return !isNil((options as IFacematchSourceDocumentOptions)?.verificationStepIndex);
        case FacematchSourceTypes.GovermentCheck: {
          const govCheckOptions = (options as IFacematchSourceGovCheckOptions)?.govCheckIds || [];
          const isEnabledGovchecks = govCheckOptions.every((id) => {
            if (id === VerificationPatternTypes.NigerianLegal) {
              return [
                VerificationPatternTypes.NigerianNin,
                VerificationPatternTypes.NigerianDl,
                VerificationPatternTypes.NigerianBvn,
              ].some((pattern) => verificationPatterns[pattern] === true);
            }
            return verificationPatterns[id] === true || verificationPatterns[id] === GovCheckStepTypes.CpfFacematch;
          });

          return govCheckOptions.length && isEnabledGovchecks;
        }
        default:
          return true;
      }
    });

    if (!haveRequiredOptions) {
      return FacematchVerificationIssues.bind(this, { textId: 'Facematch.issues.notHaveRequiredOptions.description' });
    }

    return null;
  }

  hasFailedCheck(verification: VerificationResponse): boolean {
    const facematchStep = verification?.steps.find((step) => step.id === VerificationPatternTypes.Facematch);
    const facematchStepStatus = getStepStatus(facematchStep);
    return [StepStatus.Incomplete, StepStatus.Failure].includes(facematchStepStatus);
  }
}
