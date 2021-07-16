import { DocumentStepTypes } from 'models/Step.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';

export enum GovernmentCheckSettingTypes {
  PostponedTimeout = 'postponedTimeout',
  CountriesGovChecks = 'countriesGovChecks'
}

export enum GovernmentChecksTypes {
  GovernmentDatabaseCheck = 'governmentDatabaseCheck'
}

export const verificationPatternsCountries: readonly VerificationPatternTypes[] = [
  VerificationPatternTypes.ArgentinianDni,
  VerificationPatternTypes.ArgentinianRenaper,
  VerificationPatternTypes.BolivianOep,
  VerificationPatternTypes.BrazilianCpf,
  VerificationPatternTypes.EcuadorianRegistroCivil,
  VerificationPatternTypes.HonduranRnp,
  VerificationPatternTypes.ChileanRegistroCivil,
  VerificationPatternTypes.ColombianRegistraduria,
  VerificationPatternTypes.ColombianNit,
  VerificationPatternTypes.CostaRicanAtv,
  VerificationPatternTypes.CostaRicanTse,
  VerificationPatternTypes.CostaRicanSocialSecurity,
  VerificationPatternTypes.DominicanJce,
  VerificationPatternTypes.ParaguayanRcp,
  VerificationPatternTypes.MexicanCurp,
  VerificationPatternTypes.MexicanIne,
  VerificationPatternTypes.MexicanPep,
  VerificationPatternTypes.MexicanRfc,
  VerificationPatternTypes.PeruvianReniec,
  VerificationPatternTypes.SalvadorianTse,
  VerificationPatternTypes.PanamenianTribunalElectoral,
  VerificationPatternTypes.VenezuelanCne,
];

export enum GovCheckStepTypes {
  None = 'none',
  Cpf = 'cpf',
  CpfFacematch = 'cpf+facematch',
}

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
  Guatemala = 'guatemala',
  Honduras = 'honduras',
  Dominican = 'dominican',
  Mexico = 'mexico',
  Paraguay = 'paraguay',
  Peru = 'peru',
  Salvador = 'salvador',
  Panama = 'panama',
  Venezuela = 'venezuela',
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
  GovCheckCountryTypes.Guatemala,
  GovCheckCountryTypes.Honduras,
  GovCheckCountryTypes.Mexico,
  GovCheckCountryTypes.Paraguay,
  GovCheckCountryTypes.Peru,
  GovCheckCountryTypes.Salvador,
  GovCheckCountryTypes.Panama,
  GovCheckCountryTypes.Venezuela,
];

export interface GovCheck{
  id: string;
  default: boolean;
  stepTypeAlias?: GovCheckStepTypes;
  option?: any;
  value?: boolean;
}

export interface GovCheckConfiguration{
  country: GovCheckCountryTypes;
  checks: GovCheck[];
}

export const GovCheckConfigurations: GovCheckConfiguration[] = [
  {
    country: GovCheckCountryTypes.Argentina,
    checks: [
      {
        id: DocumentStepTypes.ArgentinianRenaper,
        default: false,
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
        // option: {
        //   id: 'facematch',
        //   stepTypeAlias: GovCheckStepTypes[DocumentStepTypes.BrazilianCpf].cpfFacematch,
        //   description: true,
        // },
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
        id: DocumentStepTypes.ColombianNit,
        default: false,
      },
      {
        id: DocumentStepTypes.ColombianRegistraduria,
        default: true,
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
    country: GovCheckCountryTypes.Mexico,
    checks: [
      {
        id: DocumentStepTypes.CURP,
        default: true,
      },
      {
        id: DocumentStepTypes.INE,
        default: true,
      },
      {
        id: DocumentStepTypes.MexicanPep,
        default: false,
      },
      {
        id: DocumentStepTypes.RFC,
        default: true,
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
  },
  [DocumentStepTypes.DominicanJce]: {
    fullName: {},
    documentNumber: {
      inline: true,
    },
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
    pepData: {
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

export function govCheckParse(list: GovCheck[], pattern): GovCheck[] {
  return list.map((item) => {
    let value;
    if (item.option) {
      value = pattern[item.id] && pattern[item.id] !== GovCheckTypesForStep[item.id].none;
      return {
        ...item,
        option: {
          ...item.option,
          value: item.option.stepTypeAlias === pattern[item.id],
        },
        value,
      };
    }

    return {
      ...item,
      value: pattern[item.id] !== undefined
        ? pattern[item.id] && pattern[item.id] !== GovCheckTypesForStep[item.id]?.none
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
