import { DocumentStepTypes } from 'models/Step.model';

export const GovCheckStepTypes = {
  [DocumentStepTypes.BrazilianDatavalid]: {
    none: 'none',
    cpf: 'cpf',
    cpfFacematch: 'cpf+facematch',
  },
};

export const GovCheckCountryList = {
  Argentina: 'argentina',
  Brazil: 'brazil',
  Colombia: 'colombia',
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
    ],
  },
  {
    country: GovCheckCountryList.Brazil,
    checks: [
      {
        id: DocumentStepTypes.BrazilianDatavalid,
        default: false,
        stepTypeAlias: GovCheckStepTypes[DocumentStepTypes.BrazilianDatavalid].cpf,
        // option: {
        //   id: 'facematch',
        //   stepTypeAlias: GovCheckStepTypes[DocumentStepTypes.BrazilianDatavalid].cpfFacematch,
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
  [DocumentStepTypes.BrazilianDatavalid]: {
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
