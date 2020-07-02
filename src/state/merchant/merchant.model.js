export const MERCHANT_STORE_KEY = 'merchant';

export const MerchantActionGroups = {
  Merchant: 'MERCHANT',
  Configuration: 'CONFIGURATION',
  App: 'APP',
  Flows: 'FLOWS',
};

export const SliceNames = {
  Merchant: 'merchant',
  Configuration: 'configurations',
  App: 'app',
  Flows: 'flows',
};

export const AVAILABLE_DOCUMENT_TYPES = [
  'passport',
  'national-id',
  'driving-license',
  'proof-of-residency',
];

export const GovChecksModel = [
  {
    country: 'mexico',
    validations: {
      'mexican-curp-validation': {
        default: true,
        label: 'CURP',
      },
      'mexican-ine-validation': {
        default: true,
        label: 'INE',
      },
      'mexican-rfc-validation': {
        default: true,
        label: 'RFC',
      },
    },
  },
];

export function getGovChecksByCountry(country) {
  return (GovChecksModel.find((item) => item.country === country) || {})
    .validations || {};
}

export function getDefaultGovChecks() {
  return GovChecksModel.reduce((acc, region) => {
    const result = acc;
    const validations = region.validations || {};
    Object
      .keys(validations)
      .forEach((name) => {
        result[name] = (validations[name] || {}).default;
      });
    return result;
  }, {});
}
