export const AgeCheckThresholdModes = {
  Default: 'default',
  Custom: 'custom',
};

export const AGE_CHECK_DEFAULT_THRESHOLD = 18;

export const AGE_CHECK_MIN_THRESHOLD = 15;

export const AGE_CHECK_MAX_THRESHOLD = 100;

const ageCheckErrorTypes = {
  empty: 'empty',
  outOfRange: 'outOfRange',
};

export function validateAgeTheshold(score, mode) {
  if (mode === AgeCheckThresholdModes.Custom) {
    if (!score) {
      return ageCheckErrorTypes.empty;
    }
    if (score < AGE_CHECK_MIN_THRESHOLD || score > AGE_CHECK_MAX_THRESHOLD) {
      return ageCheckErrorTypes.outOfRange;
    }
  }
  return null;
}
