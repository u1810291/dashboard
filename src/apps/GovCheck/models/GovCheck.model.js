import { DocumentStepTypes } from 'models/Step.model';

export const GovCheckStepTypes = {
  [DocumentStepTypes.BrazilianCpf]: {
    none: 'none',
    cpf: 'cpf',
    cpfFacematch: 'cpf+facematch',
  },
};

export const GovCheckCountryList = {
  Argentina: 'argentina',
  Bolivia: 'bolivia',
  Brazil: 'brazil',
  Chile: 'chile',
  Colombia: 'colombia',
  CostaRica: 'costaRica',
  Ecuador: 'ecuador',
  // TODO: uncomment after we get fix for Honduran scraper
  // Honduras: 'honduras',
  Mexico: 'mexico',
  Paraguay: 'paraguay',
  Peru: 'peru',
  // TODO: uncomment after we get fix for Salvadorian TSE scraper
  // Salvador: 'salvador',
  Panama: 'panama',
};

export const GovCheckConfiguration = [
  {
    country: GovCheckCountryList.Argentina,
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
    country: GovCheckCountryList.Bolivia,
    checks: [
      {
        id: DocumentStepTypes.BolivianOep,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryList.Brazil,
    checks: [
      {
        id: DocumentStepTypes.BrazilianCpf,
        default: false,
        stepTypeAlias: GovCheckStepTypes[DocumentStepTypes.BrazilianCpf].cpf,
        // option: {
        //   id: 'facematch',
        //   stepTypeAlias: GovCheckStepTypes[DocumentStepTypes.BrazilianCpf].cpfFacematch,
        //   description: true,
        // },
      },
    ],
  }, {
    country: GovCheckCountryList.Chile,
    checks: [
      {
        id: DocumentStepTypes.ChileanRegistroCivil,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryList.Colombia,
    checks: [
      {
        id: DocumentStepTypes.ColombianRegistraduria,
        default: true,
      },
    ],
  },
  {
  }, {
    country: GovCheckCountryList.CostaRica,
    checks: [
      {
        id: DocumentStepTypes.CostaRicanTse,
        default: false,
      },
    ],
  }, {
    country: GovCheckCountryList.Ecuador,
    checks: [
      {
        id: DocumentStepTypes.EcuadorianRegistroCivil,
        default: false,
      },
    ],
  // TODO: uncomment after we get fix for Honduran scraper
  // }, {
  //   country: GovCheckCountryList.Honduras,
  //   checks: [
  //     {
  //       id: DocumentStepTypes.HonduranRnp,
  //       default: false,
  //     },
  //   ],
  }, {
    country: GovCheckCountryList.Mexico,
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
        id: DocumentStepTypes.RFC,
        default: true,
      },
    ],
  },
  {
    country: GovCheckCountryList.Paraguay,
    checks: [
      {
        id: DocumentStepTypes.ParaguayanRcp,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryList.Peru,
    checks: [
      {
        id: DocumentStepTypes.PeruvianReniec,
        default: false,
      },
    ],
  },
  {
    country: GovCheckCountryList.Panama,
    checks: [
      {
        id: DocumentStepTypes.PanamenianTribunalElectoral,
        default: false,
      },
    ],
  },
  // TODO: uncomment after we get fix for Salvadorian TSE scraper
  // {
  //   country: GovCheckCountryList.Salvador,
  //   checks: [
  //     {
  //       id: DocumentStepTypes.SalvadorianTse,
  //       default: false,
  //     },
  //   ],
  // },
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
};

export function govCheckParse(list, pattern) {
  return list.map((item) => {
    let value;
    if (item.option) {
      value = pattern[item.id] && !(pattern[item.id] === GovCheckStepTypes[item.id].none);
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
        ? pattern[item.id] && !(pattern[item.id] === GovCheckStepTypes[item.id]?.none)
        : item.default,
    };
  });
}

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
