import { DocumentStepTypes } from 'models/Step.model';
import { VerificationPatterns, VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { BiometricTypes } from 'models/Biometric.model';

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
  [VerificationPatternTypes.ChileanRegistroCivil]: false,
  [VerificationPatternTypes.ColombianBdua]: false,
  [VerificationPatternTypes.ColombianContraloria]: false,
  [VerificationPatternTypes.ColombianNationalPolice]: false,
  [VerificationPatternTypes.ColombianNit]: false,
  [VerificationPatternTypes.ColombianProcuraduria]: false,
  [VerificationPatternTypes.ColombianRegistraduria]: false,
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
  [VerificationPatternTypes.ParaguayanRcp]: false,
  [VerificationPatternTypes.PeruvianReniec]: false,
  [VerificationPatternTypes.PeruvianSunat]: false,
  [VerificationPatternTypes.SalvadorianTse]: false,
  [VerificationPatternTypes.PanamenianTribunalElectoral]: false,
  [VerificationPatternTypes.VenezuelanCne]: false,
  [VerificationPatternTypes.VenezuelanSeniat]: false,
  [VerificationPatternTypes.UgandanElectoralCommission]: false,
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
  GovCheckCountryTypes.Paraguay,
  GovCheckCountryTypes.Peru,
  GovCheckCountryTypes.Salvador,
  GovCheckCountryTypes.Panama,
  GovCheckCountryTypes.Venezuela,
  GovCheckCountryTypes.Uganda,
];

export interface GovCheckOptions {
  description: boolean;
  // TODO: @richvoronov figure out with types
  id: string;
  stepTypeAlias?: GovCheckStepTypes;
  value?: boolean;
}

export interface GovCheck {
  // TODO: @richvoronov figure out with types
  id: VerificationPatternTypes;
  default: boolean;
  stepTypeAlias?: GovCheckStepTypes;
  option?: GovCheckOptions;
  value?: boolean;
  description?: boolean;
}

export interface GovCheckConfiguration{
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
        default: false,
        description: true,
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
          stepTypeAlias: GovCheckTypesForStep[DocumentStepTypes.BrazilianCpf].cpfFacematch,
          description: true,
        },
      },
    ],
  }, {
    country: GovCheckCountryTypes.Chile,
    checks: [
      {
        id: DocumentStepTypes.ChileanRegistroCivil,
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
      // TODO: uncomment here after we get scraper fix
      // {
      //  id: DocumentStepTypes.EcuadorianSri,
      //  default: false,
      // },
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
};

export function govCheckParse(list: GovCheck[], patterns: VerificationPatterns): GovCheck[] {
  return list.map((item) => {
    if (item.option) {
      // VerificationPatters can have boolean or string type, so let's devide logic here for better readability
      if (typeof patterns[item.id] === 'boolean') {
        return {
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
        return {
          ...item,
          option: {
            ...item.option,
            value: item.option.stepTypeAlias === patterns[item.id],
          },
          value,
        };
      }

      return {
        ...item,
        value: item.default,
      };
    }

    return {
      ...item,
      value: patterns[item.id] !== undefined
        ? patterns[item.id] && patterns[item.id] !== GovCheckTypesForStep[item.id]?.none
        : item.default,
    };
  });
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

export function isGovCheckOptionDisabled(govCheck: GovCheck, verificationPattern: VerificationPatterns): boolean {
  if (govCheck.id === DocumentStepTypes.BrazilianCpf) {
    const isCorrectBiometricsEnabled = [BiometricTypes.liveness.toString(), BiometricTypes.selfie.toString(), BiometricTypes.voiceLiveness.toString()].includes(verificationPattern[VerificationPatternTypes.Biometrics]);
    return !govCheck.value || !isCorrectBiometricsEnabled;
  }

  if (govCheck.id === DocumentStepTypes.ArgentinianRenaper) {
    return !govCheck.value;
  }

  return false;
}

export function isGovCheckDisabled(govCheck: GovCheck, verificationPattern: VerificationPatterns): boolean {
  if (govCheck.id === DocumentStepTypes.ArgentinianRenaperFacematch) {
    const isCorrectBiometricsEnabled = [BiometricTypes.liveness.toString(), BiometricTypes.selfie.toString(), BiometricTypes.voiceLiveness.toString()].includes(verificationPattern[VerificationPatternTypes.Biometrics]);
    return !isCorrectBiometricsEnabled;
  }

  return false;
}
