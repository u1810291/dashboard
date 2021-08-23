import { get } from 'lodash';

export const FacematchThresholdModes = {
  Recommended: 'recommended',
  Custom: 'custom',
};

export const FACEMATCH_DEFAULT_THRESHOLD = 70;

export const FACEMATCH_DEFAULT_REVERIFICATION_THRESHOLD = 95;

export const FACEMATCH_THRESHOLDS = {
  LOW: {
    MIN: 40,
    MAX: 70,
  },
  HIGH: {
    MIN: 70,
    MAX: 100,
  },
};

export const REVERIFICATION_FACEMATCH_THRESHOLDS = {
  LOW: {
    MIN: 75,
    MAX: 95,
  },
  HIGH: {
    MIN: 95,
    MAX: 100,
  },
};

const errorTypes = {
  empty: 'empty',
  outOfRange: 'outOfRange',
};

export const validateScore = (score, mode, thresholds = FACEMATCH_THRESHOLDS) => {
  if (mode === FacematchThresholdModes.Custom) {
    if (!score) {
      return errorTypes.empty;
    }
    if (score < thresholds.LOW.MIN || score > thresholds.HIGH.MAX) {
      return errorTypes.outOfRange;
    }
  }
  return null;
};

export function getFacematchStepExtra(step, pooStep, identity, document) {
  const score = Math.floor(+get(step, 'data.score'));
  const threshold = get(identity, '_embedded.verification.flow.facematchThreshold', FACEMATCH_DEFAULT_THRESHOLD);
  const isPOO = pooStep?.data?.documentType === document.type;

  if (!score) {
    return step;
  }

  if (isPOO) {
    return {
      ...step,
      labelExtra: pooStep?.error?.code
        ? `SecurityCheckStep.${pooStep?.error?.code}`
        : 'SecurityCheckStep.proofOfOwnership.success',
      labelExtraData: { score },
    };
  }

  return {
    ...step,
    labelExtra: `SecurityCheckStep.${step.id}.extras`,
    labelExtraData: {
      score,
      threshold,
    },
  };
}
