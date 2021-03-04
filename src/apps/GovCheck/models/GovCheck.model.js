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
  Brazil: 'brazil',
  Colombia: 'colombia',
  CostaRica: 'costaRica',
  Mexico: 'mexico',
  Peru: 'peru',
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
  },
  {
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
    country: GovCheckCountryList.Colombia,
    checks: [
      {
        id: DocumentStepTypes.ColombianRegistraduria,
        default: true,
      },
    ],
  }, {
    country: GovCheckCountryList.CostaRica,
    checks: [
      {
        id: DocumentStepTypes.CostaRicanTse,
        default: false,
      },
    ],
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
    country: GovCheckCountryList.Peru,
    checks: [
      {
        id: DocumentStepTypes.PeruvianReniec,
        default: false,
      },
    ],
  },
];

export const govCheckDisplayOptions = {
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

  [DocumentStepTypes.ArgentinianDni]: {
    documentNumber: {
      hidden: true,
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
