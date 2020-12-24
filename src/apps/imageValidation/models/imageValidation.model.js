export const InputValidationType = {
  GrayscaleImage: 'GrayscaleImage',
  IdenticalImages: 'IdenticalImages',
  SimilarImages: 'SimilarImages',
};

export function validationChecksParse(values) {
  const map = Object.keys(InputValidationType).reduce((validationTypes, key) => {
    const type = InputValidationType[key];
    const check = values.find((item) => item.id === type);

    validationTypes[type] = check ? !check.isDisabled : true;

    return validationTypes;
  }, {});

  return map;
}

export function validationChecksSerialize(values) {
  return Object.entries(values).map(([key, enabled]) => ({
    id: key,
    isDisabled: !enabled,
  }));
}
