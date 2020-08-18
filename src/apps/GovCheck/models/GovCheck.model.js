import { DocumentStepTypes } from 'models/Step.model';

export const GovCheckCountryList = {
  Mexico: 'mexico',
  Colombia: 'colombia',
};

export const GovCheckConfiguration = [
  {
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
  }, {
    country: GovCheckCountryList.Colombia,
    checks: [
      {
        id: DocumentStepTypes.ColombianRegistraduria,
        default: true,
      },
    ],
  },
];

export function govCheckParse(list, pattern) {
  return list.map((item) => ({
    ...item,
    value: pattern[item.id] !== undefined
      ? pattern[item.id]
      : item.default,
  }));
}
