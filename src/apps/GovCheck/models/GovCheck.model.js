import { DocumentStepTypes } from 'models/Step.model';

export const GovCheckCountryList = {
  Argentina: 'argentina',
  Colombia: 'colombia',
  Mexico: 'mexico',
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
];

export function govCheckParse(list, pattern) {
  return list.map((item) => ({
    ...item,
    value: pattern[item.id] !== undefined
      ? pattern[item.id]
      : item.default,
  }));
}
