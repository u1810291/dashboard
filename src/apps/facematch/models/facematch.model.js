export const FacematchThresholdModes = {
  Recommended: 'recommended',
  Custom: 'custom',
};

export const FACEMATCH_DEFAULT_THRESHOLD = 70;

export const FACEMATCH_MIN_THRESHOLD = 40;

export const FACEMATCH_MAX_THRESHOLD = 100;

const errorTypes = {
  empty: 'empty',
  outOfRange: 'outOfRange',
};

export const validateScore = (score, mode) => {
  if (mode === FacematchThresholdModes.Custom) {
    if (!score) {
      return errorTypes.empty;
    }
    if (score < FACEMATCH_MIN_THRESHOLD || score > FACEMATCH_MAX_THRESHOLD) {
      return errorTypes.outOfRange;
    }
  }
  return null;
};
