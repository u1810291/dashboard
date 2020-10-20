import { get } from 'lodash';

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

export function getFacematchStepExtra(step, identity) {
  const score = get(step, 'data.score');
  const threshold = get(identity, '_embedded.verification.flow.facematchThreshold', FACEMATCH_DEFAULT_THRESHOLD);

  if (!score) {
    return step;
  }

  return {
    ...step,
    labelExtra: `SecurityCheckStep.${step.id}.extras`,
    labelExtraData: {
      score: Math.floor(+score),
      threshold,
    },
  };
}
