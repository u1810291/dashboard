import { CountrySpecificChecks, DocumentStepTypes, getStepExtra, IStep, StepStatus, VerificationStepTypes } from 'models/Step.model';
import { VerificationPatterns, VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { BiometricTypes } from 'models/Biometric.model';
import { MerchantTags } from 'models/Merchant.model';
import { NationalIdTypes, VerificationDocument } from 'models/Document.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { dateSortCompare } from 'lib/date';
import { BaseError } from 'models/Error.model';

export enum GovernmentCheckSettingTypes {
  PostponedTimeout = 'postponedTimeout',
  CountriesGovChecks = 'countriesGovChecks'
}

export enum GovernmentChecksTypes {
  GovernmentDatabaseCheck = 'governmentDatabaseCheck'
}

export enum GovCheckStepTypes {
  None = 'none',
  Cpf = 'cpf',
  CpfFacematch = 'cpf+facematch',
}

export const verificationPatternsGovchecksDefault = {
  [VerificationPatternTypes.ArgentinianAfip]: false,
  [VerificationPatternTypes.ArgentinianAnses]: false,
  [VerificationPatternTypes.ArgentinianDni]: false,
  [VerificationPatternTypes.ArgentinianRenaper]: false,
  [VerificationPatternTypes.ArgentinianRenaperFacematch]: false,
  [VerificationPatternTypes.BolivianOep]: false,
  [VerificationPatternTypes.BrazilianCpf]: GovCheckStepTypes.None,
  [VerificationPatternTypes.ChileanRut]: false,
  [VerificationPatternTypes.ChileanDriverLicense]: false,
  [VerificationPatternTypes.ChileanRegistroCivil]: false,
  [VerificationPatternTypes.ColombianBdua]: false,
  [VerificationPatternTypes.ColombianContraloria]: false,
  [VerificationPatternTypes.ColombianNationalPolice]: false,
  [VerificationPatternTypes.ColombianNit]: false,
  [VerificationPatternTypes.ColombianProcuraduria]: false,
  [VerificationPatternTypes.ColombianRegistraduria]: false,
  [VerificationPatternTypes.ColombianRunt]: false,
  [VerificationPatternTypes.CostaRicanAtv]: false,
  [VerificationPatternTypes.CostaRicanTse]: false,
  [VerificationPatternTypes.CostaRicanSocialSecurity]: false,
  [VerificationPatternTypes.DominicanJce]: false,
  [VerificationPatternTypes.EcuadorianRegistroCivil]: false,
  [VerificationPatternTypes.EcuadorianSri]: false,
  [VerificationPatternTypes.GhanaianGra]: false,
  [VerificationPatternTypes.GuatemalanTse]: false,
  [VerificationPatternTypes.HonduranRnp]: false,
  [VerificationPatternTypes.KenyanEcitizen]: false,
  [VerificationPatternTypes.MexicanCurp]: false,
  [VerificationPatternTypes.MexicanIne]: false,
  [VerificationPatternTypes.MexicanPep]: false,
  [VerificationPatternTypes.MexicanRfc]: false,
  [VerificationPatternTypes.NigerianDl]: false,
  [VerificationPatternTypes.NigerianNin]: false,
  [VerificationPatternTypes.NigerianVin]: false,
  [VerificationPatternTypes.NigerianBvn]: false,
  [VerificationPatternTypes.ParaguayanRcp]: false,
  [VerificationPatternTypes.PeruvianReniec]: false,
  [VerificationPatternTypes.PeruvianSunat]: false,
  [VerificationPatternTypes.SalvadorianTse]: false,
  [VerificationPatternTypes.PanamenianTribunalElectoral]: false,
  [VerificationPatternTypes.VenezuelanCne]: false,
  [VerificationPatternTypes.VenezuelanSeniat]: false,
  [VerificationPatternTypes.UgandanElectoralCommission]: false,
  [VerificationPatternTypes.BrazilianNoCriminalRecordsValidation]: false,
};

export const GovCheckTypesForStep = {
  [DocumentStepTypes.BrazilianCpf]: {
    none: GovCheckStepTypes.None,
    cpf: GovCheckStepTypes.Cpf,
    cpfFacematch: GovCheckStepTypes.CpfFacematch,
  },
};

export enum GovCheckCountryTypes {
  Argentina = 'argentina',
  Bolivia = 'bolivia',
  Brazil = 'brazil',
  Chile = 'chile',
  Colombia = 'colombia',
  CostaRica = 'costaRica',
  Ecuador = 'ecuador',
  Ghana = 'ghana',
  Guatemala = 'guatemala',
  Honduras = 'honduras',
  Dominican = 'dominican',
  Kenya = 'kenya',
  Mexico = 'mexico',
  Nigeria = 'nigeria',
  Paraguay = 'paraguay',
  Peru = 'peru',
  Salvador = 'salvador',
  Panama = 'panama',
  Venezuela = 'venezuela',
  Uganda = 'uganda'
}

export const govCheckCountriesOrder = [
  GovCheckCountryTypes.Argentina,
  GovCheckCountryTypes.Bolivia,
  GovCheckCountryTypes.Brazil,
  GovCheckCountryTypes.Chile,
  GovCheckCountryTypes.Colombia,
  GovCheckCountryTypes.CostaRica,
  GovCheckCountryTypes.Dominican,
  GovCheckCountryTypes.Ecuador,
  GovCheckCountryTypes.Ghana,
  GovCheckCountryTypes.Guatemala,
  GovCheckCountryTypes.Honduras,
  GovCheckCountryTypes.Mexico,
  GovCheckCountryTypes.Kenya,
  GovCheckCountryTypes.Nigeria,
  GovCheckCountryTypes.Paraguay,
  GovCheckCountryTypes.Peru,
  GovCheckCountryTypes.Salvador,
  GovCheckCountryTypes.Panama,
  GovCheckCountryTypes.Venezuela,
  GovCheckCountryTypes.Uganda,
];

export interface GovCheckStep {
  status: number;
  checkStatus: StepStatus;
  error: BaseError | null;
  data: any | null;
}

export interface GovCheckVerificationData {
  document: VerificationDocument[];
  govCheckWithoutDocument: IStep<GovCheckStep>[];
}

export interface GovCheckOptions {
  description: boolean;
  // TODO: @richvoronov figure out with types
  id: string;
  stepTypeAlias?: GovCheckStepTypes;
  merchantTags?: MerchantTags[];
  value?: boolean;
  isSupportFacematch?: boolean;
}

export interface GovCheck {
  // TODO: @richvoronov figure out with types
  id: VerificationPatternTypes;
  default: boolean;
  stepTypeAlias?: GovCheckStepTypes;
  option?: GovCheckOptions;
  value?: boolean;
  description?: boolean;
  isSupportFacematch?: boolean;
  merchantTags?: MerchantTags[];
  hideIsCantUse?: boolean;
}

export interface GovCheckOptionsParsed extends GovCheckOptions {
  isDisabled?: boolean;
  isCanUse?: boolean;
}
export interface GovCheckParsed extends GovCheck {
  isDisabled: boolean;
  isCanUse?: boolean;
  option?: GovCheckOptionsParsed;
}

export interface GovCheckConfiguration {
  country: GovCheckCountryTypes;
  checks: GovCheck[];
}

export const GovCheckConfigurations: GovCheckConfiguration[] = [
  {
    country: GovCheckCountryTypes.Argentina,
    checks: [
      // {
      //   id: DocumentStepTypes.ArgentinianAnses,
      //   default: false,
      // },
      {
        id: DocumentStepTypes.ArgentinianRenaper,
        default: false,
        option: {
          id: DocumentStepTypes.ArgentinianAfip,
          description: false,
        },
      },
      {
        id: DocumentStepTypes.ArgentinianRenaperFacematch,
        merchantTags: [MerchantTags.CanUseFacematchCPFInAr],
        default: false,
        description: true,
        isSupportFacematch: true,
      },
      {
        id: DocumentStepTypes.ArgentinianDni,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Bolivia,
    checks: [
      {
        id: DocumentStepTypes.BolivianOep,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Brazil,
    checks: [
      {
        id: DocumentStepTypes.BrazilianCpf,
        default: false,
        stepTypeAlias: GovCheckTypesForStep[DocumentStepTypes.BrazilianCpf].cpf,
        option: {
          id: DocumentStepTypes.FaceMatch,
          merchantTags: [MerchantTags.CanUseFacematchCPFInBr],
          stepTypeAlias: GovCheckTypesForStep[DocumentStepTypes.BrazilianCpf].cpfFacematch,
          description: true,
          isSupportFacematch: true,
        },
      },
      {
        id: DocumentStepTypes.BrazilianNoCriminalRecordsValidation,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Chile,
    checks: [
      {
        id: DocumentStepTypes.ChileanRegistroCivil,
        default: false,
      },
      {
        id: DocumentStepTypes.ChileanDriverLicense,
        default: false,
      },
      {
        id: DocumentStepTypes.ChileanRut,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Colombia,
    checks: [
      {
        id: DocumentStepTypes.ColombianBdua,
        default: false,
      },
      {
        id: DocumentStepTypes.ColombianContraloria,
        default: false,
      },
      {
        id: DocumentStepTypes.ColombianNit,
        default: false,
      },
      {
        id: DocumentStepTypes.ColombianRegistraduria,
        default: false,
      },
      {
        id: DocumentStepTypes.ColombianNationalPolice,
        default: false,
      },
      {
        id: DocumentStepTypes.ColombianProcuraduria,
        default: false,
      },
      {
        id: DocumentStepTypes.ColombianRunt,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.CostaRica,
    checks: [
      {
        id: DocumentStepTypes.CostaRicanAtv,
        default: false,
      },
      {
        id: DocumentStepTypes.CostaRicanTse,
        default: false,
      },
      {
        id: DocumentStepTypes.CostaRicanSocialSecurity,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Ecuador,
    checks: [
      {
        id: DocumentStepTypes.EcuadorianRegistroCivil,
        default: false,
      },
      {
        id: DocumentStepTypes.EcuadorianSri,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Honduras,
    checks: [
      {
        id: DocumentStepTypes.HonduranRnp,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Ghana,
    checks: [
      {
        id: DocumentStepTypes.GhanaianGra,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Guatemala,
    checks: [
      {
        id: DocumentStepTypes.GuatemalanTse,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Dominican,
    checks: [
      {
        id: DocumentStepTypes.DominicanJce,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Kenya,
    checks: [
      {
        id: DocumentStepTypes.KenyanEcitizen,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Mexico,
    checks: [
      {
        id: DocumentStepTypes.CURP,
        default: false,
      },
      {
        id: DocumentStepTypes.INE,
        default: false,
      },
      {
        id: DocumentStepTypes.MexicanPep,
        default: false,
      },
      {
        id: DocumentStepTypes.RFC,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Nigeria,
    checks: [
      {
        id: DocumentStepTypes.NigerianDl,
        default: false,
        isSupportFacematch: true,
      },
      {
        id: VerificationPatternTypes.NigerianNin,
        default: false,
        isSupportFacematch: true,
      },
      {
        id: VerificationPatternTypes.NigerianVin,
        default: false,
      },
      {
        id: VerificationPatternTypes.NigerianBvn,
        merchantTags: [MerchantTags.CanUseNigerianBNV],
        hideIsCantUse: true,
        default: false,
        isSupportFacematch: true,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Paraguay,
    checks: [
      {
        id: DocumentStepTypes.ParaguayanRcp,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Peru,
    checks: [
      {
        id: DocumentStepTypes.PeruvianReniec,
        default: false,
      },
      {
        id: DocumentStepTypes.PeruvianSunat,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Venezuela,
    checks: [
      {
        id: DocumentStepTypes.VenezuelanCne,
        default: false,
      },
      {
        id: DocumentStepTypes.VenezuelanSeniat,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Panama,
    checks: [
      {
        id: DocumentStepTypes.PanamenianTribunalElectoral,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Salvador,
    checks: [
      {
        id: DocumentStepTypes.SalvadorianTse,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Uganda,
    checks: [
      {
        id: DocumentStepTypes.UgandanElectoralCommission,
        default: false,
      },
    ],
  },
];

export const govCheckDisplayOptions = {
  [DocumentStepTypes.ArgentinianDni]: {
    documentNumber: {
      hidden: true,
    },
  },
  [DocumentStepTypes.BolivianOep]: {
    fullName: {},
    documentNumber: {},
    city: {
      inline: true,
    },
    state: {
      inline: true,
    },
    country: {},
  },
  [DocumentStepTypes.BrazilianCpf]: {
    fullName: {},
    dateOfBirth: {
      inline: true,
    },
    nationality: {
      inline: true,
    },
    gender: {},
    cpfNumber: {
      inline: true,
    },
    taxStatus: {
      inline: true,
    },
    documentType: {
      inline: true,
    },
    documentNumber: {
      inline: true,
    },
    expirationDate: {
      inline: true,
    },
    governmentFaceMatched: {
      hidden: true,
    },
    governmentFaceMatchScorePercentage: {
      dependentFieldForFailedCheck: 'governmentFaceMatched',
      hiddenIfNotExists: true,
    },
  },
  [DocumentStepTypes.DominicanJce]: {
    valid: {},
  },
  [DocumentStepTypes.CostaRicanAtv]: {
    fullName: {},
    registeredTaxPayer: {},
    dateOfRegistration: {},
    documentNumber: {
      inline: true,
    },
    hasDebts: {},
    documentStatus: {
      hidden: true,
    },
  },
  [DocumentStepTypes.ColombianNationalPolice]: {
    documentNumber: {
      inline: true,
    },
    fullName: {},
    criminalRecords: {},
  },
  [DocumentStepTypes.GuatemalanTse]: {
    fullName: {},
  },
  [DocumentStepTypes.ColombianContraloria]: {
    fiscalStatusValid: {},
    documentNumber: {
      inline: true,
    },
    verificationCode: {
      inline: true,
    },
  },
  [DocumentStepTypes.ColombianProcuraduria]: {
    fullName: {},
    documentNumber: {
      inline: true,
    },
    criminalRecords: {},
  },
  [DocumentStepTypes.ColombianNit]: {
    taxID: {},
  },
  [DocumentStepTypes.CostaRicanTse]: {
    firstName: {
      inline: true,
    },
    lastName: {
      inline: true,
    },
    secondSurname: {},
    dateOfBirth: {
      inline: true,
    },
    nationality: {
      inline: true,
    },
    documentNumber: {
      inline: true,
    },
    deceased: {
      inline: true,
    },
  },
  [DocumentStepTypes.GhanaianGra]: {
    personalNumber: {
      inline: true,
    },
    taxStatusValid: {},
  },
  [DocumentStepTypes.HonduranRnp]: {
    documentNumber: {
      inline: true,
    },
    fullName: {
      inline: true,
    },
    city: {},
  },
  [DocumentStepTypes.MexicanPep]: {
    fullName: {},
    isPep: {},
    Position: {},
    State: {},
    Institution: {},
    Period: {},
    pepData: {
      hidden: true,
    },
    stepExtra: {
      hidden: true,
    },
  },
  [DocumentStepTypes.NigerianDl]: {
    firstName: {},
    lastName: {},
    issuedDate: {},
    expiryDate: {},
    stateOfIssue: {},
    gender: {},
    dateOfBirth: {},
    middleName: '',
  },
  [VerificationStepTypes.NigerianLegalValidation]: {
    [VerificationPatternTypes.NigerianBvn]: {
      govDBPhotoUrl: {
        isCentered: true,
        hiddenIfNotExists: true,
      },
      firstName: {
        inline: true,
      },
      middleName: {
        inline: true,
      },
      lastName: {
        inline: true,
      },
      gender: {
        inline: true,
      },
      dateOfBirth: {
        inline: true,
      },
      nationality: {
        inline: true,
      },
      bvn: {
        hidden: true,
        formatter: (bvn = [], data) => ({ ...data, documentNumber: bvn, documentType: NationalIdTypes.BVN }),
      },
      documentNumber: {
      },
      documentType: {
        inline: true,
      },
      subStepId: {
        hidden: true,
      },
      photo: {
        hidden: true,
      },
    },
    [VerificationPatternTypes.NigerianVin]: {
      govDBPhotoUrl: {
        isCentered: true,
        hiddenIfNotExists: true,
      },
      firstName: {
        inline: true,
      },
      middleName: {
        inline: true,
      },
      lastName: {
        inline: true,
      },
      gender: {
        inline: true,
      },
      dateOfBirth: {
        inline: true,
      },
      nationality: {
        inline: true,
      },
      vin: {
        hidden: true,
        formatter: (vin = [], data) => ({ ...data, documentNumber: vin, documentType: NationalIdTypes.VIN }),
      },
      documentNumber: {
      },
      documentType: {
        inline: true,
      },
      profession: {
        inline: true,
      },
      subStepId: {
        hidden: true,
      },
      pollingUnitCode: {
        hidden: true,
      },
      fullName: {
        hidden: true,
      },
      occupation: {
        hidden: true,
      },
      photo: {
        hidden: true,
      },
    },
    [VerificationPatternTypes.NigerianNin]: {
      govDBPhotoUrl: {
        isCentered: true,
        hiddenIfNotExists: true,
      },
      firstName: {
        inline: true,
      },
      middleName: {
        inline: true,
      },
      lastName: {
        inline: true,
      },
      gender: {
        inline: true,
      },
      dateOfBirth: {
        inline: true,
      },
      nationality: {
        inline: true,
      },
      nin: {
        hidden: true,
        formatter: (nin = [], data) => ({ ...data, documentNumber: nin, documentType: NationalIdTypes.NIN }),
      },
      documentNumber: {
      },
      documentType: {
        inline: true,
      },
      profession: {
        inline: true,
      },
      phone: {
        inline: true,
      },
      subStepId: {
        hidden: true,
      },
      photo: {
        hidden: true,
      },
      stateOfOrigin: {
        hidden: true,
      },
      lgaOfOrigin: {
        hidden: true,
      },
      placeOfOrigin: {
        hidden: true,
      },
      title: {
        hidden: true,
      },
      height: {
        hidden: true,
      },
      email: {
        hidden: true,
      },
      birthState: {
        hidden: true,
      },
      birthCountry: {
        hidden: true,
      },
      nextOfKin: {
        hidden: true,
      },
      nspokenlang: {
        hidden: true,
      },
      religion: {
        hidden: true,
      },
      signature: {
        hidden: true,
      },
      residence: {
        hidden: true,
      },
      fieldMatches: {
        hidden: true,
      },
    },
  },
  [DocumentStepTypes.ParaguayanRcp]: {
    fullName: {},
    gender: {
      inline: true,
    },
    nationality: {
      inline: true,
    },
    city: {
      inline: true,
    },
    state: {
      inline: true,
    },
  },
  [DocumentStepTypes.PeruvianSunat]: {},
  [DocumentStepTypes.SalvadorianTse]: {
    fullName: {},
    documentNumber: {},
    address: {},
    city: {
      inline: true,
    },
    state: {
      inline: true,
    },
  },
  [DocumentStepTypes.VenezuelanCne]: {
    fullName: {},
    documentNumber: {},
    city: {
      inline: true,
    },
    state: {
      inline: true,
    },
  },
  [DocumentStepTypes.VenezuelanSeniat]: {
    documentNumber: {},
    fullName: {},
  },
  [DocumentStepTypes.CostaRicanSocialSecurity]: {
    fullName: {},
    insuranceStatus: {},
  },
  [DocumentStepTypes.ChileanRut]: {
    fullName: {},
    rut: {
      inline: true,
    },
    active: {
      inline: true,
    },
    economicActivities: {
      hidden: true,
      formatter: (economicActivities = [], data) => ({ ...data, ...economicActivities.sort((a, b) => dateSortCompare(a.createdAt, b.createdAt))[0] }),
    },
    activity: {
      hiddenIfNotExists: true,
    },
    code: {
      hiddenIfNotExists: true,
      inline: true,
    },
    affectsVat: {
      hiddenIfNotExists: true,
      inline: true,
    },
    category: {
      hiddenIfNotExists: true,
      inline: true,
    },
    date: {
      hiddenIfNotExists: true,
      inline: true,
    },
  },
  [DocumentStepTypes.ChileanDriverLicense]: {
    blockType: {
      hideIsField: false,
      filedCondition: 'blocked',
    },
    blockedDate: {
      hideIsField: false,
      filedCondition: 'blocked',
    },
    blockedReason: {
      hideIsField: false,
      filedCondition: 'blocked',
    },
  },
  [DocumentStepTypes.ColombianRunt]: {
    fullName: {},
    documentNumber: {
      inline: true,
    },
    activeDriver: {
      inline: true,
    },
    dateOfRegistration: {
      inline: true,
    },
    licenseData: {
      hidden: true,
      formatter: (licenseData: any = {}, data) => ({ ...data, hasFines: licenseData.hasFines, activeLicense: licenseData.driverLicenses.some((dl) => dl.activeLicense) }),
    },
    activeLicense: {
      inline: true,
    },
    hasFines: {
      inline: true,
    },
  },
};

export function isCanUseGovCheck(govCheck: GovCheck | GovCheckOptions, merchantTags: MerchantTags[]): boolean {
  if (!govCheck?.merchantTags) {
    return true;
  }

  return govCheck.merchantTags?.every((tag) => merchantTags.includes(tag));
}

export function isGovCheckOptionDisabled(govCheck: GovCheck, verificationPattern: VerificationPatterns, merchantTags: MerchantTags[]): boolean {
  if (!isCanUseGovCheck(govCheck.option, merchantTags)) {
    return true;
  }

  if (govCheck.id === DocumentStepTypes.BrazilianCpf) {
    const isCorrectBiometricsEnabled = [BiometricTypes.liveness.toString(), BiometricTypes.selfie.toString(), BiometricTypes.voiceLiveness.toString()].includes(verificationPattern[VerificationPatternTypes.Biometrics]);
    return !govCheck.value || !isCorrectBiometricsEnabled;
  }

  if (govCheck.id === DocumentStepTypes.ArgentinianRenaper) {
    return !govCheck.value;
  }

  return false;
}

export function isGovCheckDisabled(govCheck: GovCheck, verificationPattern: VerificationPatterns, merchantTags: MerchantTags[]): boolean {
  if (!isCanUseGovCheck(govCheck, merchantTags)) {
    return true;
  }

  if (govCheck.id === DocumentStepTypes.ArgentinianRenaperFacematch) {
    const isCorrectBiometricsEnabled = [BiometricTypes.liveness.toString(), BiometricTypes.selfie.toString(), BiometricTypes.voiceLiveness.toString()].includes(verificationPattern[VerificationPatternTypes.Biometrics]);
    return !isCorrectBiometricsEnabled;
  }

  return false;
}

export function govCheckParse(list: GovCheck[], patterns: VerificationPatterns, merchantTags: MerchantTags[]): GovCheckParsed[] {
  return list.map((govCheck) => {
    if (!isCanUseGovCheck(govCheck, merchantTags) && govCheck.hideIsCantUse) {
      return null;
    }

    const item: GovCheckParsed = {
      ...govCheck,
      isDisabled: isGovCheckDisabled(govCheck, patterns, merchantTags),
      isCanUse: isCanUseGovCheck(govCheck, merchantTags),
    };

    if (item.option) {
      let parsedGovCheck = null;

      // VerificationPatters can have boolean or string type, so let's devide logic here for better readability
      if (typeof patterns[item.id] === 'boolean') {
        parsedGovCheck = {
          ...item,
          option: {
            ...item.option,
            value: patterns[item.option.id],
          },
          value: patterns[item.id],
        };
      }

      if (typeof patterns[item.id] === 'string') {
        const value = patterns[item.id] && patterns[item.id] !== GovCheckTypesForStep[item.id]?.none;
        parsedGovCheck = {
          ...item,
          option: {
            ...item.option,
            value: item.option.stepTypeAlias === patterns[item.id],
          },
          value,
        };
      }

      if (!parsedGovCheck) {
        parsedGovCheck = {
          ...item,
          value: item.default,
        };
      }

      parsedGovCheck.option.isDisabled = isGovCheckOptionDisabled(parsedGovCheck, patterns, merchantTags);
      parsedGovCheck.option.isCanUse = isCanUseGovCheck(parsedGovCheck.option, merchantTags);

      return parsedGovCheck;
    }

    return {
      ...item,
      value: patterns[item.id] !== undefined
        ? patterns[item.id] && patterns[item.id] !== GovCheckTypesForStep[item.id]?.none
        : item.default,
    };
  }).filter(Boolean);
}

// @ts-ignore
export const GovTimeoutHours = [...Array(25).keys()];
export const GovTimeoutMinutes = Array.from({ length: 12 }, (_, i) => i * 5);

export function convertTimeToHoursAndMinutes(ptTime) {
  const timeHMFormat = ptTime.replace('PT', '').replace('H', ':').replace('M', '');
  const result = timeHMFormat.split(':');
  if (result.length === 1) {
    return {
      hours: 0,
      minutes: parseInt(result[0], 10) || 0,
    };
  }
  return {
    hours: parseInt(result[0], 10) || 0,
    minutes: parseInt(result[1], 10) || 0,
  };
}

export function getGovCheckDocumentsSteps(verification: VerificationResponse): IStep<GovCheckStep>[] {
  return verification?.documents?.map((document) => document?.steps.filter((step) => CountrySpecificChecks.includes(step.id))).flat() || [];
}

export function getGovCheckRootSteps(verification: VerificationResponse): IStep<GovCheckStep>[] {
  return verification?.steps
    .filter((step) => CountrySpecificChecks.includes(step.id)).map((step) => getStepExtra(step)) || [];
}

export function getGovCheckVerificationSteps(verification: VerificationResponse): IStep<GovCheckStep>[] {
  const govCheckDocumentsSteps = getGovCheckDocumentsSteps(verification);
  const govCheckRootSteps = getGovCheckRootSteps(verification);
  return govCheckDocumentsSteps.concat(govCheckRootSteps);
}
