export enum AgeCheckThresholdModes {
  Default = 'default',
  Custom = 'custom',
}

export const AGE_CHECK_DEFAULT_THRESHOLD = 18;

export const AGE_CHECK_MIN_THRESHOLD = 15;

export const AGE_CHECK_MAX_THRESHOLD = 100;

enum ageCheckErrorTypes {
  Empty = 'empty',
  OutOfRange = 'outOfRange',
}

export function validateAgeThreshold(score: number, mode: AgeCheckThresholdModes): ageCheckErrorTypes {
  if (mode === AgeCheckThresholdModes.Custom) {
    if (!score) {
      return ageCheckErrorTypes.Empty;
    }
    if (score < AGE_CHECK_MIN_THRESHOLD || score > AGE_CHECK_MAX_THRESHOLD) {
      return ageCheckErrorTypes.OutOfRange;
    }
  }
  return null;
}
