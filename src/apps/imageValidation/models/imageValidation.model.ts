export enum InputValidationType {
  GrayscaleImage = 'GrayscaleImage',
  IdenticalImages = 'IdenticalImages',
  SimilarImages = 'SimilarImages',
  DocumentDetected = 'DocumentDetected',
  TextDetected = 'TextDetected',
  BlurryTextDetected = 'BlurryTextDetected',
}

export interface InputValidationCheck {
  id?: InputValidationType;
  isDisabled?: boolean;
}

// inputValidationChecks is [] in defaultFlow (it means, that all checks are enabled)
export const inputValidationChecksDefaultValue = [
  {
    id: InputValidationType.GrayscaleImage,
    isDisabled: false,
  },
  {
    id: InputValidationType.SimilarImages,
    isDisabled: false,
  },
  {
    id: InputValidationType.IdenticalImages,
    isDisabled: false,
  },
  {
    id: InputValidationType.DocumentDetected,
    isDisabled: false,
  },
];

export const inputCustomDocumentValidationChecksDefaultValue = [
  {
    id: InputValidationType.TextDetected,
    isDisabled: true,
  },
  {
    id: InputValidationType.BlurryTextDetected,
    isDisabled: true,
  },
];

export function mergeInputValidationChecks(target, source) {
  const validatedTarget = target.length > 0 ? target : inputValidationChecksDefaultValue;

  return validatedTarget.map((check) => {
    const similarCheck = source.find((changedCheck) => changedCheck.id === check.id);
    return similarCheck || check;
  });
}

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
