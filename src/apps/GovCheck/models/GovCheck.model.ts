import { CountrySpecificChecks, DocumentStepTypes, getStepExtra, IStep, RootGovChecksErrorsToHide, VerificationStepTypes } from 'models/Step.model';
import { IVerificationPatterns, VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { BiometricTypes } from 'models/Biometric.model';
import { MerchantTags } from 'models/Merchant.model';
import { NationalIdTypes, VerificationDocument } from 'models/Document.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { dateSortCompare } from 'lib/date';
import cloneDeep from 'lodash/cloneDeep';
import { MeritId, ProductTypes } from 'models/Product.model';
import { IFlow } from 'models/Flow.model';

export enum GovernmentCheckSettingTypes {
  PostponedTimeout = 'postponedTimeout',
  CountriesGovChecks = 'countriesGovChecks'
}

export enum GovernmentChecksTypes {
  GovernmentDatabaseCheck = 'governmentDatabaseCheck'
}

export const GovCheckMeritId: MeritId = 'gov-check';

export enum GovCheckStepTypes {
  None = 'none',
  Cpf = 'cpf',
  CpfFacematch = 'cpf+facematch',
  Renaper = 'renaper',
  RenaperAfip = 'renaper+afip',
  Ktp = 'ktp',
  KtpFacematch = 'ktp+facematch',
}

export const verificationPatternsGovchecksDefault = {
  [VerificationPatternTypes.ArgentinianAnses]: false,
  [VerificationPatternTypes.ArgentinianDni]: false,
  [VerificationPatternTypes.ArgentinianRenaper]: GovCheckStepTypes.None,
  [VerificationPatternTypes.ArgentinianRenaperExtended]: false,
  [VerificationPatternTypes.ArgentinianRenaperFacematch]: false,
  [VerificationPatternTypes.BolivianOep]: false,
  [VerificationPatternTypes.BrazilianCpf]: GovCheckStepTypes.None,
  [VerificationPatternTypes.BrazilianCpfLight]: false,
  [VerificationPatternTypes.BackgroundBrazilianChecks]: GovCheckStepTypes.None,
  [VerificationPatternTypes.ChileanRut]: false,
  [VerificationPatternTypes.ChileanDriverLicense]: false,
  [VerificationPatternTypes.ChileanRegistroCivil]: false,
  [VerificationPatternTypes.ColombianUnifiedLegalSearch]: false,
  [VerificationPatternTypes.ColombianBdua]: false,
  [VerificationPatternTypes.ColombianContraloria]: false,
  [VerificationPatternTypes.ColombianNationalPolice]: false,
  [VerificationPatternTypes.ColombianNit]: false,
  [VerificationPatternTypes.ColombianProcuraduria]: false,
  [VerificationPatternTypes.ColombianRegistraduria]: false,
  [VerificationPatternTypes.ColombianRunt]: false,
  [VerificationPatternTypes.ColombianSisben]: false,
  [VerificationPatternTypes.CostaRicanAtv]: false,
  [VerificationPatternTypes.CostaRicanTse]: false,
  [VerificationPatternTypes.CostaRicanSocialSecurity]: false,
  [VerificationPatternTypes.DominicanJce]: false,
  [VerificationPatternTypes.DominicanRnc]: false,
  [VerificationPatternTypes.EcuadorianRegistroCivil]: false,
  [VerificationPatternTypes.EcuadorianSri]: false,
  [VerificationPatternTypes.GhanaianGra]: false,
  [VerificationPatternTypes.GuatemalanTse]: false,
  [VerificationPatternTypes.HonduranRnp]: false,
  [VerificationPatternTypes.IndonesianKPTValidation]: GovCheckStepTypes.None,
  [VerificationPatternTypes.KenyanEcitizen]: false,
  [VerificationPatternTypes.MexicanCurp]: false,
  [VerificationPatternTypes.MexicanIne]: false,
  [VerificationPatternTypes.MexicanPep]: false,
  [VerificationPatternTypes.MexicanRfc]: false,
  [VerificationPatternTypes.NigerianCac]: false,
  [VerificationPatternTypes.NigerianDl]: false,
  [VerificationPatternTypes.NigerianNin]: false,
  [VerificationPatternTypes.NigerianVin]: false,
  [VerificationPatternTypes.NigerianBvn]: false,
  [VerificationPatternTypes.NigerianTin]: false,
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

export const GovCheckTypesForPattern = {
  [VerificationPatternTypes.BrazilianCpf]: {
    none: GovCheckStepTypes.None,
    cpf: GovCheckStepTypes.Cpf,
    cpfFacematch: GovCheckStepTypes.CpfFacematch,
  },
  [VerificationPatternTypes.ArgentinianRenaper]: {
    none: GovCheckStepTypes.None,
    renaper: GovCheckStepTypes.Renaper,
    renaperAfip: GovCheckStepTypes.RenaperAfip,
  },
  [VerificationPatternTypes.IndonesianKPTValidation]: {
    none: GovCheckStepTypes.None,
    ktp: GovCheckStepTypes.Ktp,
    ktpFacematch: GovCheckStepTypes.KtpFacematch,
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
  Indonesia = 'indonesia',
  Dominican = 'dominican',
  Kenya = 'kenya',
  Mexico = 'mexico',
  Nigeria = 'nigeria',
  Paraguay = 'paraguay',
  Peru = 'peru',
  Salvador = 'salvador',
  Panama = 'panama',
  Venezuela = 'venezuela',
  Uganda = 'uganda',
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
  GovCheckCountryTypes.Indonesia,
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

type GovCheckStepData = {subStepId?: string} | null;

export type GovCheckIStep = IStep<GovCheckStepData> & {title: string; isShowError?: boolean};

export interface GovCheckVerificationData {
  document: VerificationDocument[];
  govCheckWithoutDocument: GovCheckIStep[];
}

export interface GovCheckOptions {
  description: boolean;
  // TODO: @richvoronov figure out with types
  id: VerificationPatternTypes | GovCheckStepTypes;
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
  canNotUsedWith?: VerificationPatternTypes[];
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
      {
        id: VerificationPatternTypes.ArgentinianRenaper,
        canNotUsedWith: [VerificationPatternTypes.ArgentinianRenaperExtended],
        default: false,
        stepTypeAlias: GovCheckTypesForPattern[VerificationPatternTypes.ArgentinianRenaper].renaper,
        option: {
          id: GovCheckTypesForPattern[VerificationPatternTypes.ArgentinianRenaper].renaperAfip,
          stepTypeAlias: GovCheckTypesForPattern[VerificationPatternTypes.ArgentinianRenaper].renaperAfip,
          description: false,
        },
      },
      {
        id: VerificationPatternTypes.ArgentinianRenaperExtended,
        merchantTags: [MerchantTags.CanUseArRenaperExtended],
        canNotUsedWith: [VerificationPatternTypes.ArgentinianRenaper],
        default: false,
      },
      {
        id: VerificationPatternTypes.ArgentinianRenaperFacematch,
        merchantTags: [MerchantTags.CanUseFacematchCPFInAr],
        default: false,
        description: true,
        isSupportFacematch: true,
      },
      {
        id: VerificationPatternTypes.ArgentinianDni,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Bolivia,
    checks: [
      {
        id: VerificationPatternTypes.BolivianOep,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Brazil,
    checks: [
      {
        id: VerificationPatternTypes.BrazilianCpf,
        default: false,
        stepTypeAlias: GovCheckTypesForPattern[VerificationPatternTypes.BrazilianCpf].cpf,
        option: {
          id: GovCheckTypesForPattern[VerificationPatternTypes.BrazilianCpf].cpfFacematch,
          merchantTags: [MerchantTags.CanUseFacematchCPFInBr],
          stepTypeAlias: GovCheckTypesForPattern[VerificationPatternTypes.BrazilianCpf].cpfFacematch,
          description: true,
          isSupportFacematch: true,
        },
      },
      {
        id: VerificationPatternTypes.BrazilianCpfLight,
        default: false,
      },
      {
        id: VerificationPatternTypes.BrazilianNoCriminalRecordsValidation,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Chile,
    checks: [
      {
        id: VerificationPatternTypes.ChileanRegistroCivil,
        default: false,
      },
      {
        id: VerificationPatternTypes.ChileanDriverLicense,
        default: false,
      },
      {
        id: VerificationPatternTypes.ChileanRut,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Colombia,
    checks: [
      {
        id: VerificationPatternTypes.ColombianBdua,
        default: false,
      },
      {
        id: VerificationPatternTypes.ColombianContraloria,
        default: false,
      },
      {
        id: VerificationPatternTypes.ColombianNit,
        default: false,
      },
      {
        id: VerificationPatternTypes.ColombianRegistraduria,
        default: false,
      },
      {
        id: VerificationPatternTypes.ColombianNationalPolice,
        default: false,
      },
      {
        id: VerificationPatternTypes.ColombianProcuraduria,
        default: false,
      },
      {
        id: VerificationPatternTypes.ColombianRunt,
        default: false,
      },
      {
        id: VerificationPatternTypes.ColombianUnifiedLegalSearch,
        default: false,
      },
      {
        id: VerificationPatternTypes.ColombianSisben,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.CostaRica,
    checks: [
      {
        id: VerificationPatternTypes.CostaRicanAtv,
        default: false,
      },
      {
        id: VerificationPatternTypes.CostaRicanTse,
        default: false,
      },
      {
        id: VerificationPatternTypes.CostaRicanSocialSecurity,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Ecuador,
    checks: [
      {
        id: VerificationPatternTypes.EcuadorianRegistroCivil,
        default: false,
      },
      {
        id: VerificationPatternTypes.EcuadorianSri,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Honduras,
    checks: [
      {
        id: VerificationPatternTypes.HonduranRnp,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Ghana,
    checks: [
      {
        id: VerificationPatternTypes.GhanaianGra,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Guatemala,
    checks: [
      {
        id: VerificationPatternTypes.GuatemalanTse,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryTypes.Dominican,
    checks: [
      {
        id: VerificationPatternTypes.DominicanJce,
        default: false,
      },
      {
        id: DocumentStepTypes.DominicanRnc,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Indonesia,
    checks: [
      {
        id: VerificationPatternTypes.IndonesianKPTValidation,
        default: false,
        stepTypeAlias: GovCheckTypesForPattern[VerificationPatternTypes.IndonesianKPTValidation].ktp,
        merchantTags: [MerchantTags.CanUseIndonesianKTP],
        option: {
          id: GovCheckTypesForPattern[VerificationPatternTypes.IndonesianKPTValidation].ktpFacematch,
          stepTypeAlias: GovCheckTypesForPattern[VerificationPatternTypes.IndonesianKPTValidation].ktpFacematch,
          description: true,
          isSupportFacematch: true,
          merchantTags: [MerchantTags.CanUseIndonesianKTP],
        },
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Kenya,
    checks: [
      {
        id: VerificationPatternTypes.KenyanEcitizen,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Mexico,
    checks: [
      {
        id: VerificationPatternTypes.MexicanCurp,
        default: false,
      },
      {
        id: VerificationPatternTypes.MexicanIne,
        default: false,
      },
      {
        id: VerificationPatternTypes.MexicanPep,
        default: false,
      },
      {
        id: VerificationPatternTypes.MexicanRfc,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Nigeria,
    checks: [
      {
        id: VerificationPatternTypes.NigerianCac,
        merchantTags: [MerchantTags.CanUseNigerianCac],
        description: true,
        default: false,
      },
      {
        id: VerificationPatternTypes.NigerianDl,
        merchantTags: [MerchantTags.CanUseNigerianDL],
        default: false,
        isSupportFacematch: true,
      },
      {
        id: VerificationPatternTypes.NigerianNin,
        merchantTags: [MerchantTags.CanUseNigerianNIN],
        default: false,
        isSupportFacematch: true,
      },
      {
        id: VerificationPatternTypes.NigerianVin,
        merchantTags: [MerchantTags.CanUseNigerianVIN],
        default: false,
      },
      {
        id: VerificationPatternTypes.NigerianBvn,
        merchantTags: [MerchantTags.CanUseNigerianBNV],
        hideIsCantUse: true,
        default: false,
        isSupportFacematch: true,
      },
      {
        id: VerificationPatternTypes.NigerianTin,
        description: true,
        merchantTags: [MerchantTags.CanUseNigerianTin],
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Paraguay,
    checks: [
      {
        id: VerificationPatternTypes.ParaguayanRcp,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Peru,
    checks: [
      {
        id: VerificationPatternTypes.PeruvianReniec,
        default: false,
      },
      {
        id: VerificationPatternTypes.PeruvianSunat,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Venezuela,
    checks: [
      {
        id: VerificationPatternTypes.VenezuelanCne,
        default: false,
      },
      {
        id: VerificationPatternTypes.VenezuelanSeniat,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Panama,
    checks: [
      {
        id: VerificationPatternTypes.PanamenianTribunalElectoral,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Salvador,
    checks: [
      {
        id: VerificationPatternTypes.SalvadorianTse,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryTypes.Uganda,
    checks: [
      {
        id: VerificationPatternTypes.UgandanElectoralCommission,
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
  [DocumentStepTypes.BrazilianCpfLight]: {
    fullName: {},
    dateOfBirth: {
      inline: true,
    },
    taxStatus: {
      inline: true,
    },
  },
  [DocumentStepTypes.DominicanJce]: {
    valid: {},
  },
  [DocumentStepTypes.DominicanRnc]: {
    valid: {
      hidden: true,
    },
    fullName: {},
    rnc: {},
    commercialName: {},
    category: {
      inline: true,
    },
    paymentScheme: {
      inline: true,
    },
    status: {},
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
  [DocumentStepTypes.ColombianSisben]: {
    sisbenGroup: {},
    sisbenGroupDescription: {},
    firstName: {
      inline: true,
    },
    lastName: {
      inline: true,
    },
    documentType: {},
    documentNumber: {
      inline: true,
    },
    municipality: {},
    department: {},
    surveyDate: {},
    lastUpdate: {},
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
  [VerificationStepTypes.NigerianCacValidation]: {
    type: {},
    companyName: {},
    cacNumber: {},
    status: {},
    companyAddress: {},
    companyEmail: {},
    registrationDate: {},
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
  [DocumentStepTypes.ArgentinianRenaperExtended]: {
    fullName: {
    },
    firstName: {
      inline: true,
    },
    surname: {
      inline: true,
    },
    dateOfBirth: {
      inline: true,
    },
    gender: {
      inline: true,
    },
    nationality: {
      inline: true,
    },
    dateOfDeath: {
      inline: true,
    },
    documentNumber: {
      inline: true,
    },
    dateOfIssue: {
      inline: true,
    },
    dateOfExpiry: {
      inline: true,
    },
    transactionNumber: {
      inline: true,
    },
    version: {
      inline: true,
    },
    taxIdType: {
      inline: true,
    },
    taxNumber: {
      inline: true,
    },
    activityCode: {
      inline: true,
    },
    activityDescription: {
    },
    address: {
    },
    email: {
    },
    phoneNumbers: {
      inline: true,
    },
    pep: {
      inline: true,
    },
    sanctioned: {
      inline: true,
    },
    sujetoObligado: {
      inline: true,
    },
    dniNumber: {
      hidden: true,
    },
    cuit: {
      hidden: true,
    },
    deceased: {
      hidden: true,
    },
  },
  [VerificationStepTypes.NigerianTinValidation]: {
    companyName: {},
    FirsNumber: {},
    CacNumber: {},
    JtbNumber: {},
    taxOffice: {},
    companyPhone: {},
    companyEmail: {},
  },
  [VerificationStepTypes.IndonesianKTPValidation]: {
    name: {
      inline: true,
    },
    nameMatch: {
      inline: true,
    },
    nik: {},
    nikStatus: {
    },
    dateOfBirth: {
      inline: true,
    },
    dateOfBirthMatch: {
      inline: true,
    },
    similarity: {
      formatter: (similarity, data) => {
        if (similarity === undefined) {
          return { ...data };
        }
        return { ...data, similarity: `${similarity} %` };
      },
      inline: true,
      hiddenIfNotExists: true,
    },
    faceMatch: {
      formatter: (faceMatch, data) => {
        if (faceMatch === undefined) {
          return { ...data };
        }
        return { ...data, faceMatch: faceMatch.toString() };
      },
      inline: true,
      hiddenIfNotExists: true,
    },
  },
};

export const GovCheckRequiredProductType = {
  [VerificationPatternTypes.CustomFieldsValidation]: [VerificationPatternTypes.NigerianTin, VerificationPatternTypes.NigerianCac],
  [VerificationPatternTypes.Biometrics]: [VerificationPatternTypes.ArgentinianRenaperFacematch, GovCheckTypesForPattern[VerificationPatternTypes.BrazilianCpf].cpfFacematch, GovCheckTypesForPattern[VerificationPatternTypes.IndonesianKPTValidation].ktpFacematch],
};

export function isCanUseGovCheck(govCheck: GovCheck | GovCheckOptions, merchantTags: MerchantTags[]): boolean {
  if (!govCheck?.merchantTags) {
    return true;
  }

  return govCheck.merchantTags?.every((tag) => merchantTags.includes(tag));
}

export function isGovCheckOptionDisabled(govCheck: GovCheck, verificationPattern: IVerificationPatterns, merchantTags: MerchantTags[]): boolean {
  if (!isCanUseGovCheck(govCheck.option, merchantTags)) {
    return true;
  }

  if (GovCheckRequiredProductType[VerificationPatternTypes.Biometrics].includes(govCheck.option.id)) {
    const isCorrectBiometricsEnabled = [BiometricTypes.liveness.toString(), BiometricTypes.selfie.toString(), BiometricTypes.voiceLiveness.toString()].includes(verificationPattern[VerificationPatternTypes.Biometrics]);
    return !govCheck.value || !isCorrectBiometricsEnabled;
  }

  if (govCheck.id === VerificationPatternTypes.ArgentinianRenaper) {
    return !govCheck.value;
  }

  return false;
}

export function isGovCheckDisabled(govCheck: GovCheck, verificationPattern: IVerificationPatterns, merchantTags: MerchantTags[]): boolean {
  if (!isCanUseGovCheck(govCheck, merchantTags)) {
    return true;
  }

  if (GovCheckRequiredProductType[VerificationPatternTypes.Biometrics].includes(govCheck.id)) {
    const isCorrectBiometricsEnabled = [BiometricTypes.liveness.toString(), BiometricTypes.selfie.toString(), BiometricTypes.voiceLiveness.toString()].includes(verificationPattern[VerificationPatternTypes.Biometrics]);
    return !isCorrectBiometricsEnabled;
  }

  if (GovCheckRequiredProductType[VerificationPatternTypes.CustomFieldsValidation].includes(govCheck.id)) {
    return !verificationPattern[VerificationPatternTypes.CustomFieldsValidation];
  }

  return false;
}

export function govCheckParse(list: GovCheck[], patterns: IVerificationPatterns, merchantTags: MerchantTags[]): GovCheckParsed[] {
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
        const value = patterns[item.id] && patterns[item.id] !== GovCheckTypesForPattern[item.id]?.none;
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
        ? patterns[item.id] && patterns[item.id] !== GovCheckTypesForPattern[item.id]?.none
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

export function getGovCheckDocumentsSteps(verification: VerificationResponse): GovCheckIStep[] {
  return verification?.documents?.map((document) => document?.steps.filter((step) => CountrySpecificChecks.includes(step.id))).flat() || [];
}

export function getGovCheckRootSteps(verification: VerificationResponse): GovCheckIStep[] {
  // Arkadiy: in some cases, we need to hide steps with special error
  return verification?.steps
    .filter((step) => CountrySpecificChecks.includes(step.id) && !(step?.error?.code && RootGovChecksErrorsToHide[step?.error?.code]))
    .map((step) => getStepExtra(step)) || [];
}

export function getGovCheckVerificationSteps(verification: VerificationResponse): GovCheckIStep[] {
  const govCheckDocumentsSteps = getGovCheckDocumentsSteps(verification);
  const govCheckRootSteps = getGovCheckRootSteps(verification);
  return govCheckDocumentsSteps.concat(govCheckRootSteps);
}

export const parseExpandedGovCheck = (govChecksSteps: IStep): GovCheckIStep[] => {
  const step = cloneDeep(govChecksSteps);
  if (step.id === DocumentStepTypes.ArgentinianRenaper && Object.hasOwnProperty.call(step, 'data') && Object.hasOwnProperty.call(step.data, 'afip')) {
    const { afip } = step.data;
    delete step.data.afip;
    //  TODO: id: ('argentinian-afip-validation' as any) - hardcode for autotest
    return [{ ...step, title: `SecurityCheckStep.${step.id}.title` }, { ...step, id: ('argentinian-afip-validation' as any), data: afip, title: `SecurityCheckStep.${step.id}.${GovCheckTypesForPattern[DocumentStepTypes.ArgentinianRenaper].renaperAfip}.title`, isShowError: false }];
  }
  return [{ ...step, title: `SecurityCheckStep.${step.id}.title` }];
};

export function handleGovCheckSwitch(item: GovCheck, valueChecked: boolean): Record<string, boolean | string> {
  if (item?.stepTypeAlias) {
    const value = valueChecked ? item.stepTypeAlias : GovCheckTypesForPattern[item.id].none;
    return { [item.id]: value };
  }
  if (item.option) {
    return { [item.id]: valueChecked, [item.option.id]: valueChecked && item.option.value };
  }

  return { [item.id]: valueChecked };
}

export function isGovCheckHaveDependsIssue(flow: IFlow, productsInGraph?: ProductTypes[]): boolean {
  return !productsInGraph.includes(ProductTypes.CustomField) && !productsInGraph.includes(ProductTypes.DocumentVerification);
}

export function isGovCheckInFlow(flow: IFlow): boolean {
  const isGovChecksEnabled = Object.entries(flow?.verificationPatterns).some(
    ([key, value]) => Object.prototype.hasOwnProperty.call(verificationPatternsGovchecksDefault, key)
      && value && value !== GovCheckStepTypes.None,
  );
  return !!flow?.postponedTimeout || isGovChecksEnabled;
}
