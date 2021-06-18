export const InputValidationType = {
  GrayscaleImage: 'GrayscaleImage',
  IdenticalImages: 'IdenticalImages',
  SimilarImages: 'SimilarImages',
  DocumentDetected: 'DocumentDetected',
};

export function validationChecksParse(values) {
  return Object.keys(InputValidationType).reduce((memo, key) => {
    const type = InputValidationType[key];
    const check = values.find((item) => item.id === type);

    memo[type] = check ? !check.isDisabled : true;

    return memo;
  }, {});
}

export function validationChecksSerialize(values) {
  return Object.entries(values).map(([key, enabled]) => ({
    id: key,
    isDisabled: !enabled,
  }));
}
